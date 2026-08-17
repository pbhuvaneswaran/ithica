import { useRef, useState } from 'react';

export default function BatchUpload({ onAnalyzed }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [showPaste, setShowPaste] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
    e.target.value = '';
  }

  function removeFile(name) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  async function onAnalyze() {
    if (files.length === 0 && transcript.trim().length < 20) {
      setError('Upload at least one call transcript file, or paste a transcript.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append('files', f));
      if (transcript.trim()) formData.append('transcript', transcript.trim());
      const res = await fetch('/api/analyze', { method: 'POST', body: formData });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Server returned an unexpected response.');
      }
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');
      onAnalyzed(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalSources = files.length + (transcript.trim() ? 1 : 0);

  return (
    <div className="bg-surface rounded-2xl border border-line shadow-[0_20px_48px_-26px_rgba(0,0,0,0.6)] p-6">
      <label className="block text-sm font-medium text-ink mb-2">
        Upload call transcripts (PDF, DOCX, HTML, TXT) — one call or a whole batch. Docs with multiple
        calls inside are detected and split automatically.
      </label>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-2 border-dashed border-line hover:border-accent-deep hover:bg-accent-soft rounded-xl py-8 text-center transition-colors"
      >
        <p className="text-sm font-medium text-ink">Click to select files</p>
        <p className="text-xs text-ink-faint mt-1">Select multiple at once — up to 25 files per batch</p>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.html,.htm,.txt,.md"
        onChange={handleFileChange}
        className="hidden"
      />

      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-line border border-line rounded-xl overflow-hidden">
          {files.map((f) => (
            <li key={f.name} className="flex items-center justify-between px-4 py-2 text-sm">
              <span className="text-ink-soft truncate">{f.name}</span>
              <button onClick={() => removeFile(f.name)} className="text-xs text-red-400 hover:underline ml-3 shrink-0">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => setShowPaste((v) => !v)}
        className="mt-4 text-xs font-medium text-accent hover:underline"
      >
        {showPaste ? '− Hide paste option' : '+ Or paste a transcript instead'}
      </button>

      {showPaste && (
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={6}
          placeholder="Paste a call transcript here…"
          className="w-full mt-2 rounded-xl border border-line bg-surface-dim focus:border-accent-deep focus:ring-2 focus:ring-accent-soft outline-none p-4 text-sm text-ink resize-y"
        />
      )}

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-accent-a to-accent-b hover:brightness-110 disabled:opacity-50 text-bg font-semibold px-5 py-2.5 rounded-full transition-all"
      >
        {loading ? 'Analyzing…' : `Analyze ${totalSources || ''} source${totalSources === 1 ? '' : 's'}`.trim()}
      </button>

      {loading && (
        <p className="text-xs text-ink-faint mt-3">
          Each call is analyzed individually, then aggregated into themes and article topics. Usually 10-30 seconds.
        </p>
      )}
    </div>
  );
}
