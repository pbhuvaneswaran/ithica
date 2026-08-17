import { callJSON } from './openaiClient.js';

const SYSTEM_PROMPT = `You are a senior B2B SaaS content strategist scanning a batch of real sales call analyses for article-worthy angles.

Rules:
- Every topic must be grounded in the themes, pain points, competitors, or quotes provided — do not invent topics unrelated to the data.
- Propose as many DISTINCT, genuinely different topics as the data supports — a minimum of 3, and up to 7 if there's enough distinct material. Do not pad with near-duplicate topics just to hit a number, and do not force more than 3 if the batch only reveals a couple of real, distinct themes.
- This is a quick topic scan, not a full outline — just title, angle, and target keyword for each.

Return JSON with this exact shape:
{
  "topics": [
    {
      "title": "specific, non-generic article title",
      "targetKeyword": "primary SEO keyword phrase",
      "angle": "1 sentence describing the article's angle/thesis",
      "groundedIn": "the verbatim quote or theme this topic is built on"
    }
  ]
}`;

export async function generateTopics(aggregate) {
  const userPrompt = `Aggregate analysis from ${aggregate.callCount} sales calls:\n${JSON.stringify(
    {
      overallSummary: aggregate.overallSummary,
      themes: aggregate.themes,
      competitors: aggregate.competitors,
      keywords: aggregate.keywords,
      painPoints: aggregate.painPoints
    },
    null,
    2
  )}\n\nGenerate 3-7 distinct, grounded article topics as JSON.`;
  const { topics } = await callJSON(SYSTEM_PROMPT, userPrompt, { max_tokens: 1500 });
  return topics.map((topic, i) => ({ id: `topic-${i + 1}`, ...topic }));
}
