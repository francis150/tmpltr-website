import { Suspense } from 'react'
import CreditLogsContent from './CreditLogsContent'

export const metadata = {
  title: 'Tmpltr - Credit History',
  description: 'View your credit usage history',
}

export default function CreditLogs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreditLogsContent />
    </Suspense>
  )
}
