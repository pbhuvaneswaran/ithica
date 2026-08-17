import { Card, SourceQuote } from './shared.jsx';

function Tally({ items, emptyText }) {
  return (
    <div>
      {items.length === 0 && <p className="text-sm text-ink-faint">{emptyText}</p>}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item.name} className="font-mono text-xs bg-accent-soft text-accent px-2 py-1 rounded-full border border-accent-deep/30">
            {item.name} {item.count > 1 && <span className="opacity-60">×{item.count}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

const RISK_COLORS = {
  high: 'bg-red-500/15 text-red-300',
  medium: 'bg-amber-500/15 text-amber-300',
  low: 'bg-white/5 text-ink-soft'
};

export default function AnalysisView({ aggregate, callAnalyses }) {
  return (
    <div className="space-y-5">
      <Card title="Overview">
        <p className="text-sm text-ink-soft">{aggregate.overallSummary}</p>
        <p className="text-xs text-ink-faint mt-2">{aggregate.callCount} calls analyzed</p>
      </Card>

      <Card title="Competitors Mentioned — By Call">
        {callAnalyses.every((c) => !c.competitorsMentioned?.length) && (
          <p className="text-sm text-ink-faint">No competitors mentioned across these calls.</p>
        )}
        <div className="space-y-2">
          {callAnalyses
            .filter((c) => c.competitorsMentioned?.length > 0)
            .map((c, i) => (
              <div key={i} className="flex items-start justify-between border border-line rounded-lg px-3 py-2">
                <span className="text-sm text-ink">{c.label}</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {c.competitorsMentioned.map((name, j) => (
                    <span key={j} className="font-mono text-xs bg-[rgba(56,214,200,.13)] text-[#8FEBDF] px-2 py-0.5 rounded-full border border-[#38D6C8]/30">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <p className="text-xs font-medium text-ink-faint mt-4 mb-2">Overall tally</p>
        <Tally items={aggregate.competitors} emptyText="" />
      </Card>

      <Card title="Recurring Keywords (Customer Language)">
        <Tally items={aggregate.keywords} emptyText="No recurring keywords found." />
      </Card>

      <Card title="Customer Pain Points">
        <Tally items={aggregate.painPoints} emptyText="No pain points found." />
      </Card>

      <Card title="Refund / Churn Risk">
        {aggregate.refundRiskCalls.length === 0 && <p className="text-sm text-ink-faint">No risk signals detected.</p>}
        <div className="space-y-3">
          {aggregate.refundRiskCalls.map((r, i) => (
            <div key={i} className="border border-line rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{r.label}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RISK_COLORS[r.level] || RISK_COLORS.low}`}>
                  {r.level}
                </span>
              </div>
              <p className="text-sm text-ink-soft mt-1">{r.reason}</p>
              <SourceQuote quote={r.quote} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Themes Across Calls">
        <div className="space-y-3">
          {aggregate.themes.map((t, i) => (
            <div key={i} className="border border-line rounded-lg p-3">
              <p className="text-sm font-medium text-ink">{t.theme}</p>
              <p className="text-xs text-ink-faint mt-1">Calls: {t.callLabels?.join(', ')}</p>
              <SourceQuote quote={t.supportingQuote} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Per-Call Summaries">
        <div className="space-y-3">
          {callAnalyses.map((c, i) => (
            <div key={i} className="border border-line rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{c.label}</span>
                {c.refundRisk?.level && c.refundRisk.level !== 'none' && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RISK_COLORS[c.refundRisk.level] || RISK_COLORS.low}`}>
                    {c.refundRisk.level} risk
                  </span>
                )}
              </div>
              {c.error ? (
                <p className="text-sm text-red-400 mt-1">{c.error}</p>
              ) : (
                <p className="text-sm text-ink-soft mt-1">{c.summary}</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
