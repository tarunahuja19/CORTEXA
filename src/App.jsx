import React, { useState, useEffect } from 'react'
import BentoGrid from './components/BentoGrid'
import Pricing from './components/Pricing'


function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        <div className="container nav-container">
          <div className="nav-logo animate-on-load">
            <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '24px', height: '24px' }} />
            <span>CORTEXA</span>
          </div>
          
          {/* Desktop Nav */}
          <nav aria-label="Primary Navigation" className="desktop-nav animate-on-load animate-delay-1">
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#tech-specs">Specs</a></li>
            </ul>
          </nav>
          
          {/* Desktop CTA */}
          <div className="desktop-cta animate-on-load animate-delay-2">
            <a href="#pricing" className="btn-primary">
              Deploy Core
            </a>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav aria-label="Mobile Navigation">
            <ul>
              <li><a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
              <li><a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a></li>
              <li><a href="#tech-specs" onClick={() => setIsMobileMenuOpen(false)}>Specs</a></li>
              <li className="mobile-cta-li">
                <a href="#pricing" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Deploy Core
                </a>
              </li>
            </ul>
          </nav>
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

          {/* Parallax Floating Tech Chips — Premium Mini-Cards */}
          <div className="floating-chip chip-1 select-none" style={{ top: '12%', left: '6%' }}>
            <span className="chip-status-dot chip-dot-green"></span>
            <code>{`{"stream": true}`}</code>
          </div>
          <div className="floating-chip chip-2 select-none" style={{ top: '38%', right: '5%' }}>
            <span className="chip-icon-mini">⟡</span>
            <code>{`latency: 0.08ms`}</code>
          </div>
          <div className="floating-chip chip-3 select-none" style={{ top: '72%', left: '10%' }}>
            <span className="chip-status-dot chip-dot-amber"></span>
            <code>{`db.commit()`}</code>
          </div>
          <div className="floating-chip chip-4 select-none" style={{ top: '22%', right: '14%' }}>
            <span className="chip-icon-mini">↗</span>
            <code>{`throughput: 6.2K/s`}</code>
          </div>
          <div className="floating-chip chip-5 select-none" style={{ top: '58%', right: '12%' }}>
            <span className="chip-status-dot chip-dot-green"></span>
            <code>{`0x7F_SYNC_OK`}</code>
          </div>
          <div className="floating-chip chip-6 select-none" style={{ bottom: '10%', left: '4%' }}>
            <span className="chip-icon-mini">◈</span>
            <code>{`nodes: 4/4`}</code>
            <span className="chip-check-mark">✓</span>
          </div>

          <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div className="animate-on-load">
              {/* Heading */}
              <h1 id="hero-title" className="hero-title">
                {renderBouncyTitle("Automate Your Data ", 0)}
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {renderBouncyTitle("Pipelines", 19)}
                </span>
                {renderBouncyTitle(" with ", 28)}
                <span className="gradient-text" style={{ whiteSpace: 'nowrap' }}>
                  {renderBouncyTitle("AI-Precision", 34)}
                </span>
              </h1>
              
              {/* Description */}
              <p className="hero-description animate-on-load animate-delay-1">
                Deploy intelligent data pipelines that refine, route, and synchronize across multi-currency databases with zero-dependency state isolation and sub-millisecond execution.
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

        {/* Infinite Horizontal Marquee Ticker — Premium Double Row */}
        <div className="ticker-section" aria-hidden="true">
          {/* Edge Fade Overlays */}
          <div className="ticker-fade ticker-fade-left"></div>
          <div className="ticker-fade ticker-fade-right"></div>

          {/* Row 1 — Scrolls Left */}
          <div className="ticker-row">
            <div className="ticker-track">
              <div className="ticker-list">
                <span><span className="ticker-dot"></span>AI DATA PIPELINES CORE</span>
                <span><span className="ticker-dot"></span>ZERO RE-RENDERS COMPUTE</span>
                <span><span className="ticker-dot"></span>SUB-MILLISECOND LATENCY</span>
                <span><span className="ticker-dot"></span>SECURE SYNC LOCK ACTIVE</span>
                <span><span className="ticker-dot"></span>MULTI-CURRENCY ENGINE</span>
                <span><span className="ticker-dot"></span>BENTO STATE ISOLATION</span>
                <span><span className="ticker-dot"></span>HARDWARE-ACCELERATED CSS</span>
              </div>
              <div className="ticker-list">
                <span><span className="ticker-dot"></span>AI DATA PIPELINES CORE</span>
                <span><span className="ticker-dot"></span>ZERO RE-RENDERS COMPUTE</span>
                <span><span className="ticker-dot"></span>SUB-MILLISECOND LATENCY</span>
                <span><span className="ticker-dot"></span>SECURE SYNC LOCK ACTIVE</span>
                <span><span className="ticker-dot"></span>MULTI-CURRENCY ENGINE</span>
                <span><span className="ticker-dot"></span>BENTO STATE ISOLATION</span>
                <span><span className="ticker-dot"></span>HARDWARE-ACCELERATED CSS</span>
              </div>
            </div>
          </div>

          {/* Row 2 — Scrolls Right (reversed) */}
          <div className="ticker-row">
            <div className="ticker-track ticker-track-reverse">
              <div className="ticker-list">
                <span><span className="ticker-dot ticker-dot-accent"></span>AUTONOMOUS REFINE</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>PREDICTIVE VELOCITY</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>CLUSTER INTEGRATIONS</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>PIPELINE TELEMETRY</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>SCHEMA VALIDATION</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>EDGE NODE ROUTING</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>REAL-TIME INSIGHTS</span>
              </div>
              <div className="ticker-list">
                <span><span className="ticker-dot ticker-dot-accent"></span>AUTONOMOUS REFINE</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>PREDICTIVE VELOCITY</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>CLUSTER INTEGRATIONS</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>PIPELINE TELEMETRY</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>SCHEMA VALIDATION</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>EDGE NODE ROUTING</span>
                <span><span className="ticker-dot ticker-dot-accent"></span>REAL-TIME INSIGHTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Features Section */}
        <section id="features" aria-labelledby="features-title" className="features-section reveal-on-scroll">
          <div className="container">
            <div className="features-header">
              <h2 id="features-title" className="features-title">Engineered for Performance</h2>
              <p className="features-subtitle">
                Four distinct modules powering autonomous data refinement, predictive routing, multi-cluster sync, and real-time pipeline telemetry — all running in zero-dependency isolation.
              </p>
              <div className="features-accent-line" aria-hidden="true"></div>
            </div>
            <BentoGrid />
          </div>
        </section>

        {/* Pricing Switcher Section */}
        <section id="pricing" aria-labelledby="pricing-title" className="pricing-section reveal-on-scroll">
          <div className="container">
            <div className="pricing-section-header">
              <h2 id="pricing-title" className="pricing-section-title">Flexible Developer Pricing</h2>
              <p className="pricing-section-subtitle">
                Toggle currencies and billing cycles prices compute instantly via a multi-dimensional matrix engine with zero parent re-renders.
              </p>
              <div className="features-accent-line" aria-hidden="true"></div>
            </div>
            <Pricing />
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section id="tech-specs" aria-labelledby="specs-title" className="specs-section reveal-on-scroll">
          <div className="container">
            <div className="specs-header">
              <h2 id="specs-title" className="specs-title">Technical Specifications</h2>
              <p className="specs-subtitle">
                Low-level engine details engineered for sub-millisecond execution, zero state bloat, and cryptographically-verified cluster synchronization.
              </p>
              <div className="features-accent-line" aria-hidden="true"></div>
            </div>
            
            <div className="specs-grid">
              {/* Spec Card 1 */}
              <div className="spec-card">
                <div className="spec-card-icon-row">
                  <div className="spec-icon-circle">
                    <img src="/svgs/cog-8-tooth.svg" alt="" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <span className="spec-number">01</span>
                </div>
                <h3 className="spec-card-title">Compute Latency</h3>
                <p className="spec-card-desc">Pipeline intake processes raw data frames in less than 1.2ms using parallel buffer loops and hardware-level optimizations.</p>
                <div className="spec-metric-row">
                  <span className="spec-metric-value">&lt;1.2ms</span>
                  <span className="spec-metric-label">Avg Frame Processing</span>
                </div>
                <div className="spec-bar-container">
                  <div className="spec-bar-fill" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Spec Card 2 */}
              <div className="spec-card">
                <div className="spec-card-icon-row">
                  <div className="spec-icon-circle spec-icon-accent">
                    <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <span className="spec-number">02</span>
                </div>
                <h3 className="spec-card-title">Zero State Bloat</h3>
                <p className="spec-card-desc">Localized price updating prevents React virtual DOM comparisons, keeping layout updates strictly under 0.05ms threshold.</p>
                <div className="spec-metric-row">
                  <span className="spec-metric-value">0.05ms</span>
                  <span className="spec-metric-label">DOM Update Ceiling</span>
                </div>
                <div className="spec-bar-container">
                  <div className="spec-bar-fill spec-bar-accent" style={{ width: '98%' }}></div>
                </div>
              </div>

              {/* Spec Card 3 */}
              <div className="spec-card">
                <div className="spec-card-icon-row">
                  <div className="spec-icon-circle">
                    <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <span className="spec-number">03</span>
                </div>
                <h3 className="spec-card-title">Container Sync</h3>
                <p className="spec-card-desc">Cluster-to-cluster encryption nodes synchronize automatically via secure WebSocket guarantees with failover routing.</p>
                <div className="spec-metric-row">
                  <span className="spec-metric-value">256-bit</span>
                  <span className="spec-metric-label">AES Encryption Standard</span>
                </div>
                <div className="spec-bar-container">
                  <div className="spec-bar-fill" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Spec Card 4 */}
              <div className="spec-card">
                <div className="spec-card-icon-row">
                  <div className="spec-icon-circle spec-icon-accent">
                    <img src="/svgs/chart-pie.svg" alt="" style={{ width: '18px', height: '18px' }} />
                  </div>
                  <span className="spec-number">04</span>
                </div>
                <h3 className="spec-card-title">Animation Budget</h3>
                <p className="spec-card-desc">All motion sequences are hardware-accelerated native CSS with total orchestration timeline under the strict 500ms cap.</p>
                <div className="spec-metric-row">
                  <span className="spec-metric-value">&lt;500ms</span>
                  <span className="spec-metric-label">Total Entry Timeline</span>
                </div>
                <div className="spec-bar-container">
                  <div className="spec-bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Premium Footer */}
      <footer id="site-footer" className="site-footer reveal-on-scroll">
        <div className="container">
          {/* Footer Top — Brand + Navigation */}
          <div className="footer-top">
            {/* Brand Column */}
            <div className="footer-brand">
              <div className="footer-logo-row">
                <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '22px', height: '22px' }} />
                <span className="footer-logo-text">CORTEXA</span>
              </div>
              <p className="footer-brand-desc">
                Advanced AI-driven automation for database streams, multi-currency transactions, and autonomous pipeline orchestration.
              </p>
              
            </div>

            {/* Nav Columns */}
            <div className="footer-nav-columns">
              <div className="footer-nav-col">
                <span className="footer-nav-heading">Product</span>
                <a href="#features" className="footer-nav-link">Features</a>
                <a href="#pricing" className="footer-nav-link">Pricing</a>
                <a href="#tech-specs" className="footer-nav-link">Specifications</a>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-heading">Resources</span>
                <a href="https://github.com/tarunahuja19/CORTEXA" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  GitHub Repo
                  <img src="/svgs/chevron-right.svg" alt="" style={{ width: '10px', height: '10px', opacity: 0.4 }} />
                </a>
                <span className="footer-nav-link footer-nav-static">Documentation</span>
                <span className="footer-nav-link footer-nav-static">Status Logs</span>
              </div>
              <div className="footer-nav-col">
                <span className="footer-nav-heading">Legal</span>
                <span className="footer-nav-link footer-nav-static">Privacy Policy</span>
                <span className="footer-nav-link footer-nav-static">Terms of Service</span>
                <span className="footer-nav-link footer-nav-static">Compliance</span>
              </div>
            </div>
          </div>

          {/* Footer CTA Row */}
          <div className="footer-cta-row">
            <div className="footer-cta-text">
              <span className="footer-cta-headline">Ready to deploy?</span>
              <span className="footer-cta-sub">Start building with Cortexa in under 60 seconds.</span>
            </div>
            <button className="btn-primary footer-cta-btn">
              <span>Get Started Free</span>
              <img src="/svgs/chevron-right.svg" alt="" style={{ width: '12px', height: '12px' }} />
            </button>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom">
            <span className="footer-copyright">
              CORTEXA &copy; {new Date().getFullYear()}. All Rights Reserved.
            </span>
            <div className="footer-bottom-right">
              
              
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
