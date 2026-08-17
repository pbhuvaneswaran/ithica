import { callJSON } from './openaiClient.js';

const SYSTEM_PROMPT = `You are a B2B sales-call analyst reviewing ONE call out of a larger batch. Extract structured, grounded insight — never invent or paraphrase quotes.

Rules:
- "quote" fields must be VERBATIM substrings copied from the transcript.
- If a field doesn't apply, return an empty string or empty array — never guess.
- Refund risk: assess whether this call signals a risk of churn/refund/cancellation (e.g. unmet expectations, price objections, competitor comparison, unresolved blockers). Base the level strictly on what's said, not assumptions.

Return JSON with this exact shape:
{
  "summary": "1-2 sentence neutral summary of this call",
  "objections": [{ "objection": "short label", "quote": "verbatim quote" }],
  "customerQuotes": ["verbatim quote 1", "verbatim quote 2"],
  "competitorsMentioned": ["Competitor A"],
  "keywords": ["3-6 recurring topic words/phrases from this call, lowercase"],
  "painPoints": ["short pain point label 1", "short pain point label 2"],
  "refundRisk": { "level": "none|low|medium|high", "reason": "short grounded reason", "quote": "verbatim quote supporting this, or empty string" }
}`;

export async function analyzeCall(transcript, label) {
  const userPrompt = `Call: ${label}\n\nTranscript:\n"""\n${transcript}\n"""\n\nExtract the structured, grounded analysis as JSON.`;
  const analysis = await callJSON(SYSTEM_PROMPT, userPrompt);
  return { label, ...analysis };
}
