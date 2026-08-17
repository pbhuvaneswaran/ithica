import { useState } from 'react';
import { Card, SourceQuote, ArticleBody } from './shared.jsx';

function OutlineEditor({ outline, onChange }) {
  function updateField(field, value) {
    onChange({ ...outline, [field]: value });
  }

  function updateSection(index, field, value) {
    const sections = outline.sections.map((s, i) => (i === index ? { ...s, [field]: value } : s));
    onChange({ ...outline, sections });
  }

  function removeSection(index) {
    onChange({ ...outline, sections: outline.sections.filter((_, i) => i !== index) });
  }

  function addSection() {
    onChange({ ...outline, sections: [...outline.sections, { heading: '', description: '' }] });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-ink-faint">Title</label>
        <input
          value={outline.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full mt-1 border border-line bg-surface-dim rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-ink-faint">Target keyword</label>
          <input
            value={outline.targetKeyword}
            onChange={(e) => updateField('targetKeyword', e.target.value)}
            className="w-full mt-1 border border-line bg-surface-dim rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-faint">Angle</label>
          <input
            value={outline.angle}
            onChange={(e) => updateField('angle', e.target.value)}
            className="w-full mt-1 border border-line bg-surface-dim rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none"
          />
        </div>
      </div>

      <SourceQuote quote={outline.groundedIn} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-ink-faint">Core sections (intro, TL;DR, closing, and FAQ are added automatically)</label>
          <button onClick={addSection} className="text-xs text-accent hover:underline">
            + Add section
          </button>
        </div>
        <div className="space-y-2">
          {outline.sections.map((s, i) => (
            <div key={i} className="border border-line rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-xs text-ink-faint mt-2">{i + 1}.</span>
                <div className="flex-1 space-y-1">
                  <input
                    value={s.heading}
                    onChange={(e) => updateSection(i, 'heading', e.target.value)}
                    placeholder="Section heading"
                    className="w-full border border-line bg-surface-dim rounded-lg px-3 py-1.5 text-sm font-medium text-ink focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none"
                  />
                  <input
                    value={s.description}
                    onChange={(e) => updateSection(i, 'description', e.target.value)}
                    placeholder="What this section covers"
                    className="w-full border border-line bg-surface-dim rounded-lg px-3 py-1.5 text-xs text-ink-soft focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none"
                  />
                </div>
                <button onClick={() => removeSection(i)} className="text-xs text-red-400 hover:underline mt-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function downloadMarkdown(article) {
  const date = new Date().toISOString().slice(0, 10);
  const frontmatter = [
    '---',
    `title: "${article.title.replace(/"/g, '\\"')}"`,
    `date: "${date}"`,
    `keywords: [${(article.seoKeywords || []).map((k) => `"${k}"`).join(', ')}]`,
    '---',
    ''
  ].join('\n');
  const content = frontmatter + article.articleBody;
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slugify(article.title) || 'article'}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ArticleEditor({ article, onChange, onPublish }) {
  const [mode, setMode] = useState('preview'); // 'preview' | 'edit'
  const [published, setPublished] = useState(false);

  function handlePublish() {
    downloadMarkdown(article);
    setPublished(true);
    onPublish?.();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex-1 min-w-[240px]">
          {mode === 'edit' ? (
            <input
              value={article.title}
              onChange={(e) => onChange({ ...article, title: e.target.value })}
              className="w-full font-display text-2xl font-bold text-ink bg-transparent border-b border-line focus:border-accent-deep outline-none pb-1"
            />
          ) : (
            <>
              <p className="text-xs font-medium text-accent mb-1">{article.topic}</p>
              <h2 className="font-display text-2xl font-bold text-ink">{article.title}</h2>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex text-xs border border-line rounded-lg overflow-hidden">
            <button
              onClick={() => setMode('preview')}
              className={`px-3 py-1.5 ${mode === 'preview' ? 'bg-gradient-to-r from-accent-a to-accent-b text-bg' : 'text-ink-soft hover:bg-surface-dim'}`}
            >
              Preview
            </button>
            <button
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 ${mode === 'edit' ? 'bg-gradient-to-r from-accent-a to-accent-b text-bg' : 'text-ink-soft hover:bg-surface-dim'}`}
            >
              Edit
            </button>
          </div>
          <button
            onClick={handlePublish}
            className="text-sm font-semibold bg-gradient-to-r from-accent-a to-accent-b hover:brightness-110 text-bg px-4 py-2 rounded-full transition-all"
          >
            {published ? 'Downloaded ✓ Publish again' : 'Publish'}
          </button>
        </div>
      </div>

      {mode === 'edit' ? (
        <textarea
          value={article.articleBody}
          onChange={(e) => onChange({ ...article, articleBody: e.target.value })}
          rows={36}
          className="w-full border border-line bg-surface-dim rounded-xl p-4 text-sm font-mono text-ink leading-relaxed focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none resize-y"
        />
      ) : (
        <div className="border border-line rounded-xl p-6 bg-surface-dim">
          <ArticleBody text={article.articleBody} />
        </div>
      )}

      {article.seoKeywords?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.seoKeywords.map((kw, i) => (
            <span key={i} className="font-mono text-xs bg-accent-soft text-accent px-2 py-1 rounded-full border border-accent-deep/30">
              {kw}
            </span>
          ))}
        </div>
      )}
      <SourceQuote quote={article.groundedIn} />
      <p className="text-xs text-ink-faint mt-4">
        Publish downloads this article as a Markdown file (with title/date/keyword frontmatter) — drop it into
        your site's content folder (e.g. a vibe-coded blog's `/content/posts/`) and commit it to publish.
      </p>
    </div>
  );
}

function TopicPane({ topicState, onOutlineFetched, onOutlineChange, onApprove, onArticleChange }) {
  const { topic, outline, article, loadingOutline, approving, error } = topicState;

  if (loadingOutline) {
    return (
      <Card title="Outline">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-line border-t-accent rounded-full animate-spin" />
          <p className="text-sm text-ink-soft">Drafting outline for "{topic.title}"…</p>
        </div>
      </Card>
    );
  }

  if (!outline) {
    return (
      <Card title="Topic">
        <p className="text-xs font-medium text-accent mb-1">{topic.targetKeyword}</p>
        <h4 className="font-display text-lg font-bold text-ink mb-2">{topic.title}</h4>
        <p className="text-sm text-ink-soft mb-4">{topic.angle}</p>
        <SourceQuote quote={topic.groundedIn} />
        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
        <button
          onClick={onOutlineFetched}
          className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-accent-a to-accent-b hover:brightness-110 text-bg font-semibold px-5 py-2.5 rounded-full transition-all"
        >
          Generate outline
        </button>
      </Card>
    );
  }

  if (article) {
    return (
      <div className="bg-surface rounded-2xl border border-line shadow-[0_20px_48px_-26px_rgba(0,0,0,0.6)] p-8">
        <ArticleEditor article={article} onChange={onArticleChange} />
      </div>
    );
  }

  return (
    <Card title="Outline">
      <OutlineEditor outline={outline} onChange={onOutlineChange} />
      {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      <button
        onClick={onApprove}
        disabled={approving}
        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-accent-a to-accent-b hover:brightness-110 disabled:opacity-50 text-bg font-semibold px-5 py-2.5 rounded-full transition-all"
      >
        {approving ? 'Writing 1700-2100 word article…' : 'Approve & write article'}
      </button>
      {approving && <p className="text-xs text-ink-faint mt-2">Usually 30-60 seconds.</p>}
    </Card>
  );
}

export default function ArticlesView({ topics, aggregate }) {
  const [selectedId, setSelectedId] = useState(topics[0]?.id || null);
  const [states, setStates] = useState(() =>
    Object.fromEntries(
      topics.map((topic) => [
        topic.id,
        { topic, outline: null, article: null, loadingOutline: false, approving: false, error: '' }
      ])
    )
  );

  function patchState(id, patch) {
    setStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function fetchOutline(id) {
    patchState(id, { loadingOutline: true, error: '' });
    try {
      const res = await fetch('/api/outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: states[id].topic, aggregate })
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.error || 'Outline generation failed.');
      patchState(id, { outline: data.outline, loadingOutline: false });
    } catch (err) {
      patchState(id, { loadingOutline: false, error: err.message });
    }
  }

  async function approveOutline(id) {
    patchState(id, { approving: true, error: '' });
    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outline: states[id].outline, aggregate })
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.error || 'Article generation failed.');
      patchState(id, { article: data.article, approving: false });
    } catch (err) {
      patchState(id, { approving: false, error: err.message });
    }
  }

  const selected = states[selectedId];
  const viewingArticle = !!selected?.article;

  if (viewingArticle) {
    return (
      <div>
        <button
          onClick={() => patchState(selectedId, { article: null })}
          className="text-sm text-accent hover:underline mb-4"
        >
          ← Back to outline
        </button>
        <TopicPane
          topicState={selected}
          onOutlineFetched={() => fetchOutline(selectedId)}
          onOutlineChange={(updated) => patchState(selectedId, { outline: updated })}
          onApprove={() => approveOutline(selectedId)}
          onArticleChange={(updated) => patchState(selectedId, { article: updated })}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-ink-faint uppercase tracking-wide px-1">
          {topics.length} grounded topic{topics.length === 1 ? '' : 's'}
        </p>
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedId(topic.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors border ${
              selectedId === topic.id
                ? 'bg-gradient-to-r from-accent-a to-accent-b text-bg border-transparent'
                : 'bg-surface text-ink-soft border-line hover:bg-surface-dim'
            }`}
          >
            <span className="block font-medium truncate">{topic.title}</span>
            <span className={`text-xs ${selectedId === topic.id ? 'opacity-80' : 'text-ink-faint'}`}>
              {states[topic.id]?.article ? '✓ article written' : states[topic.id]?.outline ? 'outline drafted' : 'not started'}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <TopicPane
          topicState={selected}
          onOutlineFetched={() => fetchOutline(selectedId)}
          onOutlineChange={(updated) => patchState(selectedId, { outline: updated })}
          onApprove={() => approveOutline(selectedId)}
          onArticleChange={(updated) => patchState(selectedId, { article: updated })}
        />
      )}
    </div>
  );
}
