import type { Metadata } from 'next'

import { Fingerprint } from '@/app/components/Fingerprint'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Rate Limit',
  description: 'Test rate limit with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Fingerprint />
      </body>
    </html>
  )
}
