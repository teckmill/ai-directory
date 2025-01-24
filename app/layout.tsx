import type { Metadata } from "next"

import { Inter } from "next/font/google"

import "./globals.css"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'AI Tools Directory',
  description: 'Discover and explore AI tools and services'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <><html lang="en" className={inter.className}>{children}</html><body>
      <div className="container mx-auto">
          <h1 className="text-2xl font-bold">AI Tools Directory</h1>
      </div>
  </body></>
}
