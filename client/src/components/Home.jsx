import { useEffect, useRef, useState } from 'react';
import { HOME_CSS, LOGO_DATA_URI } from './homeStyles.js';

const FORMAT_CONTENT = {
  blog: {
    tag: 'blog post · 620 words',
    title: '"Onboarding shouldn\'t be the reason deals stall"',
    body: "Across the last six calls, one theme kept surfacing: teams love the product, but the first two weeks feel heavier than they should. Here's what that's actually costing deals — and what we changed..."
  },
  linkedin: {
    tag: 'LinkedIn post · 3 lines',
    title: 'Buyers keep saying the same thing about onboarding.',
    body: "We pulled the theme from six calls this month. Rough onboarding was the #1 objection before renewal season — so we fixed the first-week flow. Here's what changed →"
  },
  onepager: {
    tag: 'one-pager · sales enablement',
    title: 'Objection: "Onboarding was rough with our last tool"',
    body: 'Talking points: (1) Guided setup in the first session, not a self-serve doc dump. (2) A dedicated contact for the first two weeks. (3) Reference case: time-to-value cut from 21 to 6 days.'
  },
  battlecard: {
    tag: 'battlecard · vs. Competitor A',
    title: "When a buyer mentions Competitor A's onboarding",
    body: "They hear: \"rough onboarding, long time to value.\" Lead with our guided first session and the 6-day time-to-value benchmark. Don't open with price — buyers raise onboarding first for a reason."
  }
};

const CAL_SCHEDULED = { 4: 'blog', 11: 'li', 18: 'blog', 25: 'li' };

function Logo({ onClick }) {
  return (
    <button type="button" className="logo" onClick={onClick}>
      <img className="logo-mark" src={LOGO_DATA_URI} alt="" />
      <span className="logo-text">
        Ithica<span className="logo-dot">.ai</span>
      </span>
    </button>
  );
}

export default function Home({ onStart }) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [activeFormat, setActiveFormat] = useState('blog');
  const calGridRef = useRef(null);

  useEffect(() => {
    document.title = 'Ithica.ai — Turn sales calls into insight, content, and a calendar';
  }, []);

  useEffect(() => {
    if (!calGridRef.current) return;
    const leadingBlanks = 6;
    const daysInMonth = 31;
    let html = '';
    for (let i = 0; i < leadingBlanks; i++) html += '<div class="cal-day blank"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const dot = CAL_SCHEDULED[d] ? `<span class="cal-dot ${CAL_SCHEDULED[d]}"></span>` : '';
      html += `<div class="cal-day">${d}${dot}</div>`;
    }
    calGridRef.current.innerHTML = html;
  }, []);

  const fc = FORMAT_CONTENT[activeFormat];

  return (
    <div id="ithica-home">
      <style>{HOME_CSS}</style>

      <header className="nav">
        <div className="nav-inner">
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <nav className="nav-links">
            <a href="#feature-analysis">Product</a>
            <a href="#demo">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-cta">
            <button type="button" className="btn btn-primary" onClick={onStart}>
              Try now
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="hero-badge">🎯 Built for B2B SaaS GTM teams</p>
              <h1>
                Turn your sales calls into <span className="accent-text">on-brand content</span>, scheduled
                automatically.
              </h1>
              <p className="lede">
                Ithica pulls the keywords, pain points, and competitors your buyers mention, drafts blog and
                LinkedIn content in your brand's voice, and lines it all up on a calendar — ready to switch
                formats in one click.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={onStart}>
                  Get started
                </button>
                <a className="btn btn-ghost" href="#demo">
                  See how it works →
                </a>
              </div>
              <p className="hero-note">No new tool for your reps to learn — one document, any format, one click.</p>
            </div>
          </div>
        </section>

        <section className="workflow section" id="demo">
          <div className="container">
            <p className="section-eyebrow">How it works</p>
            <h2>From raw call to ready-to-post, in four steps.</h2>
            <ol className="steps">
              <li>
                <span className="step-num">01</span>
                <h3>Capture</h3>
                <p>Paste a transcript or upload the call recording as a PDF. No new recording tool required.</p>
              </li>
              <li>
                <span className="step-num">02</span>
                <h3>Analyze</h3>
                <p>
                  Ithica surfaces recurring keywords, pain points, and competitor mentions, and maps them to how
                  you position your product.
                </p>
              </li>
              <li>
                <span className="step-num">03</span>
                <h3>Create</h3>
                <p>Turn those insights into blog posts, LinkedIn posts, and sales call sheets, written in your product's voice.</p>
              </li>
              <li>
                <span className="step-num">04</span>
                <h3>Publish</h3>
                <p>Line every piece up on a content calendar, and switch any document between formats in one click.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="showcase section" id="feature-analysis">
          <div className="container">
            <p className="section-eyebrow">What's inside</p>
            <h2 className="showcase-title">One flow, four moves.</h2>
            <div className="showcase-frame">
              <div className="showcase-grid">
                <div className="showcase-tabs" role="tablist" aria-label="Product features">
                  {[
                    { key: 'analysis', label: 'Transcript intelligence', desc: 'Every call, decoded.' },
                    { key: 'content', label: 'Content generation', desc: 'Insight that writes the first draft.' },
                    { key: 'calendar', label: 'Content calendar', desc: 'One calendar, every channel.' },
                    { key: 'format', label: 'Format switching', desc: 'One click. Any format.' }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      className={`showcase-tab ${activeTab === tab.key ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      <span className="showcase-tab-label">{tab.label}</span>
                      <span className="showcase-tab-desc">{tab.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="showcase-panels">
                  <div className={`showcase-panel ${activeTab === 'analysis' ? 'active' : ''}`}>
                    <p className="showcase-panel-copy">
                      Ithica reads a transcript the way your best rep would — and pulls out what buyers actually said.
                    </p>
                    <div className="mock-card">
                      <div className="mock-card-head">
                        Call analysis <span className="mock-badge">summary</span>
                      </div>
                      <div className="mock-row">
                        <span className="mock-label">Keywords</span>
                        <div className="chip-row">
                          <span className="chip">pricing</span>
                          <span className="chip">integration</span>
                          <span className="chip">security review</span>
                          <span className="chip">renewal</span>
                        </div>
                      </div>
                      <div className="mock-row">
                        <span className="mock-label">Pain points</span>
                        <ul className="pain-list">
                          <li>Manual reporting eats a full day a week</li>
                          <li>No clear ROI story for finance</li>
                        </ul>
                      </div>
                      <div className="mock-row">
                        <span className="mock-label">Competitors mentioned</span>
                        <div className="chip-row">
                          <span className="chip chip-comp">Competitor A</span>
                          <span className="chip chip-comp">Competitor B</span>
                        </div>
                      </div>
                      <button className="mock-btn">Generate call sheet →</button>
                    </div>
                  </div>

                  <div className={`showcase-panel ${activeTab === 'content' ? 'active' : ''}`}>
                    <p className="showcase-panel-copy">
                      The language your buyers used on the call becomes blog and LinkedIn drafts, in your brand's voice.
                    </p>
                    <div className="mock-stack">
                      <div className="mock-post">
                        <div className="mock-post-head">
                          <span className="avatar" />
                          <div>
                            <strong>LinkedIn post</strong>
                            <span className="mock-meta">drafted from 3 calls this week</span>
                          </div>
                        </div>
                        <p>"Every renewal call this month mentioned the same thing: reporting shouldn't take a full day..."</p>
                      </div>
                      <div className="mock-post">
                        <div className="mock-post-head">
                          <div>
                            <strong>Blog draft</strong>
                            <span className="mock-meta">942 words</span>
                          </div>
                        </div>
                        <p className="blog-title">Why "manual reporting" keeps coming up on your sales calls</p>
                        <div className="skeleton-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`showcase-panel ${activeTab === 'calendar' ? 'active' : ''}`}>
                    <p className="showcase-panel-copy">Generated posts land straight on a shared calendar your whole team can see.</p>
                    <div className="mock-card">
                      <div className="mock-card-head">
                        August <span className="mock-badge">4 scheduled</span>
                      </div>
                      <div className="cal-grid" ref={calGridRef} />
                      <div className="cal-legend">
                        <span>
                          <span className="legend-dot blog" />
                          Blog
                        </span>
                        <span>
                          <span className="legend-dot li" />
                          LinkedIn
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`showcase-panel ${activeTab === 'format' ? 'active' : ''}`}>
                    <p className="showcase-panel-copy">
                      Call sheet, blog post, LinkedIn post, battlecard — same insight, no rewriting from scratch.
                    </p>
                    <div className="mock-card mock-switcher">
                      <div className="mock-card-head">
                        Onboarding pain point <span className="mock-badge">1 insight → 4 formats</span>
                      </div>
                      <div className="switch-row" role="tablist" aria-label="Document format">
                        {['blog', 'linkedin', 'onepager', 'battlecard'].map((key) => (
                          <button
                            key={key}
                            className={`switch-btn ${activeFormat === key ? 'active' : ''}`}
                            onClick={() => setActiveFormat(key)}
                          >
                            {key === 'onepager' ? 'One-pager' : key === 'linkedin' ? 'LinkedIn' : key === 'battlecard' ? 'Battlecard' : 'Blog'}
                          </button>
                        ))}
                      </div>
                      <div className="switch-output">
                        <span className="so-tag">{fc.tag}</span>
                        <div className="so-title">{fc.title}</div>
                        <p className="so-body">{fc.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="pricing section"
          id="pricing"
          style={{ borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-alt)' }}
        >
          <div className="container">
            <p className="section-eyebrow">Pricing</p>
            <h2>Start free. Stay if it's useful.</h2>
            <div className="pricing-grid">
              <div className="price-card">
                <p className="price-name">Free</p>
                <p className="price-value">$0</p>
                <p className="price-detail">5 transcripts, no credit card</p>
                <ul className="check-list">
                  <li>Paste or upload up to 5 transcripts</li>
                  <li>Keyword, pain point &amp; competitor analysis</li>
                  <li>Blog &amp; LinkedIn drafts from your insights</li>
                  <li>Full format switching on every document</li>
                </ul>
                <button type="button" className="btn btn-ghost" onClick={onStart}>
                  Get started free
                </button>
              </div>
              <div className="price-card featured">
                <p className="price-badge">Most teams land here</p>
                <p className="price-name">Starter</p>
                <p className="price-value">
                  $12<span>/mo</span>
                </p>
                <p className="price-detail">Unlimited transcripts, billed monthly</p>
                <ul className="check-list">
                  <li>Everything in Free, unlimited</li>
                  <li>Full content calendar for your team</li>
                  <li>Sales call sheets &amp; battlecards</li>
                  <li>Cancel anytime, no lock-in</li>
                </ul>
                <button type="button" className="btn btn-primary" onClick={onStart}>
                  Get started
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="container">
            <p className="section-eyebrow">FAQ</p>
            <h2>Questions, answered.</h2>
            <div className="faq-list">
              <details className="faq-item" open>
                <summary>What counts as one transcript?</summary>
                <p>One uploaded PDF or one pasted call transcript. Free accounts get 5 in total; Starter accounts get unlimited for $12/month.</p>
              </details>
              <details className="faq-item">
                <summary>What transcript formats can I use?</summary>
                <p>Paste text directly, or upload the call transcript as a PDF. No special formatting needed — Ithica handles the cleanup.</p>
              </details>
              <details className="faq-item">
                <summary>Can I cancel anytime?</summary>
                <p>Yes. Starter is billed monthly with no contract — cancel from your account whenever you'd like.</p>
              </details>
              <details className="faq-item">
                <summary>Is our call data kept private?</summary>
                <p>Transcripts are used only to generate your insights and content, and are never used to train outside models. You can delete any transcript and its outputs at any time.</p>
              </details>
              <details className="faq-item">
                <summary>Can my whole team use one account?</summary>
                <p>Yes — Starter is built as a shared workspace, so marketing and sales teammates see the same insights, drafts, and calendar.</p>
              </details>
              <details className="faq-item">
                <summary>Do I have to publish what Ithica generates as-is?</summary>
                <p>No. Every draft — blog post, LinkedIn post, call sheet, or battlecard — is a starting point you can edit, and you can switch its format anytime.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="cta-final section" id="cta">
          <div className="container">
            <h2>Stop re-listening to calls for a good quote.</h2>
            <p>Let Ithica pull the insight, draft the content, and keep the calendar honest — so your small team can act like a bigger one. Start free, no card required.</p>
            <button type="button" className="btn btn-primary" onClick={onStart}>
              Get started free
            </button>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          <div className="footer-links">
            <a href="#feature-analysis">Product</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <p className="footer-copy">© 2026 Ithica.ai</p>
        </div>
      </footer>
    </div>
  );
}
