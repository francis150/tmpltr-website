'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { config } from '../../lib/config'

export default function CreditLogsContent() {
  const [status, setStatus] = useState('loading')
  const [logs, setLogs] = useState([])
  const [pagination, setPagination] = useState(null)
  const [error, setError] = useState(null)
  const [hoveredBalanceId, setHoveredBalanceId] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(1))
    const authToken = params.get('auth_token')

    if (!authToken) {
      setStatus('no_token')
      return
    }

    fetchCreditLogs(authToken)
  }, [])

  const fetchCreditLogs = async (token) => {
    try {
      const response = await fetch(
        `${config.serverUrl}${config.endpoints.creditLogs}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please try again from the plugin.')
        }
        if (response.status === 403) {
          throw new Error('You don\'t have permission to view this data.')
        }
        if (response.status >= 500) {
          throw new Error('Something went wrong. Please try again later.')
        }
        throw new Error('Unable to load credit history.')
      }

      const result = await response.json()

      if (!result.success || !result.data?.logs) {
        setStatus('empty')
        return
      }

      const { logs: logData, pagination: paginationData } = result.data

      if (logData.length === 0) {
        setStatus('empty')
        return
      }

      setLogs(logData)
      setPagination(paginationData)
      setStatus('success')
    } catch (err) {
      if (err.name === 'TypeError') {
        setError('Unable to connect. Check your internet connection.')
      } else {
        setError(err.message)
      }
      setStatus('error')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCredits = (amount) => {
    if (amount > 0) return `+${amount.toLocaleString()}`
    return amount.toLocaleString()
  }

  const formatType = (type) => {
    const types = {
      usage: 'Usage',
      subscription: 'Subscription',
      purchased: 'Purchase',
    }
    return types[type] || type
  }

  const getBalance = (log) => {
    return (log.subscription_balance_after + log.purchased_balance_after).toLocaleString()
  }

  const renderHeader = () => (
    <header className="header">
      <div className="container header-content header-centered">
        <Image src="/logo.svg" alt="Tmpltr" width={180} height={60} className="logo" />
      </div>
    </header>
  )

  if (status === 'loading') {
    return (
      <main>
        {renderHeader()}
        <section className="logs-loading">
          <div className="spinner" />
          <p className="loading-text">Loading your credit history...</p>
        </section>
      </main>
    )
  }

  if (status === 'no_token') {
    return (
      <main>
        {renderHeader()}
        <section className="logs-message">
          <div className="message-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="message-title">Authentication Required</h1>
          <p className="message-subtitle">
            Access this page from the Tmpltr plugin to view your credit history.
          </p>
        </section>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main>
        {renderHeader()}
        <section className="logs-message">
          <div className="message-icon message-icon-error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="message-title">Something went wrong</h1>
          <p className="message-subtitle">{error}</p>
        </section>
      </main>
    )
  }

  if (status === 'empty') {
    return (
      <main>
        {renderHeader()}
        <section className="logs-message">
          <div className="message-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <h1 className="message-title">No Transactions Yet</h1>
          <p className="message-subtitle">
            Start using Tmpltr to see your credit history here.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main>
      {renderHeader()}
      <section className="logs-section">
        <div className="container">
          <div className="logs-header">
            <h1 className="logs-title">Credit History</h1>
            <p className="logs-subtitle">Your credit usage and purchases</p>
          </div>

          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Credits</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => {
                  const isNearBottom = index >= logs.length - 2
                  return (
                    <tr key={log.id}>
                      <td data-label="Date">{formatDate(log.created_at)}</td>
                      <td data-label="Description">{log.description}</td>
                      <td data-label="Type">
                        <span className={`type-badge type-${log.transaction_type}`}>
                          {formatType(log.transaction_type)}
                        </span>
                      </td>
                      <td data-label="Credits" className={log.amount >= 0 ? 'credit-positive' : 'credit-negative'}>
                        {formatCredits(log.amount)}
                      </td>
                      <td data-label="Balance" className="balance-cell">
                        <div
                          className="balance-wrapper"
                          onMouseEnter={() => setHoveredBalanceId(log.id)}
                          onMouseLeave={() => setHoveredBalanceId(null)}
                        >
                          <span className="balance-value">{getBalance(log)}</span>
                          {hoveredBalanceId === log.id && (
                            <div className={`balance-tooltip${isNearBottom ? ' tooltip-above' : ''}`}>
                              <div className="balance-tooltip-row">
                                <span className="balance-tooltip-label">Subscription</span>
                                <span className="balance-tooltip-value tooltip-subscription">
                                  {log.subscription_balance_after.toLocaleString()}
                                </span>
                              </div>
                              <div className="balance-tooltip-row">
                                <span className="balance-tooltip-label">Purchased</span>
                                <span className="balance-tooltip-value tooltip-purchased">
                                  {log.purchased_balance_after.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {pagination && (
            <p className="logs-pagination">
              Showing {logs.length} of {pagination.total} transactions
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
