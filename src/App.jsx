import React from 'react'
import BentoGrid from './components/BentoGrid'
import Pricing from './components/Pricing'

function App() {
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
        <section id="hero" aria-labelledby="hero-title" style={{ padding: '6rem 0 4rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="animate-on-load">
              {/* Promo Badge */}
              <div className="promo-badge">
                <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '12px', height: '12px' }} />
                <span>Cortexa v1.0.0 Now in Public Beta</span>
              </div>
              
              {/* Heading */}
              <h1 id="hero-title" style={{ fontSize: '3.5rem', lineHeight: '1.1', maxWidth: '850px', margin: '0 auto 1.5rem', fontWeight: 800 }}>
                Automate Your Data Pipelines with <span className="gradient-text">AI-Precision</span>
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

            {/* Simulated Live Terminal Dashboard */}
            <div className="hero-dashboard-preview animate-on-load animate-delay-2" aria-label="Cortexa pipeline console preview">
              <div className="hero-dashboard-header">
                <div className="hero-dashboard-dots">
                  <div className="hero-dashboard-dot"></div>
                  <div className="hero-dashboard-dot"></div>
                  <div className="hero-dashboard-dot"></div>
                </div>
                <div className="hero-dashboard-title">pipeline-monitor@cortexa: ~</div>
                <div style={{ width: '40px' }}></div>
              </div>
              
              <div className="hero-dashboard-body">
                {/* Live stream */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', borderBottom: '1px solid rgba(217, 232, 226, 0.08)', paddingBottom: '0.25rem', fontWeight: 'bold' }}>
                    [LIVE DATA STREAM]
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.65 }}>&gt; fetch: db_source_asia/users ... OK</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>&gt; refine: parsed 48,102 values [0.08ms]</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>&gt; tariff: computed EUR exchange variables</div>
                  <div style={{ fontSize: '0.75rem', color: '#10B981' }}>&gt; queue: routing payload to sync-node-04</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.4 }}>&gt; standing by for raw buffer ingest...</div>
                </div>
                
                {/* Active route statistics */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.75rem', borderBottom: '1px solid rgba(217, 232, 226, 0.08)', paddingBottom: '0.25rem', fontWeight: 'bold' }}>
                    [ACTIVE PIPELINES]
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span>Pipeline Clusters:</span>
                    <span style={{ color: 'var(--accent-secondary)' }}>4 Nodes Online</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span>Global Latency:</span>
                    <span style={{ color: '#10B981' }}>12ms average</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span>Throughput:</span>
                    <span style={{ color: 'var(--text-primary)' }}>12,850 runs/sec</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span>Data Sync Lock:</span>
                    <span style={{ color: '#10B981' }}>Persisted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Brand Bar */}
        <section className="social-proof-section" aria-label="Customer proof">
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

        {/* Bento Features Section */}
        <section id="features" aria-labelledby="features-title" style={{ padding: '5rem 0' }}>
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
        <section id="pricing" aria-labelledby="pricing-title" style={{ padding: '5rem 0' }}>
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
        <section id="tech-specs" aria-labelledby="specs-title" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)' }}>
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
      <footer id="site-footer" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '4rem 0 3rem 0' }}>
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
