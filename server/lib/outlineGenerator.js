import { callJSON } from './openaiClient.js';

const SYSTEM_PROMPT = `You are a senior B2B SaaS content strategist turning one approved article topic into a detailed outline.

Rules:
- The outline must stay true to the topic's title, angle, and target keyword — don't drift into a different topic.
- Every section must be grounded in the themes, pain points, competitors, or quotes provided — do not invent sections unrelated to the data.
- Produce 5-6 core sections a writer can expand into a full article (these will later be combined with a standard intro/TL;DR/FAQ wrapper, so focus only on the substantive middle sections: problem framing, root cause, what good looks like, a practical framework, common mistakes, how to evaluate/get started — pick whichever 5-6 fit this topic best).

Return JSON with this exact shape:
{
  "title": "the topic's title, lightly polished if needed",
  "targetKeyword": "primary SEO keyword phrase",
  "angle": "1 sentence describing the article's angle/thesis",
  "groundedIn": "the verbatim quote or theme this outline is built on",
  "sections": [
    { "heading": "H2 heading for this section", "description": "1 sentence on what this section covers" }
  ]
}`;

export async function generateOutlineForTopic(topic, aggregate) {
  const userPrompt = `Approved topic:\n${JSON.stringify(topic, null, 2)}\n\nAggregate analysis from ${aggregate.callCount} sales calls (for grounding):\n${JSON.stringify(
    {
      overallSummary: aggregate.overallSummary,
      themes: aggregate.themes,
      competitors: aggregate.competitors,
      painPoints: aggregate.painPoints
    },
    null,
    2
  )}\n\nGenerate a detailed 5-6 section outline for this topic as JSON.`;
  return callJSON(SYSTEM_PROMPT, userPrompt, { max_tokens: 1500 });
}
