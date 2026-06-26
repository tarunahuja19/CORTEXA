import React, { useEffect } from 'react'
import BentoGrid from './components/BentoGrid'
import Pricing from './components/Pricing'


function App() {
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

    // 4. Scroll Assembly and Parallax tracking
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate assembly percentage: 0 at scrollY=0, 1 at scrollY=450 (clamped)
      const assemblyThreshold = 450;
      const assemblyPct = Math.min(scrollY / assemblyThreshold, 1);
      document.documentElement.style.setProperty('--assembly-pct', assemblyPct.toString());
      
      // Calculate parallax scroll values
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
        <section id="hero" aria-labelledby="hero-title" style={{ padding: '6rem 0 4rem 0', position: 'relative', isolation: 'isolate', overflow: 'hidden' }}>
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
          <div className="floating-chip chip-1 select-none" style={{ top: '15%', left: '8%' }}>
            <code>{`{"stream": "active"}`}</code>
          </div>
          <div className="floating-chip chip-2 select-none" style={{ top: '42%', right: '8%' }}>
            <code>{`01101011_sync`}</code>
          </div>
          <div className="floating-chip chip-3 select-none" style={{ top: '65%', left: '12%' }}>
            <code>{`db.commit()`}</code>
          </div>

          <div className="container" style={{ textAlign: 'center' }}>
            <div className="animate-on-load">
              {/* Promo Badge */}
              <div className="promo-badge">
                <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '12px', height: '12px' }} />
                <span>Cortexa v1.0.0 Now in Public Beta</span>
              </div>
              
              {/* Heading */}
              <h1 id="hero-title" style={{ fontSize: '3.5rem', lineHeight: '1.1', maxWidth: '850px', margin: '0 auto 1.5rem', fontWeight: 800 }}>
                {["Automate", "Your", "Data", "Pipelines", "with"].map((word, idx) => (
                  <span key={idx} className="pop-word" style={{ '--word-idx': idx }}>
                    {word}{" "}
                  </span>
                ))}
                <span className="pop-word gradient-text" style={{ '--word-idx': 5 }}>
                  AI-Precision
                </span>
              </h1>
              
              {/* Description */}
              <p style={{ maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Scale database operations, configure multi-currency transformations, and orchestrate pipeline clusters through a fluid, zero-dependency Bento UI.
              </p>
              
              {/* Call to Actions */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#pricing" className="btn-primary">
                  <span>Get Started</span>
                  <img src="/svgs/chevron-right.svg" alt="" style={{ width: '12px', height: '12px' }} />
                </a>
                <a href="#features" className="btn-secondary">
                  <span>Explore Features</span>
                  <img src="/svgs/cog-8-tooth.svg" alt="" style={{ width: '14px', height: '14px' }} />
                </a>
              </div>
            </div>

            {/* Scroll-Assembled Dashboard Stack */}
            <div className="dashboard-assembly-wrapper animate-on-load animate-delay-2" aria-label="Cortexa pipeline console preview">
              
              {/* Layer 1: Top Ingestion Card */}
              <div className="assembly-layer layer-top glass-panel">
                <div className="assembly-header">
                  <div className="assembly-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="assembly-title">[INGESTION NODE]</span>
                  <div className="assembly-badge badge-active">RUNNING</div>
                </div>
                <div className="assembly-body">
                  <span className="cmd-symbol">&gt;</span> fetch: db_source_asia/users ... <span className="status-success">OK</span>
                  <br />
                  <span className="cmd-symbol">&gt;</span> queue: raw buffer ingest active [12.8 run/s]
                </div>
              </div>

              {/* Layer 2: Middle Refining Node */}
              <div className="assembly-layer layer-middle glass-panel">
                <div className="assembly-header">
                  <div className="assembly-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="assembly-title">[PROCESSING CORE]</span>
                  <div className="assembly-badge badge-process">REFINE</div>
                </div>
                <div className="assembly-body">
                  <span className="cmd-symbol">&gt;</span> refine: parsed 48,102 variables [0.08ms]
                  <br />
                  <span className="cmd-symbol">&gt;</span> tariff: computed EUR/INR/USD exchange matrix
                </div>
              </div>

              {/* Layer 3: Bottom Target Node */}
              <div className="assembly-layer layer-bottom glass-panel">
                <div className="assembly-header">
                  <div className="assembly-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="assembly-title">[DESTINATION SINK]</span>
                  <div className="assembly-badge badge-sync">SYNCED</div>
                </div>
                <div className="assembly-body">
                  <span className="cmd-symbol">&gt;</span> route: routing payload to sync-node-04
                  <br />
                  <span className="cmd-symbol">&gt;</span> status: synchronization lock persisted
                </div>
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
              <span>⚡ AI DATA PIPELINES CORE</span>
              <span>⚡ ZERO RE-RENDERS COMPUTE</span>
              <span>⚡ SUB-MILLISECOND LATENCY</span>
              <span>⚡ SECURE SYNC LOCK ACTIVE</span>
              <span>⚡ MULTI-CURRENCY CONVERSION</span>
            </div>
            <div className="ticker-list">
              <span>⚡ AI DATA PIPELINES CORE</span>
              <span>⚡ ZERO RE-RENDERS COMPUTE</span>
              <span>⚡ SUB-MILLISECOND LATENCY</span>
              <span>⚡ SECURE SYNC LOCK ACTIVE</span>
              <span>⚡ MULTI-CURRENCY CONVERSION</span>
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
