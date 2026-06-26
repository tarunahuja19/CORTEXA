import React from 'react'

function App() {
  return (
    <>
      {/* Performance-Optimized CSS Loader (Completes in under 500ms) */}
      <div className="loader-overlay" id="entry-loader">
        <div className="loader-spinner" aria-label="Loading platform..."></div>
      </div>

      {/* Header / Navigation */}
      <header className="container" id="site-header" style={{ padding: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/svgs/cube-16-solid.svg" alt="Cortexa Logo" style={{ width: '28px', height: '28px' }} />
          <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.05em' }}>CORTEXA</span>
        </div>
        <nav aria-label="Main Navigation">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', fontFamily: 'var(--font-headers)', fontSize: '0.9rem' }}>
            <li><a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>Features</a></li>
            <li><a href="#pricing" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>Pricing</a></li>
            <li><a href="https://github.com/tarunahuja19/CORTEXA" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast) ease-out' }}>Github</a></li>
          </ul>
        </nav>
        <div>
          <a href="#pricing" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Get Started</a>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="main-content">
        {/* Hero Section */}
        <section id="hero" className="container" aria-labelledby="hero-title" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
          <div className="animate-on-load">
            <h1 id="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
              Automate Your Data Pipelines with <span style={{ color: 'var(--accent-primary)' }}>AI-Precision</span>
            </h1>
            <p style={{ maxWidth: '680px', margin: '0 auto 2.5rem', fontSize: '1.15rem' }}>
              Scale operations, configure complex multi-currency transformations, and observe your workflows through a responsive glassmorphic Bento system.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="#pricing" className="btn-primary">View Pricing</a>
              <a href="#features" className="btn-secondary">Explore Features</a>
            </div>
          </div>
        </section>

        {/* Feature Showcase Skeleton */}
        <section id="features" className="container" aria-labelledby="features-title">
          <h2 id="features-title" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Engineered For Modern Data Teams</h2>
          <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '16px', color: 'var(--text-secondary)' }}>
            [Feature Bento Grid Section - Coming in Task 3]
          </div>
        </section>

        {/* Pricing Matrix Skeleton */}
        <section id="pricing" className="container" aria-labelledby="pricing-title">
          <h2 id="pricing-title" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Predictable, Performance-Isolated Plans</h2>
          <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '16px', color: 'var(--text-secondary)' }}>
            [Performance-Isolated Pricing Section - Coming in Task 4]
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="site-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/svgs/cube-16-solid.svg" alt="Cortexa Logo" style={{ width: '20px', height: '20px', opacity: 0.7 }} />
            <span style={{ fontFamily: 'var(--font-headers)', fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-secondary)' }}>CORTEXA &copy; {new Date().getFullYear()}</span>
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            Built using raw CSS transitions and isolated React DOM updates.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
