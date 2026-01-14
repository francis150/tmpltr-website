import Image from 'next/image'

const plans = [
  {
    name: 'Free',
    description: 'Test drive before you commit',
    price: '$0',
    period: '',
    credits: '100',
    pages: '5-6',
    featured: false,
  },
  {
    name: 'Starter',
    description: 'For small businesses managing their own site',
    price: '$29',
    period: '/mo',
    credits: '400',
    pages: '20-26',
    featured: false,
  },
  {
    name: 'Pro',
    description: 'For freelancers and SEO professionals',
    price: '$99',
    period: '/mo',
    credits: '1,500',
    pages: '75-100',
    featured: true,
  },
  {
    name: 'Agency',
    description: 'For agencies scaling client work',
    price: '$179',
    period: '/mo',
    credits: '10,000',
    pages: '500-666',
    featured: false,
  },
]

export default function Home() {
  return (
    <main>
      <header className="header">
        <div className="container header-content">
          <div className="header-spacer" />
          <Image src="/logo.svg" alt="Tmpltr" width={180} height={60} className="logo" />
          <button className="icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download
          </button>
        </div>
      </header>

      <section className="pricing-section">
        <div className="container">
          <h1 className="pricing-title">Pricing</h1>
          <p className="pricing-subtitle">Choose the plan that works for you</p>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.featured && <span className="badge">Popular</span>}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </div>
                <div className="plan-divider" />
                <ul className="plan-features">
                  <li>
                    <strong>{plan.credits}</strong> credits
                  </li>
                  <li>
                    <strong>{plan.pages}</strong> est. pages
                  </li>
                </ul>
                <button className={`plan-btn ${plan.featured ? 'plan-btn-primary' : 'plan-btn-outline'}`}>
                  {plan.price === '$0' ? 'Download' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>

          <div className="credits-card">
            <div className="credits-content">
              <div className="credits-text">
                <h3>Need more credits?</h3>
                <p>Top up anytime when you run out</p>
              </div>
              <div className="credits-offer">
                <span className="credits-amount">100 credits</span>
                <span className="credits-price">$12</span>
              </div>
              <button className="plan-btn plan-btn-outline">Buy Now</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
