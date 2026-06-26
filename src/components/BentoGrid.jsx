import React, { useState, useEffect } from 'react'
import './BentoGrid.css'

const FEATURES = [
  {
    title: 'Autonomous Data Refinement',
    description: 'Clean, normalize, and structure raw database feeds using real-time machine learning pipelines.',
    icon: '/svgs/cog-8-tooth.svg',
    widget: () => (
      <div className="data-refining-stream">
        <div style={{ opacity: 0.6 }}>&gt; INTAKE: RAW_CSV_STREAM</div>
        <div style={{ color: 'var(--accent-secondary)' }}>&gt; PARSING: SUCCESS (99.8%)</div>
        <div style={{ fontWeight: 'bold' }}>&gt; OUTPUT: STRUCT_JSON</div>
      </div>
    )
  },
  {
    title: 'Predictive Velocity Engine',
    description: 'Automatically route message payloads to optimize server throughput queue latency.',
    icon: '/svgs/arrow-trending-up.svg',
    widget: () => (
      <div className="bar-chart-container">
        <div className="bar-chart-column" style={{ height: '35%' }}></div>
        <div className="bar-chart-column" style={{ height: '55%' }}></div>
        <div className="bar-chart-column" style={{ height: '85%' }}></div>
        <div className="bar-chart-column" style={{ height: '65%' }}></div>
        <div className="bar-chart-column" style={{ height: '95%' }}></div>
      </div>
    )
  },
  {
    title: 'Multi-Cluster Integrations',
    description: 'Secure node synchronization guarantees across hybrid cloud container groups.',
    icon: '/svgs/cube-16-solid.svg',
    widget: () => (
      <div className="node-net">
        <div className="node-point" aria-hidden="true"></div>
        <div className="node-line" aria-hidden="true"></div>
        <div className="node-point" aria-hidden="true" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
        <div className="node-line" aria-hidden="true"></div>
        <div className="node-point" aria-hidden="true"></div>
      </div>
    )
  },
  {
    title: 'Live Pipeline Insights',
    description: 'Real-time visual tracking of data flow, anomaly counts, and metric telemetry.',
    icon: '/svgs/chart-pie.svg',
    widget: () => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-headers)', fontWeight: 'bold', color: 'var(--accent-primary)' }}>99.98%</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>SYSTEM UPTIME</div>
        </div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px #10B981', animation: 'pulse 1.5s infinite' }} aria-hidden="true"></div>
      </div>
    )
  }
]

function BentoGrid() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Context lock resize listener for debugging or logging breakpoint transitions
  useEffect(() => {
    const handleResize = () => {
      // Breakpoint matching CSS media query (768px)
      const width = window.innerWidth
      // When screen resizes, activeIndex remains locked in state and is transferred
      // seamlessly from the hovered bento-card to the open accordion-item panel.
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex])

  return (
    <div style={{ width: '100%' }}>
      {/* Desktop Bento Grid */}
      <div className="bento-grid-desktop-wrapper">
        <div className="bento-container">
          {FEATURES.map((item, idx) => {
            const isLarge = idx === 0 || idx === 3
            return (
              <div
                key={idx}
                className={`glass-panel bento-card ${isLarge ? 'bento-card-large' : 'bento-card-small'} ${activeIndex === idx ? 'active-card' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                tabIndex={0}
              >
                <div>
                  <div className="bento-card-header">
                    <div className="bento-card-icon">
                      <img src={item.icon} alt="" style={{ width: '18px', height: '18px' }} />
                    </div>
                    <h3 className="bento-card-title">{item.title}</h3>
                  </div>
                  <p className="bento-card-desc">{item.description}</p>
                </div>
                <div className="bento-widget-container">
                  {item.widget()}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Accordion */}
      <div className="accordion-mobile-wrapper">
        <div className="accordion-wrapper" role="tablist">
          {FEATURES.map((item, idx) => {
            const isActive = activeIndex === idx
            return (
              <div
                key={idx}
                className={`accordion-item ${isActive ? 'active' : ''}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setActiveIndex(isActive ? -1 : idx)} // Toggle open/close on mobile
                  aria-expanded={isActive}
                  aria-controls={`accordion-panel-${idx}`}
                  id={`accordion-tab-${idx}`}
                  role="tab"
                >
                  <div className="accordion-header-left">
                    <div className="accordion-icon">
                      <img src={item.icon} alt="" style={{ width: '16px', height: '16px' }} />
                    </div>
                    <span className="accordion-title">{item.title}</span>
                  </div>
                  <img
                    className="accordion-chevron"
                    src="/svgs/chevron-down.svg"
                    alt=""
                  />
                </button>

                <div
                  className="accordion-content"
                  id={`accordion-panel-${idx}`}
                  role="tabpanel"
                  aria-labelledby={`accordion-tab-${idx}`}
                >
                  <div className="accordion-inner">
                    <div className="accordion-body">
                      <p className="bento-card-desc" style={{ marginBottom: '1.25rem' }}>{item.description}</p>
                      <div className="bento-widget-container" style={{ minHeight: '100px' }}>
                        {item.widget()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BentoGrid
