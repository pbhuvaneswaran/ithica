import { useState } from 'react';
import Home from './components/Home.jsx';
import BatchUpload from './components/BatchUpload.jsx';
import BatchResults from './components/BatchResults.jsx';

function Header({ onBack, onLogoClick }) {
  return (
    <header className="border-b border-line-soft bg-bg/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
        <button onClick={onLogoClick} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-accent-a to-accent-b flex items-center justify-center text-bg font-display font-bold">
            I
          </div>
          <div className="flex-1 text-left">
            <h1 className="font-display text-lg font-semibold text-ink">
              Ithica<span className="text-accent">.ai</span>
            </h1>
            <p className="text-xs text-ink-faint">Grounded content, straight from real conversations</p>
          </div>
        </button>
        <div className="flex-1" />
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm font-medium text-ink border border-line hover:border-ink-soft px-4 py-2 rounded-full transition-colors"
          >
            ← New source
          </button>
        )}
      </div>
    </header>
  );
}

export default function App() {
  const [page, setPage] = useState('home'); // 'home' | 'upload' | 'results'
  const [batchData, setBatchData] = useState(null);

  function goHome() {
    setPage('home');
    setBatchData(null);
  }

  if (page === 'home') {
    return <Home onStart={() => setPage('upload')} />;
  }

  return (
    <div className="min-h-screen bg-bg font-body">
      <Header
        onBack={
          page === 'results'
            ? () => {
                setBatchData(null);
                setPage('upload');
              }
            : null
        }
        onLogoClick={goHome}
      />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {page === 'upload' && (
          <BatchUpload
            onAnalyzed={(data) => {
              setBatchData(data);
              setPage('results');
            }}
          />
        )}
        {page === 'results' && batchData && <BatchResults data={batchData} />}
      </main>
    </div>
  );
}
