import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageContext'

export const metadata: Metadata = {
  title: {
    default: 'Nextguard Knowledge Base',
    template: '%s | Nextguard KB',
  },
  description: 'Official documentation for Nextguard Security Products — Web Gateway, Email Gateway, DLP/MDLP, and UCSS Management Platform.',
  keywords: ['Nextguard', 'Knowledge Base', 'DLP', 'Web Security', 'Email Security', 'UCSS', 'Cybersecurity'],
  openGraph: {
    siteName: 'Nextguard Knowledge Base',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-gray-900 font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
