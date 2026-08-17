export function SourceQuote({ quote }) {
  if (!quote) return null;
  return (
    <p className="mt-3 text-xs text-accent-b bg-accent-soft border border-line rounded-lg px-3 py-2 italic">
      "{quote}"
    </p>
  );
}

export function Card({ title, children, className = '', action = null }) {
  return (
    <div className={`bg-surface rounded-2xl border border-line shadow-[0_20px_48px_-26px_rgba(0,0,0,0.6)] p-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-sm font-semibold text-accent-b uppercase tracking-wide">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function inlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function ArticleBody({ text }) {
  const lines = text.split('\n');
  return (
    <div className="text-sm text-ink-soft leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
          return null; // stray title H1 — title is already rendered separately
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h5 key={i} className="font-display text-sm font-semibold text-ink mt-4 mb-1">
              {inlineMarkdown(trimmed.replace(/^###\s*/, ''))}
            </h5>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={i} className="font-display text-base font-semibold text-ink mt-6 mb-2">
              {inlineMarkdown(trimmed.replace(/^##\s*/, ''))}
            </h4>
          );
        }
        if (/^[-*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
          return (
            <li key={i} className="ml-4 list-disc marker:text-accent">
              {inlineMarkdown(trimmed.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, ''))}
            </li>
          );
        }
        if (!trimmed) return null;
        return (
          <p key={i} className="mb-3">
            {inlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
