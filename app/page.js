import Image from 'next/image'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    credits: '100',
    pages: '5-6',
    featured: false,
  },
  {
    name: 'Starter',
    price: '$19',
    period: '/mo',
    credits: '400',
    pages: '20-26',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$79',
    period: '/mo',
    credits: '1,500',
    pages: '75-100',
    featured: true,
  },
  {
    name: 'Agency',
    price: '$199',
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
        <div className="container">
          <Image src="/logo.svg" alt="Tmpltr" width={180} height={60} className="logo" />
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
                  {plan.price === '$0' ? 'Try Now for Free' : 'Get Started'}
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
                <span className="credits-price">$10</span>
              </div>
              <button className="plan-btn plan-btn-outline">Buy Now</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
