import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SLANGE - Luxury Fashion E-commerce',
  description: 'Premium fashion platform with minimalist design and 3D product experience',
  keywords: 'luxury fashion, premium clothing, 3D shopping, SLANGE',
  authors: [{ name: 'SLANGE Team' }],
  openGraph: {
    title: 'SLANGE - Luxury Fashion E-commerce',
    description: 'Premium fashion platform with minimalist design',
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
