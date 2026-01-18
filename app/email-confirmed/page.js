import { Suspense } from 'react'
import EmailConfirmedContent from './EmailConfirmedContent'

export const metadata = {
  title: 'Tmpltr - Email Confirmed',
  description: 'Your email has been successfully confirmed',
}

export default function EmailConfirmed() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailConfirmedContent />
    </Suspense>
  )
}
