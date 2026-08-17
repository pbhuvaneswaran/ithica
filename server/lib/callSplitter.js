const HEADER_PATTERNS = [
  /^\s*(\d{1,3})\s*[—\-–]\s*.+$/, // "01 — Marketing Operations Leader"
  /^\s*call\s*\d+\s*[:.\-]/i, // "Call 1:", "Call 1 -"
  /^\s*conversation\s*\d+\s*[:.\-]/i // "Conversation 1:"
];

const PARTICIPANTS_PATTERN = /^\s*participants\s*:/i;

function findBoundaries(text) {
  const lines = text.split('\n');
  const boundaries = [];

  lines.forEach((line, i) => {
    if (HEADER_PATTERNS.some((re) => re.test(line))) {
      boundaries.push({ line: i, label: line.trim().slice(0, 80) });
    }
  });

  if (boundaries.length >= 2) return boundaries;

  // fallback: split on repeated "Participants:" lines
  const participantBoundaries = [];
  lines.forEach((line, i) => {
    if (PARTICIPANTS_PATTERN.test(line)) {
      participantBoundaries.push({ line: i, label: line.trim().slice(0, 80) });
    }
  });

  return participantBoundaries.length >= 2 ? participantBoundaries : [];
}

export function splitIntoCalls(text, sourceLabel) {
  const boundaries = findBoundaries(text);

  if (boundaries.length < 2) {
    return [{ label: sourceLabel, text }];
  }

  const lines = text.split('\n');
  const calls = [];

  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].line;
    const end = i + 1 < boundaries.length ? boundaries[i + 1].line : lines.length;
    const chunk = lines.slice(start, end).join('\n').trim();
    if (chunk.split(/\s+/).length < 15) continue; // skip near-empty segments
    calls.push({ label: `${sourceLabel} — ${boundaries[i].label}`, text: chunk });
  }

  return calls.length > 0 ? calls : [{ label: sourceLabel, text }];
}
