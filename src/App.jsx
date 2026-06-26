import React, { useEffect } from 'react'
import BentoGrid from './components/BentoGrid'
import Pricing from './components/Pricing'


function App() {
  const renderBouncyTitle = (text, startIdx) => {
    return text.split("").map((char, charIdx) => {
      const idx = startIdx + charIdx;
      return (
        <span 
          key={charIdx} 
          className="pop-char" 
          style={{ '--char-idx': idx }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  useEffect(() => {
    // 1. Entry Loader Coordination
    const loaderTimeout = setTimeout(() => {
      document.body.classList.add('loaded');
      const loader = document.getElementById('entry-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 300);
      }
    }, 450);

    // 2. Scroll-Driven Reveal (IntersectionObserver)
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          if (entry.target.id === 'features') {
            const cards = entry.target.querySelectorAll('.bento-card');
            cards.forEach((card, idx) => {
              card.style.transitionDelay = `${idx * 100}ms`;
            });
          }
          if (entry.target.id === 'pricing') {
            const pricingCards = entry.target.querySelectorAll('.pricing-card');
            pricingCards.forEach((card, idx) => {
              card.style.transitionDelay = `${idx * 100}ms`;
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    // 3. Interactive Mouse-Move Parallax for Blobs
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPct = (clientX / window.innerWidth - 0.5) * 35;
      const yPct = (clientY / window.innerHeight - 0.5) * 35;
      
      document.documentElement.style.setProperty('--mouse-offset-x', `${xPct}px`);
      document.documentElement.style.setProperty('--mouse-offset-y', `${yPct}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Scroll Parallax tracking
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate parallax scroll values for floating chips
      document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize on load

    return () => {
      clearTimeout(loaderTimeout);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Performance-Isolated CSS Loader (Completes within 500ms orchestration window) */}
      <div className="loader-overlay" id="entry-loader" role="presentation">
        <div className="loader-spinner" aria-label="Loading Cortexa Platform..."></div>
      </div>

      {/* Sticky Navigation Header */}
      <header className="sticky-header" id="site-header">
        <div className="container" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="animate-on-load">
            <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '24px', height: '24px' }} />
            <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '-0.04em' }}>CORTEXA</span>
          </div>
          <nav aria-label="Primary Navigation" className="animate-on-load animate-delay-1">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', fontFamily: 'var(--font-headers)', fontSize: '0.85rem' }}>
              <li>
                <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#tech-specs" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>
                  Specs
                </a>
              </li>
            </ul>
          </nav>
          <div className="animate-on-load animate-delay-2">
            <a href="#pricing" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              Deploy Core
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main id="main-content">
        
        {/* Hero Section */}
        <section id="hero" aria-labelledby="hero-title" className="hero-section">
          {/* Animated radial gradient mesh */}
          <div className="hero-gradient-mesh" aria-hidden="true"></div>

          {/* Ambient Parallax Blobs */}
          <div className="blob-container blob-1-container">
            <div className="float-blob blob-1"></div>
          </div>
          <div className="blob-container blob-2-container">
            <div className="float-blob blob-2"></div>
          </div>
          <div className="blob-container blob-3-container">
            <div className="float-blob blob-3"></div>
          </div>

          {/* Parallax Floating Tech Chips */}
          <div className="floating-chip chip-1 select-none" style={{ top: '12%', left: '6%' }}>
            <code>{`{"stream": true}`}</code>
          </div>
          <div className="floating-chip chip-2 select-none" style={{ top: '38%', right: '5%' }}>
            <code>{`0x7F_SYNC_OK`}</code>
          </div>
          <div className="floating-chip chip-3 select-none" style={{ top: '72%', left: '10%' }}>
            <code>{`db.commit()`}</code>
          </div>
          <div className="floating-chip chip-4 select-none" style={{ top: '22%', right: '14%' }}>
            <code>{`latency: 0.08ms`}</code>
          </div>
          <div className="floating-chip chip-5 select-none" style={{ top: '58%', right: '12%' }}>
            <code>{`nodes: 4/4 ✓`}</code>
          </div>

          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="animate-on-load">
              {/* Promo Badge */}
              <div className="promo-badge">
                <div className="promo-badge-dot"></div>
                <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '12px', height: '12px' }} />
                <span>Cortexa v1.0.0 — Now in Public Beta</span>
              </div>
              
              {/* Heading */}
              <h1 id="hero-title" className="hero-title">
                {renderBouncyTitle("Automate Your Data Pipelines with ", 0)}
                <span className="gradient-text">
                  {renderBouncyTitle("AI-Precision", 35)}
                </span>
              </h1>
              
              {/* Description */}
              <p className="hero-description animate-on-load animate-delay-1">
                Deploy intelligent data pipelines that refine, route, and synchronize across multi-currency databases — with zero-dependency state isolation and sub-millisecond execution.
              </p>
              
              {/* Call to Actions */}
              <div className="hero-cta-row animate-on-load animate-delay-2">
                <a href="#pricing" className="btn-primary btn-hero">
                  <span>Deploy Your Core</span>
                  <img src="/svgs/chevron-right.svg" alt="" style={{ width: '14px', height: '14px' }} />
                </a>
                <a href="#features" className="btn-secondary btn-hero">
                  <span>Explore Features</span>
                  <img src="/svgs/cog-8-tooth.svg" alt="" style={{ width: '14px', height: '14px' }} />
                </a>
              </div>

              {/* Live Metrics Strip */}
              <div className="hero-metrics-strip animate-on-load animate-delay-3">
                <div className="hero-metric">
                  <span className="hero-metric-value">12ms</span>
                  <span className="hero-metric-label">Global Latency</span>
                </div>
                <div className="hero-metric-divider"></div>
                <div className="hero-metric">
                  <span className="hero-metric-value">48,102</span>
                  <span className="hero-metric-label">Values / Cycle</span>
                </div>
                <div className="hero-metric-divider"></div>
                <div className="hero-metric">
                  <span className="hero-metric-value">0</span>
                  <span className="hero-metric-label">Re-renders</span>
                </div>
                <div className="hero-metric-divider"></div>
                <div className="hero-metric">
                  <span className="hero-metric-value">99.9%</span>
                  <span className="hero-metric-label">Uptime SLA</span>
                </div>
              </div>
            </div>

            {/* Scroll-Assembled Dashboard Stack */}
            <div className="dashboard-assembly-wrapper animate-on-load animate-delay-3" aria-label="Cortexa pipeline console preview">
              
              {/* Browser Window Chrome */}
              <div className="assembly-browser-chrome">
                <div className="chrome-dots-row">
                  <span className="chrome-dot chrome-dot-close"></span>
                  <span className="chrome-dot chrome-dot-minimize"></span>
                  <span className="chrome-dot chrome-dot-expand"></span>
                </div>
                <div className="chrome-url-bar">
                  <span className="chrome-lock">🔒</span>
                  <span>cortexa.io/pipeline/dashboard</span>
                </div>
                <div className="chrome-actions">
                  <span className="chrome-action-dot"></span>
                  <span className="chrome-action-dot"></span>
                  <span className="chrome-action-dot"></span>
                </div>
              </div>

              {/* Assembly Viewport */}
              <div className="assembly-viewport">

                {/* Layer 1: Top Ingestion Card */}
                <div className="assembly-layer layer-top">
                  <div className="assembly-header">
                    <div className="assembly-dots">
                      <div className="pulsing-dot"></div>
                      <span className="assembly-title">[INGESTION NODE]</span>
                    </div>
                    <div className="assembly-badge badge-active">● LIVE</div>
                  </div>
                  <div className="assembly-body">
                    <div className="assembly-body-row">
                      <div className="assembly-body-left">
                        <span className="cmd-symbol">&gt;</span> Source: <span className="assembly-mono-bold">db_source_asia/users</span>
                        <div className="assembly-sub-detail">Region: <span className="assembly-highlight">ap-south-1</span> &nbsp;|&nbsp; Schema: v4.2</div>
                      </div>
                      <div className="assembly-mini-stat">
                        <span className="mini-stat-value">12.8</span>
                        <span className="mini-stat-unit">RUN/S</span>
                      </div>
                    </div>
                    <div className="buffered-stream-container">
                      <div className="buffered-stream-bar"></div>
                    </div>
                    <div className="assembly-throughput-row">
                      <div className="throughput-bar-group">
                        <div className="throughput-bar" style={{ height: '60%' }}></div>
                        <div className="throughput-bar" style={{ height: '80%' }}></div>
                        <div className="throughput-bar" style={{ height: '45%' }}></div>
                        <div className="throughput-bar" style={{ height: '90%' }}></div>
                        <div className="throughput-bar" style={{ height: '70%' }}></div>
                        <div className="throughput-bar throughput-bar-current" style={{ height: '95%' }}></div>
                      </div>
                      <span className="throughput-label">Throughput 6.2K/s ↑</span>
                    </div>
                  </div>
                </div>

                {/* Connector Line 1 */}
                <div className="assembly-connector">
                  <div className="connector-line"></div>
                  <div className="connector-pulse"></div>
                </div>

                {/* Layer 2: Middle Refining Node */}
                <div className="assembly-layer layer-middle">
                  <div className="assembly-header">
                    <div className="assembly-dots">
                      <span className="dot dot-yellow"></span>
                      <span className="assembly-title">[PROCESSING CORE]</span>
                    </div>
                    <div className="assembly-badge badge-process">AI REFINE</div>
                  </div>
                  <div className="assembly-body">
                    <div className="assembly-body-row">
                      <div className="assembly-body-left">
                        <span className="cmd-symbol">&gt;</span> Parsed <span className="assembly-mono-bold">48,102</span> values <span className="assembly-highlight">[0.08ms]</span>
                      </div>
                      <div className="assembly-mini-stat mini-stat-warn">
                        <span className="mini-stat-value">0.08</span>
                        <span className="mini-stat-unit">MS</span>
                      </div>
                    </div>
                    <div className="pipeline-visual">
                      <span className="visual-label">RAW</span>
                      <div className="visual-line"><div className="data-packet"></div></div>
                      <span className="visual-label accent-glow">AI PROCESS</span>
                      <div className="visual-line"><div className="data-packet"></div></div>
                      <span className="visual-label">REFINED</span>
                    </div>
                    <div className="assembly-tag-row">
                      <span className="assembly-tag">Dedup</span>
                      <span className="assembly-tag">NullFill</span>
                      <span className="assembly-tag tag-accent">ML-Classify</span>
                      <span className="assembly-tag">TypeCast</span>
                    </div>
                  </div>
                </div>

                {/* Connector Line 2 */}
                <div className="assembly-connector">
                  <div className="connector-line"></div>
                  <div className="connector-pulse connector-pulse-delay"></div>
                </div>

                {/* Layer 3: Bottom Target Node */}
                <div className="assembly-layer layer-bottom">
                  <div className="assembly-header">
                    <div className="assembly-dots">
                      <span className="dot dot-green"></span>
                      <span className="assembly-title">[DESTINATION SINK]</span>
                    </div>
                    <div className="assembly-badge badge-sync">✓ SYNCED</div>
                  </div>
                  <div className="assembly-body">
                    <div className="assembly-body-row">
                      <div className="assembly-body-left">
                        <span className="cmd-symbol">&gt;</span> Target: <span className="assembly-mono-bold">sync-node-04</span>
                      </div>
                      <div className="assembly-mini-stat mini-stat-success">
                        <span className="mini-stat-value">OK</span>
                        <span className="mini-stat-unit">200</span>
                      </div>
                    </div>
                    <div className="sync-status-grid">
                      <div className="sync-status-item">✔ Latency 12ms</div>
                      <div className="sync-status-item">✔ Lock Active</div>
                      <div className="sync-status-item">✔ Replication 3/3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assembly Footer Status Bar */}
              <div className="assembly-footer">
                <div className="footer-status-group">
                  <span className="footer-status-dot footer-dot-green"></span>
                  <span>Pipeline Healthy</span>
                </div>
                <span className="footer-separator">|</span>
                <span>3 Nodes Active</span>
                <span className="footer-separator">|</span>
                <span>Last sync: 0.4s ago</span>
              </div>

            </div>
          </div>
        </section>

        {/* Social Proof Brand Bar */}
        <section className="social-proof-section reveal-on-scroll" aria-label="Customer proof">
          <div className="container">
            <h2 className="social-proof-title">Trusted by Modern Data Engineering Teams</h2>
            <div className="brand-logos-container">
              <div className="brand-logo-item" title="SyncLoop Integrations">
                <img src="/svgs/arrow-path.svg" alt="" className="brand-logo-icon" />
                <span className="brand-logo-text">SYNCLOOP</span>
              </div>
              <div className="brand-logo-item" title="Cognitive Automation">
                <img src="/svgs/cog-8-tooth.svg" alt="" className="brand-logo-icon" />
                <span className="brand-logo-text">COGNITIVE.IO</span>
              </div>
              <div className="brand-logo-item" title="QuantData Diagnostics">
                <img src="/svgs/chart-pie.svg" alt="" className="brand-logo-icon" />
                <span className="brand-logo-text">QUANTDATA</span>
              </div>
              <div className="brand-logo-item" title="HyperCube Cloud">
                <img src="/svgs/cube-16-solid.svg" alt="" className="brand-logo-icon" />
                <span className="brand-logo-text">HYPERCUBE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Horizontal Marquee Ticker */}
        <div className="ticker-container" aria-hidden="true">
          <div className="ticker-track">
            <div className="ticker-list">
              <span><span className="ticker-accent">⚡</span>AI DATA PIPELINES CORE</span>
              <span><span className="ticker-accent">⚡</span>ZERO RE-RENDERS COMPUTE</span>
              <span><span className="ticker-accent">⚡</span>SUB-MILLISECOND LATENCY</span>
              <span><span className="ticker-accent">⚡</span>SECURE SYNC LOCK ACTIVE</span>
              <span><span className="ticker-accent">⚡</span>MULTI-CURRENCY CONVERSION</span>
            </div>
            <div className="ticker-list">
              <span><span className="ticker-accent">⚡</span>AI DATA PIPELINES CORE</span>
              <span><span className="ticker-accent">⚡</span>ZERO RE-RENDERS COMPUTE</span>
              <span><span className="ticker-accent">⚡</span>SUB-MILLISECOND LATENCY</span>
              <span><span className="ticker-accent">⚡</span>SECURE SYNC LOCK ACTIVE</span>
              <span><span className="ticker-accent">⚡</span>MULTI-CURRENCY CONVERSION</span>
            </div>
          </div>
        </div>

        {/* Bento Features Section */}
        <section id="features" aria-labelledby="features-title" className="reveal-on-scroll" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 id="features-title" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Engineered for Performance</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto' }}>
                Explore four distinct core engine features showing our multi-cluster sync capability and autonomous data refining pipeline.
              </p>
            </div>
            <BentoGrid />
          </div>
        </section>

        {/* Pricing Switcher Section */}
        <section id="pricing" aria-labelledby="pricing-title" className="reveal-on-scroll" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 id="pricing-title" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Flexible Developer Pricing</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto' }}>
                Toggle currencies and cycles. Watch values compute instantly without triggering unnecessary global component re-renders.
              </p>
            </div>
            <Pricing />
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section id="tech-specs" aria-labelledby="specs-title" className="reveal-on-scroll" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 id="specs-title" style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Technical Specifications</h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto' }}>
                Low-level engine details designed to ensure sub-millisecond execution times and high throughput pipelines.
              </p>
            </div>
            
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/svgs/cog-8-tooth.svg" alt="" style={{ width: '16px', height: '16px', color: 'var(--accent-primary)' }} />
                  <h3 style={{ fontSize: '1.1rem' }}>Compute Latency</h3>
                </div>
                <p style={{ fontSize: '0.85rem' }}>Pipeline intake processes raw data frames in less than 1.2ms using parallel buffer loops.</p>
              </div>
              
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '16px', height: '16px', color: 'var(--accent-primary)' }} />
                  <h3 style={{ fontSize: '1.1rem' }}>Zero State Bloat</h3>
                </div>
                <p style={{ fontSize: '0.85rem' }}>Localized price updating prevents React virtual DOM comparisons, keeping layout updates under 0.05ms.</p>
              </div>

              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '16px', height: '16px', color: 'var(--accent-primary)' }} />
                  <h3 style={{ fontSize: '1.1rem' }}>Container Sync</h3>
                </div>
                <p style={{ fontSize: '0.85rem' }}>Cluster-to-cluster encryption nodes synchronize automatically via secure web socket guarantees.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer id="site-footer" className="reveal-on-scroll" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '4rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2.5rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '22px', height: '22px' }} />
                <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '-0.04em' }}>CORTEXA</span>
              </div>
              <p style={{ maxWidth: '300px', fontSize: '0.85rem' }}>
                Advanced AI-driven automation for database streams and multi-currency transactions.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '4rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Product</span>
                <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Features</a>
                <a href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</a>
                <a href="#tech-specs" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Specs</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Resource</span>
                <a href="https://github.com/tarunahuja19/CORTEXA" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>GitHub Repo</a>
                <span style={{ color: 'var(--text-secondary)', cursor: 'default' }}>Documentation</span>
                <span style={{ color: 'var(--text-secondary)', cursor: 'default' }}>Status Logs</span>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(217, 232, 226, 0.06)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.8 }}>
              CORTEXA &copy; {new Date().getFullYear()}. All Rights Reserved.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} aria-hidden="true"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
