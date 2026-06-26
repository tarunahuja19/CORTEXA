import React, { useRef, useEffect } from 'react'
import './Pricing.css'

const PRICING_MATRIX = {
  currencies: {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    INR: { symbol: '₹', rate: 83.0 }
  },
  billingCycles: {
    monthly: { discount: 1.0 },
    annual: { discount: 0.8 } // 20% flat discount
  },
  tiers: {
    starter: { baseRate: 19 },
    professional: { baseRate: 49 },
    enterprise: { baseRate: 99 }
  }
}

function calculatePrice(tierKey, currencyKey, cycleKey) {
  const base = PRICING_MATRIX.tiers[tierKey].baseRate
  const currencyRate = PRICING_MATRIX.currencies[currencyKey].rate
  const discount = PRICING_MATRIX.billingCycles[cycleKey].discount

  const calculatedVal = base * currencyRate * discount
  return Math.round(calculatedVal)
}

function Pricing() {
  // References to price display nodes
  const pricesRefs = {
    starter: useRef(null),
    professional: useRef(null),
    enterprise: useRef(null)
  }

  // References to billing breakdown texts
  const billingInfoRefs = {
    starter: useRef(null),
    professional: useRef(null),
    enterprise: useRef(null)
  }

  // References to cycle buttons for DOM state toggle
  const btnMonthlyRef = useRef(null)
  const btnAnnualRef = useRef(null)

  // Selector value tracking
  const currentBillingCycle = useRef('monthly')
  const currentCurrency = useRef('USD')

  // Direct DOM updates
  const updatePrices = () => {
    const cycle = currentBillingCycle.current
    const currency = currentCurrency.current
    const symbol = PRICING_MATRIX.currencies[currency].symbol

    Object.keys(pricesRefs).forEach((tierKey) => {
      const priceVal = calculatePrice(tierKey, currency, cycle)
      
      // Mutate the price value text nodes directly (No React re-renders)
      if (pricesRefs[tierKey].current) {
        pricesRefs[tierKey].current.textContent = `${symbol}${priceVal}`
      }

      // Mutate the supplementary billing terms directly
      if (billingInfoRefs[tierKey].current) {
        if (cycle === 'annual') {
          const totalAnnual = calculatePrice(tierKey, currency, 'monthly') * 12 * 0.8
          billingInfoRefs[tierKey].current.textContent = `Billed annually (${symbol}${Math.round(totalAnnual)}/yr)`
        } else {
          billingInfoRefs[tierKey].current.textContent = 'Billed monthly'
        }
      }
    })
  }

  // Handle billing cycle change (direct DOM style update)
  const handleCycleSelect = (cycle) => {
    if (currentBillingCycle.current === cycle) return
    currentBillingCycle.current = cycle

    if (cycle === 'monthly') {
      btnMonthlyRef.current?.classList.add('active')
      btnAnnualRef.current?.classList.remove('active')
    } else {
      btnMonthlyRef.current?.classList.remove('active')
      btnAnnualRef.current?.classList.add('active')
    }

    updatePrices()
  }

  // Handle currency dropdown select
  const handleCurrencyChange = (e) => {
    currentCurrency.current = e.target.value
    updatePrices()
  }

  // Trigger setup on load
  useEffect(() => {
    updatePrices()
  }, [])

  return (
    <div style={{ width: '100%' }}>
      {/* Control Switchers Container */}
      <div className="pricing-header-controls">
        {/* Billing cycle toggle */}
        <div className="billing-toggle-container">
          <button
            ref={btnMonthlyRef}
            className="billing-toggle-btn active"
            onClick={() => handleCycleSelect('monthly')}
            aria-label="Toggle Monthly billing cycle"
          >
            Monthly
          </button>
          <button
            ref={btnAnnualRef}
            className="billing-toggle-btn"
            onClick={() => handleCycleSelect('annual')}
            aria-label="Toggle Annual billing cycle with 20 percent discount"
          >
            Annual
            <span className="annual-save-tag">-20%</span>
          </button>
        </div>

        {/* Currency selector */}
        <div className="currency-select-wrapper">
          <label htmlFor="currency-select" className="currency-select-label">Currency:</label>
          <select
            id="currency-select"
            className="currency-select-dropdown"
            onChange={handleCurrencyChange}
            defaultValue="USD"
            aria-label="Select pricing currency"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
      </div>

      {/* Pricing Plans Grid */}
      <div className="pricing-grid">
        {/* Starter Plan Card */}
        <div className="pricing-card">
          <div>
            <div className="tier-label-row">
              <span className="tier-icon-circle">
                <img src="/svgs/link.svg" alt="" style={{ width: '14px', height: '14px' }} />
              </span>
              <span className="tier-tier-tag">STARTER</span>
            </div>
            <h3 className="tier-name">Core Integration</h3>
            <p className="tier-desc">Ideal for developer sandboxes, API experiments, and prototype staging environments.</p>
            <div className="price-container">
              <div className="price-row">
                <span ref={pricesRefs.starter} className="price-val">$19</span>
                <span className="price-period">/mo</span>
              </div>
              <span ref={billingInfoRefs.starter} className="billing-info">Billed monthly</span>
            </div>
            <div className="pricing-divider"></div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>1 Live pipeline channel</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>10,000 Pipeline runs/mo</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>Basic latency logs</span>
              </li>
              <li className="pricing-feature-item pricing-feature-disabled">
                <span className="pricing-check">–</span>
                <span>Autonomous refinement</span>
              </li>
              <li className="pricing-feature-item pricing-feature-disabled">
                <span className="pricing-check">–</span>
                <span>Priority support SLA</span>
              </li>
            </ul>
          </div>
          <button className="btn-secondary pricing-cta">
            <span>Deploy Core</span>
            <img src="/svgs/chevron-right.svg" alt="" style={{ width: '12px', height: '12px' }} />
          </button>
        </div>

        {/* Professional Plan Card (Featured) */}
        <div className="pricing-card pricing-card-recommended">
          <div className="pricing-badge">Most Popular</div>
          <div className="pricing-card-glow" aria-hidden="true"></div>
          <div>
            <div className="tier-label-row">
              <span className="tier-icon-circle tier-icon-accent">
                <img src="/svgs/arrow-trending-up.svg" alt="" style={{ width: '14px', height: '14px' }} />
              </span>
              <span className="tier-tier-tag tier-tag-accent">PROFESSIONAL</span>
            </div>
            <h3 className="tier-name">Pipeline Suite</h3>
            <p className="tier-desc">Perfect for production workloads, high-volume automation, and active multi-team systems.</p>
            <div className="price-container">
              <div className="price-row">
                <span ref={pricesRefs.professional} className="price-val">$49</span>
                <span className="price-period">/mo</span>
              </div>
              <span ref={billingInfoRefs.professional} className="billing-info">Billed monthly</span>
            </div>
            <div className="pricing-divider pricing-divider-accent"></div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item">
                <span className="pricing-check pricing-check-accent">✓</span>
                <span>Unlimited pipelines</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check pricing-check-accent">✓</span>
                <span>250,000 Pipeline runs/mo</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check pricing-check-accent">✓</span>
                <span>Autonomous data refinement</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check pricing-check-accent">✓</span>
                <span>Priority support SLA</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check pricing-check-accent">✓</span>
                <span>Multi-cluster sync</span>
              </li>
            </ul>
          </div>
          <button className="btn-primary pricing-cta">
            <span>Launch Suite</span>
            <img src="/svgs/chevron-right.svg" alt="" style={{ width: '12px', height: '12px' }} />
          </button>
        </div>

        {/* Enterprise Plan Card */}
        <div className="pricing-card">
          <div>
            <div className="tier-label-row">
              <span className="tier-icon-circle">
                <img src="/svgs/cube-16-solid.svg" alt="" style={{ width: '14px', height: '14px' }} />
              </span>
              <span className="tier-tier-tag">ENTERPRISE</span>
            </div>
            <h3 className="tier-name">Enterprise Core</h3>
            <p className="tier-desc">Custom scalability for security-first enterprises with massive database operations.</p>
            <div className="price-container">
              <div className="price-row">
                <span ref={pricesRefs.enterprise} className="price-val">$99</span>
                <span className="price-period">/mo</span>
              </div>
              <span ref={billingInfoRefs.enterprise} className="billing-info">Billed monthly</span>
            </div>
            <div className="pricing-divider"></div>
            <ul className="pricing-features-list">
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>Dedicated container clusters</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>Unlimited pipeline runs</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>Custom refinement filters</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>24/7 Dedicated hot-line</span>
              </li>
              <li className="pricing-feature-item">
                <span className="pricing-check">✓</span>
                <span>SSO & audit logging</span>
              </li>
            </ul>
          </div>
          <button className="btn-secondary pricing-cta">
            <span>Request Specs</span>
            <img src="/svgs/chevron-right.svg" alt="" style={{ width: '12px', height: '12px' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pricing
