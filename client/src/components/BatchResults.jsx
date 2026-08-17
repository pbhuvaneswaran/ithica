import { useState } from 'react';
import AnalysisView from './AnalysisView.jsx';
import ArticlesView from './ArticlesView.jsx';
import SocialMediaView from './SocialMediaView.jsx';

const SECTIONS = [
  { id: 'analysis', label: 'Analysis' },
  { id: 'articles', label: 'Articles' },
  { id: 'social', label: 'Social Media' }
];

export default function BatchResults({ data }) {
  const [section, setSection] = useState('analysis');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 mt-6">
      <nav className="lg:sticky lg:top-8 self-start">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors ${
              section === s.id
                ? 'bg-gradient-to-r from-accent-a to-accent-b text-bg'
                : 'text-ink-soft hover:bg-surface hover:text-ink'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div>
        {section === 'analysis' && <AnalysisView aggregate={data.aggregate} callAnalyses={data.callAnalyses} />}
        {section === 'articles' && <ArticlesView topics={data.topics} aggregate={data.aggregate} />}
        {section === 'social' && <SocialMediaView aggregate={data.aggregate} topics={data.topics} />}
      </div>
    </div>
  );
}
