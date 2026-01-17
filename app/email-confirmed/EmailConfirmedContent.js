'use client'

import Image from 'next/image'

export default function EmailConfirmedContent() {
  return (
    <main>
      <header className="header">
        <div className="container header-content header-centered">
          <Image src="/logo.svg" alt="Tmpltr" width={180} height={60} className="logo" />
        </div>
      </header>

      <section className="confirmation-section">
        <div className="container">
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="confirmation-title">Email Confirmed!</h1>
          <p className="confirmation-subtitle">
            You can now return to the plugin. Feel free to close this tab.
          </p>
        </div>
      </section>
    </main>
  )
}
