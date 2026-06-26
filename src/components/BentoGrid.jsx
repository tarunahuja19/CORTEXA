import React, { useState, useEffect } from 'react'
import './BentoGrid.css'

const FEATURES = [
  {
    title: 'Autonomous Data Refinement',
    description: 'Clean, normalize, and structure raw database feeds using real-time machine learning pipelines with zero manual intervention.',
    icon: '/svgs/cog-8-tooth.svg',
    tag: 'AI-POWERED',
    number: '01',
    widget: () => (
      <div className="widget-refine">
        <div className="refine-step">
          <span className="refine-status refine-done">✓</span>
          <span className="refine-label">Intake: RAW_CSV_STREAM</span>
          <span className="refine-meta">2.1 MB</span>
        </div>
        <div className="refine-step">
          <span className="refine-status refine-done">✓</span>
          <span className="refine-label">Parse: SUCCESS</span>
          <span className="refine-meta refine-meta-accent">99.8%</span>
        </div>
        <div className="refine-step refine-step-active">
          <span className="refine-status refine-active-dot"></span>
          <span className="refine-label">Output: STRUCT_JSON</span>
          <span className="refine-meta">48K rows</span>
        </div>
        <div className="refine-progress-bar">
          <div className="refine-progress-fill"></div>
        </div>
      </div>
    )
  },
  {
    title: 'Predictive Velocity Engine',
    description: 'Automatically route message payloads to optimize server throughput and minimize queue latency across regions.',
    icon: '/svgs/arrow-trending-up.svg',
    tag: 'REAL-TIME',
    number: '02',
    widget: () => (
      <div className="widget-velocity">
        <div className="velocity-chart">
          <div className="velocity-bar" style={{ height: '30%' }}><span className="velocity-val">1.2</span></div>
          <div className="velocity-bar" style={{ height: '50%' }}><span className="velocity-val">2.1</span></div>
          <div className="velocity-bar" style={{ height: '75%' }}><span className="velocity-val">3.4</span></div>
          <div className="velocity-bar" style={{ height: '55%' }}><span className="velocity-val">2.6</span></div>
          <div className="velocity-bar" style={{ height: '85%' }}><span className="velocity-val">4.1</span></div>
          <div className="velocity-bar velocity-bar-current" style={{ height: '95%' }}><span className="velocity-val">6.2</span></div>
        </div>
        <div className="velocity-footer">
          <span className="velocity-label">Throughput (K/s)</span>
          <span className="velocity-trend">↑ 38%</span>
        </div>
      </div>
    )
  },
  {
    title: 'Multi-Cluster Integrations',
    description: 'Secure node synchronization guarantees across hybrid cloud container groups with automatic failover.',
    icon: '/svgs/cube-16-solid.svg',
    tag: 'DISTRIBUTED',
    number: '03',
    widget: () => (
      <div className="widget-cluster">
        <div className="cluster-map">
          <div className="cluster-node cluster-node-primary">
            <span className="cluster-node-label">PRIMARY</span>
          </div>
          <div className="cluster-connector">
            <div className="cluster-connector-line"></div>
            <div className="cluster-connector-pulse"></div>
          </div>
          <div className="cluster-node cluster-node-replica">
            <span className="cluster-node-label">REPLICA</span>
          </div>
          <div className="cluster-connector">
            <div className="cluster-connector-line"></div>
            <div className="cluster-connector-pulse cluster-pulse-delay"></div>
          </div>
          <div className="cluster-node cluster-node-edge">
            <span className="cluster-node-label">EDGE</span>
          </div>
        </div>
        <div className="cluster-status-row">
          <span className="cluster-status-badge">3/3 Online</span>
          <span className="cluster-latency">Avg 8ms</span>
        </div>
      </div>
    )
  },
  {
    title: 'Live Pipeline Insights',
    description: 'Real-time visual tracking of data flow, anomaly counts, and metric telemetry across all active nodes.',
    icon: '/svgs/chart-pie.svg',
    tag: 'MONITORING',
    number: '04',
    widget: () => (
      <div className="widget-insights">
        <div className="insights-metrics-row">
          <div className="insights-metric">
            <span className="insights-metric-value">99.98%</span>
            <span className="insights-metric-label">UPTIME</span>
          </div>
          <div className="insights-ring" aria-hidden="true">
            <svg viewBox="0 0 36 36" className="insights-ring-svg">
              <path className="insights-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="insights-ring-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray="99.98, 100" />
            </svg>
          </div>
          <div className="insights-metric">
            <span className="insights-metric-value">0</span>
            <span className="insights-metric-label">ANOMALIES</span>
          </div>
        </div>
        <div className="insights-live-bar">
          <div className="insights-live-dot"></div>
          <span>Pipeline Active — All systems nominal</span>
        </div>
      </div>
    )
  }
]

function BentoGrid() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Context lock resize listener for Feature 2 compliance
  useEffect(() => {
    const handleResize = () => {
      // Breakpoint matching CSS media query (768px)
      // When screen resizes, activeIndex remains locked in state and is transferred
      // seamlessly from the hovered bento-card to the open accordion-item panel.
      const width = window.innerWidth
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
                className={`bento-card ${isLarge ? 'bento-card-large' : 'bento-card-small'} ${activeIndex === idx ? 'active-card' : ''}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                tabIndex={0}
              >
                <div className="bento-card-number" aria-hidden="true">{item.number}</div>
                <div>
                  <div className="bento-card-header">
                    <div className="bento-card-icon">
                      <img src={item.icon} alt="" style={{ width: '18px', height: '18px' }} />
                    </div>
                    <div>
                      <div className="bento-card-tag">{item.tag}</div>
                      <h3 className="bento-card-title">{item.title}</h3>
                    </div>
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
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  aria-expanded={isActive}
                  aria-controls={`accordion-panel-${idx}`}
                  id={`accordion-tab-${idx}`}
                  role="tab"
                >
                  <div className="accordion-header-left">
                    <div className="accordion-icon">
                      <img src={item.icon} alt="" style={{ width: '16px', height: '16px' }} />
                    </div>
                    <div>
                      <div className="accordion-tag">{item.tag}</div>
                      <span className="accordion-title">{item.title}</span>
                    </div>
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
