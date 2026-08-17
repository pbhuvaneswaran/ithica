import express from 'express';
import multer from 'multer';
import pLimit from 'p-limit';
import { extractTextFromFile } from '../lib/fileExtractor.js';
import { splitIntoCalls } from '../lib/callSplitter.js';
import { analyzeCall } from '../lib/callAnalyzer.js';
import { aggregateAnalysis } from '../lib/aggregateAnalyzer.js';
import { generateTopics } from '../lib/topicGenerator.js';
import { generateOutlineForTopic } from '../lib/outlineGenerator.js';
import { generateArticleFromOutline } from '../lib/articleFromOutline.js';
import { generateContentCalendar } from '../lib/contentCalendarGenerator.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024, files: 25 } });
const limit = pLimit(5);

router.post('/analyze', upload.array('files', 25), async (req, res) => {
  const files = req.files || [];
  const pastedTranscript = (req.body?.transcript || '').trim();

  if (files.length === 0 && pastedTranscript.length < 20) {
    return res.status(400).json({ error: 'Upload at least one call transcript file, or paste a transcript.' });
  }

  const t0 = Date.now();
  console.log(`[analyze] ${files.length} files, pasted: ${pastedTranscript.length > 0}`);

  try {
    // Step 1: extract raw text per source
    const sources = [];
    for (const file of files) {
      try {
        const text = await extractTextFromFile(file);
        if (text && text.trim().length >= 20) {
          sources.push({ label: file.originalname, text: text.trim() });
        }
      } catch (err) {
        console.error(`[analyze] failed to read ${file.originalname}:`, err.message);
      }
    }
    if (pastedTranscript.length >= 20) {
      sources.push({ label: 'Pasted transcript', text: pastedTranscript });
    }

    if (sources.length === 0) {
      return res.status(422).json({ error: 'Could not extract readable text from any source.' });
    }

    // Step 2: split each source into individual calls (handles docs with multiple calls embedded)
    const allCalls = sources.flatMap((s) => splitIntoCalls(s.text, s.label));
    console.log(`[analyze] split into ${allCalls.length} calls at ${Date.now() - t0}ms`);

    // Step 3: analyze each call
    const callAnalyses = await Promise.all(
      allCalls.map((call) => limit(() => analyzeCall(call.text, call.label)))
    );
    console.log(`[analyze] per-call analysis done at ${Date.now() - t0}ms`);

    // Step 4: aggregate
    const aggregate = await aggregateAnalysis(callAnalyses);
    console.log(`[analyze] aggregate done at ${Date.now() - t0}ms`);

    // Step 5: topics (fast, no full outlines yet)
    const topics = await generateTopics(aggregate);
    console.log(`[analyze] topics done at ${Date.now() - t0}ms — total`);

    res.json({ callAnalyses, aggregate, topics });
  } catch (err) {
    console.error(`[analyze] failed at ${Date.now() - t0}ms:`, err);
    res.status(500).json({ error: 'Analysis failed. Check server logs.' });
  }
});

router.post('/outline', express.json({ limit: '2mb' }), async (req, res) => {
  const { topic, aggregate } = req.body;
  if (!topic || !aggregate) {
    return res.status(400).json({ error: 'Missing topic or aggregate context.' });
  }
  try {
    const outline = await generateOutlineForTopic(topic, aggregate);
    res.json({ outline: { id: topic.id, ...outline } });
  } catch (err) {
    console.error('[outline] failed:', err);
    res.status(500).json({ error: 'Outline generation failed. Check server logs.' });
  }
});

router.post('/article', express.json({ limit: '2mb' }), async (req, res) => {
  const { outline, aggregate } = req.body;
  if (!outline || !aggregate) {
    return res.status(400).json({ error: 'Missing outline or aggregate context.' });
  }
  try {
    const article = await generateArticleFromOutline(outline, aggregate);
    res.json({ article });
  } catch (err) {
    console.error('[article] failed:', err);
    res.status(500).json({ error: 'Article generation failed. Check server logs.' });
  }
});

router.post('/content-calendar', express.json({ limit: '2mb' }), async (req, res) => {
  const { aggregate, numWeeks } = req.body;
  if (!aggregate) {
    return res.status(400).json({ error: 'Missing aggregate context.' });
  }
  try {
    const posts = await generateContentCalendar(aggregate, numWeeks);
    res.json({ posts });
  } catch (err) {
    console.error('[content-calendar] failed:', err);
    res.status(500).json({ error: 'Content calendar generation failed. Check server logs.' });
  }
});

export default router;
