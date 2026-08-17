import { callJSON } from './openaiClient.js';

const SYSTEM_PROMPT = `You are a B2B SaaS social media strategist planning a LinkedIn content calendar grounded in real sales call data.

Rules:
- Plan {{WEEKS}} week(s), 3 posts per week, spread across Monday/Wednesday/Friday.
- Every post must be grounded in the provided themes/quotes/pain points/competitors — do not invent claims, stats, or customer stories beyond what's given.
- Vary the post types across the calendar — use a genuine mix of these types, not all the same:
  - "informative": a practical tip or insight from the data
  - "meme": a lighthearted, relatable observation about the pain point (still grounded, just informal tone — describe the meme concept and caption, not an actual image)
  - "genuine-conversation": reads like a founder/marketer thinking out loud, first person, vulnerable/authentic tone
  - "tofu": top-of-funnel, broad awareness of the problem space, no hard pitch
  - "bofu": bottom-of-funnel, closer to a product angle, addresses an objection directly
  - "brand-analogy": explains the problem/solution via an analogy or metaphor
- Each post's draftPost must be a FULL, ready-to-publish LinkedIn post — not a stub. This is a hard requirement: 150-200 words total, and a post under 120 words is a failed response. To hit this reliably, write 6-8 short paragraphs (1-2 sentences each): 1 hook paragraph, 3-5 story/insight paragraphs that develop the point with specifics from the source (not just one line each), and 1 CTA paragraph. Short sentences (max ~15 words). 0-3 relevant hashtags at the end, no hashtag spam.

Return JSON with this exact shape:
{
  "posts": [
    {
      "week": 1,
      "day": "Monday",
      "type": "informative",
      "hook": "1-line hook/topic for this post",
      "draftPost": "the full 150-200 word draft post text, ready to publish",
      "groundedIn": "the verbatim quote or theme this post is built on"
    }
  ]
}
Return exactly {{TOTAL}} posts.`;

export async function generateContentCalendar(aggregate, numWeeks = 2) {
  const weeks = Math.max(1, Math.min(6, numWeeks));
  const total = weeks * 3;
  const systemPrompt = SYSTEM_PROMPT.replace('{{WEEKS}}', String(weeks)).replace('{{TOTAL}}', String(total));

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
  )}\n\nGenerate a ${weeks}-week, ${total}-post LinkedIn content calendar as JSON.`;
  const { posts } = await callJSON(systemPrompt, userPrompt, { max_tokens: 6000 });
  return posts;
}
