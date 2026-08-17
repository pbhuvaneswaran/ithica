import { useState } from 'react';
import { Card } from './shared.jsx';
import ContentCalendar from './ContentCalendar.jsx';

export default function SocialMediaView({ aggregate, topics }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const numWeeks = Math.min(6, Math.max(2, topics.length));

  async function generate() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/content-calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aggregate, numWeeks })
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.error || 'Content calendar generation failed.');
      setPosts(data.posts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!posts) {
    return (
      <Card title="LinkedIn Content Calendar">
        <p className="text-sm text-ink-soft mb-4">
          Generate a {numWeeks}-week, 3-posts-a-week LinkedIn calendar grounded in your call data — a mix of
          informative, meme, genuine-conversation, TOFU, BOFU, and brand-analogy posts, laid out on a real
          calendar alongside your article topics.
        </p>
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-a to-accent-b hover:brightness-110 disabled:opacity-50 text-bg font-semibold px-5 py-2.5 rounded-full transition-all"
        >
          {loading ? 'Generating calendar…' : 'Generate content calendar'}
        </button>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <ContentCalendar posts={posts} topics={topics} />
      <button onClick={generate} disabled={loading} className="text-sm text-accent hover:underline">
        {loading ? 'Regenerating…' : 'Regenerate calendar'}
      </button>
    </div>
  );
}
