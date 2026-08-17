import { callJSON } from './openaiClient.js';

function tally(items) {
  const counts = {};
  for (const item of items) {
    const key = item.trim();
    if (!key) continue;
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const THEME_SYSTEM_PROMPT = `You are a B2B content strategist reviewing a batch of sales call analyses to find patterns worth writing about.

Rules:
- Group calls into thematic clusters based on shared objections/pain points — a theme with only 1 call is still valid but less notable than one with several.
- Every theme must be traceable to the call summaries/quotes provided — do not invent a theme that isn't reflected in the data.
- Keep theme labels short and specific, not generic ("pricing" is too vague; "pricing tier jump feels punitive for small teams" is good).

Return JSON with this exact shape:
{
  "overallSummary": "2-3 sentence summary of what this batch of calls reveals overall",
  "themes": [
    { "theme": "specific theme label", "callLabels": ["Call 1", "Call 3"], "supportingQuote": "verbatim quote from one of the calls" }
  ]
}`;

const CANONICALIZE_SYSTEM_PROMPT = `You are cleaning up raw keyword/pain-point extraction from a batch of sales calls into a small, high-signal set for a marketing dashboard.

Rules:
- Merge semantically identical or near-duplicate raw items into one canonical item (e.g. "lead research", "research automation", and "manual lead research" likely merge). Keep genuinely distinct items separate.
- For keywords: DROP generic/vague single words that aren't specific enough to target for SEO or content (e.g. "research", "data", "automation", "workflows", "insights", "quality", "marketing", "operations", "output", "tools" used alone). KEEP specific, meaningful phrases (e.g. "tool sprawl", "lead research automation", "CRM hygiene", "churn detection", competitor/product names, specific feature names).
- For pain points: keep genuine, specific customer problems — drop anything too vague to act on.
- count = how many of the raw input items (from the counts given) map into this canonical item. Sum the raw counts of everything merged into it.
- Sort both lists by count descending. Return at most 15 keywords and at most 15 pain points. If fewer than 15 survive the quality bar, return fewer — do not pad with weak items.

Return JSON with this exact shape:
{
  "keywords": [{ "name": "canonical keyword", "count": 3 }],
  "painPoints": [{ "name": "canonical pain point", "count": 2 }]
}`;

async function canonicalize(rawKeywords, rawPainPoints) {
  if (rawKeywords.length === 0 && rawPainPoints.length === 0) {
    return { keywords: [], painPoints: [] };
  }
  const userPrompt = `Raw keywords (name, raw count):\n${JSON.stringify(rawKeywords, null, 2)}\n\nRaw pain points (name, raw count):\n${JSON.stringify(
    rawPainPoints,
    null,
    2
  )}\n\nCanonicalize, filter, and cap each list at 15 as JSON.`;
  return callJSON(CANONICALIZE_SYSTEM_PROMPT, userPrompt, { max_tokens: 2000 });
}

export async function aggregateAnalysis(callAnalyses) {
  const allCompetitors = tally(callAnalyses.flatMap((c) => c.competitorsMentioned || []));
  const rawKeywords = tally(callAnalyses.flatMap((c) => c.keywords || []));
  const rawPainPoints = tally(callAnalyses.flatMap((c) => c.painPoints || []));
  const refundRiskCalls = callAnalyses
    .filter((c) => c.refundRisk?.level && c.refundRisk.level !== 'none')
    .map((c) => ({ label: c.label, level: c.refundRisk.level, reason: c.refundRisk.reason, quote: c.refundRisk.quote }));

  const themePrompt = `Call analyses (label, summary, objections, pain points):\n${JSON.stringify(
    callAnalyses.map((c) => ({
      label: c.label,
      summary: c.summary,
      objections: c.objections,
      painPoints: c.painPoints
    })),
    null,
    2
  )}\n\nFind the thematic clusters and overall summary as JSON.`;

  const [{ overallSummary, themes }, { keywords, painPoints }] = await Promise.all([
    callJSON(THEME_SYSTEM_PROMPT, themePrompt),
    canonicalize(rawKeywords, rawPainPoints)
  ]);

  return {
    callCount: callAnalyses.length,
    overallSummary,
    competitors: allCompetitors,
    keywords: keywords || [],
    painPoints: painPoints || [],
    refundRiskCalls,
    themes: themes || []
  };
}
