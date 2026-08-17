import { callJSON } from './openaiClient.js';
import { ARTICLE_STYLE_RULES } from './articleStyle.js';

const SYSTEM_PROMPT = `You are a senior B2B SaaS content writer, the kind who writes for blogs like HubSpot, ClickUp, and Hiver — practical, skimmable, no fluff.

You are given an outline (title, target keyword, angle, and a list of core H2 sections) that a writer has already approved and possibly edited. The outline's sections are the CORE body of the article (step 3 in the structure below) — write them in the outline's order, using the outline's headings as a strong basis (you may tighten wording into a question format per the style rules, but keep the meaning and topic of each). Do not add, remove, or reorder the outline's core sections. On top of those core sections, you must still add the intro, TL;DR, closing section, and FAQ exactly as described in the structure rules below — those are not part of the outline but are always required.

Rules:
- Ground every claim in the provided themes/quotes/pain points/competitors — do not invent statistics, case studies, or claims beyond what's given.
- Length: the articleBody MUST be between 1700 and 2100 words total. This is a hard floor. Distribute length across all sections (intro, TL;DR, the outline's core sections, closing, FAQ).
- SEO keywords must be genuinely relevant to the target keyword and topic.

${ARTICLE_STYLE_RULES}

Return JSON with this exact shape:
{
  "title": "the outline's title, lightly polished if needed",
  "topic": "the outline's angle, restated as a topic",
  "articleBody": "the full 1700-2100 word article in markdown: intro, then ## TL;DR, then ## for each outline section (in order, question-format where natural), then ## closing section with keyword in heading, then ## Frequently Asked Questions with ### per question",
  "seoKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
  "groundedIn": "the outline's grounding quote/theme"
}`;

const EXPAND_SYSTEM_PROMPT = `You are the same writer, doing a second pass because your draft came in under the required 1700-2100 word length.

Rules:
- Expand the EXISTING article by deepening its existing sections — do not add new sections beyond the original outline, do not shorten or remove content.
- Add more specifics, implications, practical detail, and grounded sub-points to existing sections.
- The final articleBody MUST be 1700-2100 words total.

${ARTICLE_STYLE_RULES}

Return the same JSON shape with the expanded articleBody.`;

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export async function generateArticleFromOutline(outline, aggregate) {
  const t0 = Date.now();
  const userPrompt = `Approved outline:\n${JSON.stringify(outline, null, 2)}\n\nSupporting data from the call batch (for grounding):\n${JSON.stringify(
    {
      overallSummary: aggregate.overallSummary,
      themes: aggregate.themes,
      competitors: aggregate.competitors,
      painPoints: aggregate.painPoints
    },
    null,
    2
  )}\n\nWrite the full 1700-2100 word article following the outline exactly, as JSON.`;

  let article = await callJSON(SYSTEM_PROMPT, userPrompt, { max_tokens: 7000 });
  console.log(`[batch-article] first draft: ${wordCount(article.articleBody)} words at ${Date.now() - t0}ms`);

  let attempts = 0;
  while (wordCount(article.articleBody) < 1700 && attempts < 3) {
    const expandPrompt = `Current word count: ${wordCount(article.articleBody)}. Needs to reach 1700-2100 words.\n\nOriginal outline:\n${JSON.stringify(outline, null, 2)}\n\nCurrent draft:\n${JSON.stringify(article, null, 2)}\n\nExpand it to meet the length requirement.`;
    article = await callJSON(EXPAND_SYSTEM_PROMPT, expandPrompt, { max_tokens: 7000 });
    attempts += 1;
    console.log(`[batch-article] expand pass ${attempts}: ${wordCount(article.articleBody)} words at ${Date.now() - t0}ms`);
  }

  return article;
}
