import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-dark-300 backdrop-blur-md bg-white/70 dark:bg-dark-100/70">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
              AI Tools Directory
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Discover and explore the latest AI tools and technologies. Your gateway to artificial intelligence innovation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/legal/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-300">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} AI Tools Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 