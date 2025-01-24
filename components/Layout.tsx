import React from 'react'
import { ReactNode, useEffect, useState } from 'react'
import Navbar from './Navbar.tsx'
import Footer from './Footer.tsx'
import { ErrorBoundary } from './ErrorBoundary'
import Meta from './Meta'

type LayoutProps = {
  children: ReactNode
  title?: string
}

export default function Layout({ children, title = 'AI Tools Directory' }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <ErrorBoundary>
      <div className={`${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-dark-100 bg-mesh-pattern">
          <Meta title={title} />
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary-400/5 to-transparent dark:from-primary-900/10" />
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
} 