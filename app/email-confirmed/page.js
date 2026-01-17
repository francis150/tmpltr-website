import { Suspense } from 'react'
import EmailConfirmedContent from './EmailConfirmedContent'

export default function EmailConfirmed() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailConfirmedContent />
    </Suspense>
  )
}
