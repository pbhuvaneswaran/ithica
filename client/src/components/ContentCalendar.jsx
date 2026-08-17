import { useMemo, useState } from 'react';
import { Card, SourceQuote } from './shared.jsx';

const DAY_OFFSET = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4, Saturday: 5, Sunday: 6 };
const WEEKDAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function nextMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 1 ? 0 : (8 - day) % 7 || 7;
  if (day === 1) return d;
  d.setDate(d.getDate() + diff);
  return d;
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export default function ContentCalendar({ posts, topics }) {
  const week1Monday = useMemo(() => nextMonday(new Date()), []);

  const itemsByDate = useMemo(() => {
    const map = {};
    posts.forEach((post) => {
      const date = addDays(week1Monday, (post.week - 1) * 7 + (DAY_OFFSET[post.day] ?? 0));
      const key = dateKey(date);
      map[key] = map[key] || [];
      map[key].push({ kind: 'linkedin', data: post });
    });
    topics.forEach((topic, i) => {
      const date = addDays(week1Monday, i * 7 + 3); // Thursday of week i+1
      const key = dateKey(date);
      map[key] = map[key] || [];
      map[key].push({ kind: 'blog', data: topic });
    });
    return map;
  }, [posts, topics, week1Monday]);

  const viewMonth = week1Monday.getMonth();
  const viewYear = week1Monday.getFullYear();

  const grid = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first offset
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(viewYear, viewMonth, day));
    return cells;
  }, [viewYear, viewMonth]);

  const totalScheduled = Object.values(itemsByDate).reduce((sum, items) => sum + items.length, 0);
  const todayKey = dateKey(new Date());

  const [selectedKey, setSelectedKey] = useState(null);
  const selectedItems = selectedKey ? itemsByDate[selectedKey] || [] : [];

  return (
    <div className="space-y-5">
      <Card
        title={`${MONTH_NAMES[viewMonth]} ${viewYear}`}
        action={
          <span className="font-mono text-xs font-medium bg-accent-soft text-accent px-3 py-1 rounded-full border border-accent-deep/30">
            {totalScheduled} scheduled
          </span>
        }
      >
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAY_HEADERS.map((d) => (
            <div key={d} className="font-mono text-xs font-medium text-ink-faint text-center py-1">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {grid.map((date, i) => {
            if (!date) return <div key={i} />;
            const key = dateKey(date);
            const items = itemsByDate[key] || [];
            const isToday = key === todayKey;
            const isSelected = key === selectedKey;
            return (
              <button
                key={i}
                onClick={() => items.length > 0 && setSelectedKey(isSelected ? null : key)}
                className={`aspect-square rounded-lg border p-2 text-left transition-colors bg-surface-dim ${
                  isSelected
                    ? 'border-accent-deep bg-accent-soft'
                    : isToday
                      ? 'border-accent-deep/60'
                      : 'border-line-soft hover:bg-surface'
                } ${items.length === 0 ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className={`font-mono text-xs ${isToday ? 'font-bold text-accent' : 'text-ink-faint'}`}>{date.getDate()}</span>
                <div className="flex gap-1 mt-1">
                  {items.some((it) => it.kind === 'blog') && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  {items.some((it) => it.kind === 'linkedin') && <span className="w-1.5 h-1.5 rounded-full bg-[#8891A5]" />}
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" /> Blog
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8891A5]" /> LinkedIn
          </span>
        </div>
      </Card>

      {selectedItems.length > 0 && (
        <Card title={selectedKey}>
          <div className="space-y-4">
            {selectedItems.map((item, i) =>
              item.kind === 'linkedin' ? (
                <div key={i} className="border border-line rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold bg-[#8891A5]/15 text-[#B8C0D4] px-2 py-0.5 rounded-full">
                      LinkedIn · {item.data.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-ink mb-2">{item.data.hook}</p>
                  <p className="text-sm text-ink-soft whitespace-pre-line leading-relaxed">{item.data.draftPost}</p>
                  <SourceQuote quote={item.data.groundedIn} />
                </div>
              ) : (
                <div key={i} className="border border-line rounded-xl p-4">
                  <span className="font-mono text-xs font-semibold bg-accent-soft text-accent px-2 py-0.5 rounded-full">Blog topic</span>
                  <p className="text-sm font-medium text-ink mt-2">{item.data.title}</p>
                  <p className="text-sm text-ink-soft mt-1">{item.data.angle}</p>
                </div>
              )
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
