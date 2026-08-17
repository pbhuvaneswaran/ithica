export const HOME_CSS = `
  :root{
    --bg:#0A0C12;
    --bg-alt:#0E1119;
    --surface:#12151E;
    --surface-dim:#0D0F17;
    --ink:#F3F5F9;
    --ink-soft:#A6AFC0;
    --ink-faint:#6C7486;
    --line:#232838;
    --line-soft:#1B2030;
    --accent-a:#5D6CFA;
    --accent-b:#38D6C8;
    --accent:#7C89FF;
    --accent-deep:#4453D8;
    --accent-soft:rgba(93,108,250,.14);
    --olive:#8891A5;
    --olive-soft:rgba(255,255,255,.06);
    --display: 'Space Grotesk', sans-serif;
    --body: 'Inter', sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --radius: 10px;
    --radius-sm: 6px;
    --container: 1160px;
  }

  #ithica-home *{ box-sizing:border-box; }
  #ithica-home{
    background:
      radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px);
    background-size: 22px 22px;
    background-color: var(--bg);
    color: var(--ink);
    font-family: var(--body);
    font-size:16px;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    scroll-behavior:smooth;
    min-height:100vh;
  }

  #ithica-home a{ color:inherit; }
  #ithica-home img{ max-width:100%; display:block; }
  #ithica-home ul,#ithica-home ol{ margin:0; padding:0; list-style:none; }
  #ithica-home h1,#ithica-home h2,#ithica-home h3,#ithica-home h4{ font-family:var(--display); font-weight:600; margin:0; color:var(--ink); }
  #ithica-home p{ margin:0; }

  #ithica-home a:focus-visible, #ithica-home button:focus-visible{
    outline:2px solid var(--accent-deep);
    outline-offset:3px;
    border-radius:4px;
  }

  #ithica-home .container{ max-width:var(--container); margin:0 auto; padding:0 28px; }
  #ithica-home .section{ padding:96px 0; }
  @media (max-width:768px){ #ithica-home .section{ padding:64px 0; } }

  #ithica-home .eyebrow{
    font-family:var(--mono);
    font-size:12.5px;
    letter-spacing:.04em;
    color:var(--accent-deep);
    text-transform:uppercase;
    margin:0 0 16px;
  }
  #ithica-home .section-eyebrow{
    font-family:var(--mono);
    font-size:12.5px;
    letter-spacing:.06em;
    text-transform:uppercase;
    color:var(--ink-faint);
    margin:0 0 10px;
  }

  #ithica-home .accent-text{
    background:linear-gradient(90deg,var(--accent-a),var(--accent-b));
    -webkit-background-clip:text; background-clip:text; color:transparent;
  }

  #ithica-home .btn{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:13px 24px;
    border-radius:999px;
    font-family:var(--body);
    font-weight:600;
    font-size:14.5px;
    text-decoration:none;
    border:1px solid transparent;
    cursor:pointer;
    transition:transform .15s ease, filter .15s ease, border-color .15s ease;
  }
  #ithica-home .btn:hover{ transform:translateY(-1px); }
  #ithica-home .btn-primary{ background:linear-gradient(90deg,var(--accent-a),var(--accent-b)); color:#0A0C12; }
  #ithica-home .btn-primary:hover{ filter:brightness(1.08); }
  #ithica-home .btn-ghost{ background:transparent; color:var(--ink); border-color:var(--line); }
  #ithica-home .btn-ghost:hover{ border-color:var(--ink-soft); }
  #ithica-home .btn-sm{ padding:9px 14px; font-size:13px; }

  #ithica-home .nav{
    position:sticky; top:0; z-index:50;
    background:rgba(10,12,18,.82);
    backdrop-filter:blur(10px);
    border-bottom:1px solid var(--line-soft);
  }
  #ithica-home .nav-inner{
    max-width:var(--container); margin:0 auto; padding:16px 28px;
    display:flex; align-items:center; justify-content:space-between; gap:24px;
  }
  #ithica-home .logo{
    display:inline-flex; align-items:center; gap:10px;
    font-family:var(--display); font-weight:700; font-size:19px;
    text-decoration:none; color:var(--ink); letter-spacing:-.01em;
    background:none; border:none; cursor:pointer; padding:0;
  }
  #ithica-home .logo-mark{
    height:22px; width:auto; flex-shrink:0; display:block;
  }
  #ithica-home .logo-text{ display:inline-flex; align-items:baseline; }
  #ithica-home .logo-dot{ color:var(--accent); }
  #ithica-home .nav-links{ display:flex; align-items:center; gap:28px; }
  #ithica-home .nav-links a{
    text-decoration:none; font-size:14.5px; color:var(--ink-soft); font-weight:500;
    transition:color .15s ease;
  }
  #ithica-home .nav-links a:hover{ color:var(--ink); }
  #ithica-home .nav-cta{ display:flex; align-items:center; gap:12px; }
  @media (max-width:840px){
    #ithica-home .nav-links{ display:none; }
  }

  #ithica-home .hero{ padding:88px 0 100px; position:relative; overflow:hidden; }
  #ithica-home .hero::before{
    content:"";
    position:absolute; top:-160px; left:50%; transform:translateX(-50%);
    width:900px; height:520px;
    background:radial-gradient(circle, rgba(93,108,250,.28), transparent 70%);
    filter:blur(50px);
    pointer-events:none;
  }
  #ithica-home .hero .container{ position:relative; z-index:1; }
  #ithica-home .hero-inner{
    display:flex; flex-direction:column; align-items:center; text-align:center;
  }
  #ithica-home .hero-copy{ display:flex; flex-direction:column; align-items:center; max-width:780px; margin:0 auto; }

  #ithica-home .hero-badge{
    display:inline-flex; align-items:center; gap:8px;
    font-size:13.5px; font-weight:500; color:var(--ink-soft);
    background:var(--surface); border:1px solid var(--line);
    border-radius:999px; padding:8px 16px; margin:0 0 28px;
  }

  #ithica-home .hero h1{
    font-size:clamp(34px, 4.6vw, 58px);
    line-height:1.08;
    letter-spacing:-.015em;
    margin:0 0 22px;
  }
  #ithica-home .lede{ font-size:17.5px; color:var(--ink-soft); max-width:52ch; margin:0 auto 30px; }
  #ithica-home .hero-actions{ display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-bottom:18px; }
  #ithica-home .hero-note{ font-family:var(--mono); font-size:12.5px; color:var(--ink-faint); }

  #ithica-home .panel{
    background:var(--surface);
    border:1px solid var(--line);
    border-radius:14px;
    padding:0;
    overflow:hidden;
    box-shadow:0 24px 60px -24px rgba(0,0,0,.6);
  }

  #ithica-home .workflow{ border-top:1px solid var(--line-soft); border-bottom:1px solid var(--line-soft); background:var(--bg-alt); }
  #ithica-home .workflow h2{ font-size:clamp(24px,2.6vw,32px); max-width:26ch; margin-bottom:44px; }
  #ithica-home .steps{
    display:grid; grid-template-columns:repeat(4,1fr); gap:0;
    border-top:1px solid var(--line);
  }
  #ithica-home .steps li{
    padding:26px 22px 0;
    border-left:1px solid var(--line);
    position:relative;
  }
  #ithica-home .steps li:first-child{ border-left:none; padding-left:0; }
  #ithica-home .step-num{
    display:block; font-family:var(--mono); font-size:12.5px; color:var(--accent-deep);
    margin-bottom:14px;
  }
  #ithica-home .steps h3{ font-size:17px; margin-bottom:8px; }
  #ithica-home .steps p{ font-size:14.5px; color:var(--ink-soft); }
  @media (max-width:820px){
    #ithica-home .steps{ grid-template-columns:1fr 1fr; row-gap:28px; }
    #ithica-home .steps li{ border-left:none; padding-left:0; }
  }
  @media (max-width:520px){ #ithica-home .steps{ grid-template-columns:1fr; } }

  #ithica-home .showcase-title{ font-size:clamp(24px,2.6vw,32px); max-width:26ch; margin-bottom:34px; }

  #ithica-home .showcase-frame{
    background:var(--surface); border:1px solid var(--line); border-radius:18px;
    padding:32px; box-shadow:0 24px 60px -30px rgba(0,0,0,.55);
  }
  #ithica-home .showcase-grid{ display:grid; grid-template-columns:280px 1fr; gap:8px; align-items:start; }
  @media (max-width:860px){ #ithica-home .showcase-grid{ grid-template-columns:1fr; } }

  #ithica-home .showcase-tabs{ display:flex; flex-direction:column; gap:2px; }
  @media (max-width:860px){ #ithica-home .showcase-tabs{ flex-direction:row; flex-wrap:wrap; gap:8px; margin-bottom:20px; } }
  #ithica-home .showcase-tab{
    display:flex; flex-direction:column; align-items:flex-start; gap:4px;
    text-align:left; background:transparent; border:none; border-left:2px solid var(--line);
    padding:14px 0 14px 18px; cursor:pointer; width:100%; font-family:var(--body);
    transition:border-color .15s ease, background .15s ease;
  }
  @media (max-width:860px){
    #ithica-home .showcase-tab{ border-left:none; border-bottom:2px solid var(--line); width:auto; padding:8px 4px 10px; }
  }
  #ithica-home .showcase-tab:hover{ background:rgba(255,255,255,.03); }
  #ithica-home .showcase-tab.active{ border-left-color:var(--accent-a); background:rgba(93,108,250,.07); }
  @media (max-width:860px){ #ithica-home .showcase-tab.active{ border-bottom-color:var(--accent-a); background:transparent; } }
  #ithica-home .showcase-tab-label{ font-family:var(--display); font-weight:600; font-size:15px; color:var(--ink-faint); }
  #ithica-home .showcase-tab.active .showcase-tab-label{ color:var(--ink); }
  #ithica-home .showcase-tab-desc{ font-size:12.5px; color:var(--ink-faint); }

  #ithica-home .showcase-panels{ padding:8px 8px 8px 36px; }
  @media (max-width:860px){ #ithica-home .showcase-panels{ padding:0; } }
  #ithica-home .showcase-panel{ display:none; }
  #ithica-home .showcase-panel.active{ display:block; animation:panelFade .3s ease; }
  @keyframes panelFade{ from{ opacity:0; transform:translateY(6px); } to{ opacity:1; transform:translateY(0); } }
  #ithica-home .showcase-panel-copy{ color:var(--ink-soft); font-size:15.5px; max-width:52ch; margin-bottom:22px; }

  #ithica-home .mock-card{
    background:var(--surface);
    border:1px solid var(--line);
    border-radius:var(--radius);
    padding:20px 22px 22px;
    box-shadow:0 20px 48px -26px rgba(0,0,0,.6);
  }
  #ithica-home .mock-card-head{
    display:flex; align-items:center; justify-content:space-between;
    font-family:var(--display); font-weight:600; font-size:15px;
    padding-bottom:14px; margin-bottom:16px; border-bottom:1px solid var(--line-soft);
  }
  #ithica-home .mock-badge{
    font-family:var(--mono); font-size:11px; color:var(--ink-faint);
    background:var(--bg-alt); border:1px solid var(--line); border-radius:20px; padding:4px 9px;
  }
  #ithica-home .mock-row{ margin-bottom:16px; }
  #ithica-home .mock-row:last-of-type{ margin-bottom:18px; }
  #ithica-home .mock-label{
    display:block; font-family:var(--mono); font-size:11px; text-transform:uppercase;
    letter-spacing:.05em; color:var(--ink-faint); margin-bottom:9px;
  }
  #ithica-home .chip-row{ display:flex; flex-wrap:wrap; gap:8px; }
  #ithica-home .chip{
    font-family:var(--mono); font-size:12px; padding:5px 10px; border-radius:20px;
    background:var(--accent-soft); color:#B0BBFF; border:1px solid rgba(93,108,250,.32);
  }
  #ithica-home .chip-comp{ background:rgba(56,214,200,.13); color:#8FEBDF; border-color:rgba(56,214,200,.3); }
  #ithica-home .pain-list{ display:flex; flex-direction:column; gap:8px; }
  #ithica-home .pain-list li{
    font-size:13.5px; color:var(--ink); padding-left:18px; position:relative;
  }
  #ithica-home .pain-list li::before{
    content:"\\2192"; position:absolute; left:0; top:0; font-size:11px; color:var(--accent);
  }
  #ithica-home .mock-btn{
    width:100%; text-align:left; background:var(--ink); color:var(--bg);
    border:none; border-radius:8px; padding:12px 14px; font-family:var(--body);
    font-weight:600; font-size:13.5px; cursor:pointer;
  }

  #ithica-home .mock-stack{ display:flex; flex-direction:column; gap:16px; }
  #ithica-home .mock-post{
    background:var(--surface); border:1px solid var(--line); border-radius:var(--radius);
    padding:18px 20px;
    box-shadow:0 20px 48px -26px rgba(0,0,0,.6);
  }
  #ithica-home .mock-post-head{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
  #ithica-home .avatar{ width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,var(--accent-a),var(--accent-b)); }
  #ithica-home .mock-post-head strong{ font-size:13.5px; display:block; }
  #ithica-home .mock-meta{ font-family:var(--mono); font-size:11px; color:var(--ink-faint); }
  #ithica-home .mock-post p{ font-size:13.5px; color:var(--ink-soft); line-height:1.55; }
  #ithica-home .blog-title{ font-family:var(--display); font-weight:600; font-size:15px; color:var(--ink); margin-bottom:10px; }
  #ithica-home .skeleton-lines{ display:flex; flex-direction:column; gap:7px; }
  #ithica-home .skeleton-lines span{ display:block; height:8px; border-radius:4px; background:var(--bg-alt); }
  #ithica-home .skeleton-lines span:nth-child(1){ width:100%; }
  #ithica-home .skeleton-lines span:nth-child(2){ width:92%; }
  #ithica-home .skeleton-lines span:nth-child(3){ width:65%; }

  #ithica-home .cal-grid{
    display:grid; grid-template-columns:repeat(7,1fr); gap:6px; margin-bottom:14px;
  }
  #ithica-home .cal-day{
    aspect-ratio:1; border:1px solid var(--line-soft); border-radius:6px;
    font-family:var(--mono); font-size:10.5px; color:var(--ink-faint);
    padding:5px; position:relative; background:var(--surface-dim);
  }
  #ithica-home .cal-day .cal-dot{ position:absolute; bottom:5px; left:5px; width:6px; height:6px; border-radius:50%; }
  #ithica-home .cal-day .cal-dot.blog{ background:var(--accent); }
  #ithica-home .cal-day .cal-dot.li{ background:var(--olive); }
  #ithica-home .cal-day.blank{ background:transparent; border-color:transparent; }
  #ithica-home .cal-legend{ display:flex; gap:16px; font-size:12.5px; color:var(--ink-soft); }
  #ithica-home .legend-dot{ width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:6px; }
  #ithica-home .legend-dot.blog{ background:var(--accent); }
  #ithica-home .legend-dot.li{ background:var(--olive); }

  #ithica-home .switch-row{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
  #ithica-home .switch-btn{
    font-family:var(--mono); font-size:12px; padding:8px 12px; border-radius:20px;
    background:var(--surface-dim); border:1px solid var(--line); color:var(--ink-soft);
    cursor:pointer; transition:all .15s ease;
  }
  #ithica-home .switch-btn:hover{ border-color:var(--accent-deep); color:var(--ink); }
  #ithica-home .switch-btn.active{ background:var(--ink); color:var(--bg); border-color:var(--ink); }
  #ithica-home .switch-output{
    background:var(--surface-dim); border:1px dashed var(--line); border-radius:8px;
    padding:16px 18px; min-height:118px;
  }
  #ithica-home .switch-output .so-title{ font-family:var(--display); font-weight:600; font-size:14.5px; margin-bottom:8px; }
  #ithica-home .switch-output .so-body{ font-size:13px; color:var(--ink-soft); line-height:1.6; }
  #ithica-home .switch-output .so-tag{
    display:inline-block; font-family:var(--mono); font-size:10.5px; color:var(--accent-deep);
    background:var(--accent-soft); border-radius:20px; padding:3px 8px; margin-bottom:10px;
  }

  #ithica-home .pricing h2, #ithica-home .faq h2{ font-size:clamp(24px,2.6vw,32px); max-width:26ch; margin-bottom:34px; }
  #ithica-home .pricing-grid{ display:grid; grid-template-columns:1fr 1fr; gap:24px; max-width:760px; }
  @media (max-width:700px){ #ithica-home .pricing-grid{ grid-template-columns:1fr; } }
  #ithica-home .price-card{
    background:var(--surface); border:1px solid var(--line); border-radius:var(--radius);
    padding:30px 26px 26px; position:relative;
  }
  #ithica-home .price-card.featured{
    border-color:var(--accent-deep);
    box-shadow:0 24px 55px -26px rgba(93,108,250,.4);
  }
  #ithica-home .price-badge{
    position:absolute; top:-13px; left:26px;
    background:linear-gradient(90deg,var(--accent-a),var(--accent-b)); color:#0A0C12;
    font-family:var(--mono); font-size:11px; padding:5px 10px; border-radius:20px;
  }
  #ithica-home .price-name{
    font-family:var(--mono); font-size:12.5px; text-transform:uppercase; letter-spacing:.05em;
    color:var(--ink-faint); margin-bottom:12px;
  }
  #ithica-home .price-value{ font-family:var(--display); font-size:40px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  #ithica-home .price-value span{ font-size:15px; font-weight:500; color:var(--ink-faint); }
  #ithica-home .price-detail{ font-size:13.5px; color:var(--ink-soft); margin-bottom:24px; }
  #ithica-home .check-list{ display:flex; flex-direction:column; gap:10px; margin-bottom:26px; }
  #ithica-home .check-list li{ font-size:14px; color:var(--ink); display:flex; gap:9px; align-items:baseline; }
  #ithica-home .check-list li::before{ content:"\\2713"; color:var(--accent-deep); font-family:var(--mono); font-size:12px; }
  #ithica-home .price-card .btn{ width:100%; justify-content:center; }

  #ithica-home .faq-list{ max-width:760px; border-top:1px solid var(--line); }
  #ithica-home .faq-item{ border-bottom:1px solid var(--line); padding:18px 0; }
  #ithica-home .faq-item summary{
    cursor:pointer; list-style:none; font-family:var(--display); font-weight:600; font-size:15.5px;
    display:flex; justify-content:space-between; align-items:center; gap:12px;
  }
  #ithica-home .faq-item summary::-webkit-details-marker{ display:none; }
  #ithica-home .faq-item summary::after{
    content:"+"; font-family:var(--mono); font-size:18px; color:var(--accent-deep); flex-shrink:0;
  }
  #ithica-home .faq-item[open] summary::after{ content:"\\2212"; }
  #ithica-home .faq-item p{ font-size:14.5px; color:var(--ink-soft); margin-top:12px; max-width:60ch; line-height:1.6; }

  #ithica-home .cta-final{
    text-align:center;
    background:linear-gradient(135deg,var(--accent-a),var(--accent-b));
  }
  #ithica-home .cta-final h2{ color:#0A0C12; font-size:clamp(26px,3vw,36px); max-width:22ch; margin:0 auto 14px; }
  #ithica-home .cta-final p{ color:rgba(10,12,18,.72); max-width:46ch; margin:0 auto 30px; font-size:15.5px; }
  #ithica-home .cta-final .btn-primary{ background:#0A0C12; color:#F3F5F9; }
  #ithica-home .cta-final .btn-primary:hover{ background:#171B26; filter:none; }

  #ithica-home footer{ padding:44px 0 40px; }
  #ithica-home .footer-inner{ display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:18px; }
  #ithica-home .footer-links{ display:flex; gap:22px; }
  #ithica-home .footer-links a{ text-decoration:none; font-size:13.5px; color:var(--ink-soft); }
  #ithica-home .footer-copy{ font-family:var(--mono); font-size:12px; color:var(--ink-faint); }
`;

export const LOGO_DATA_URI =
  'data:image/png;base64,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';
