import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ThemeProvider } from '../lib/theme-context'
import Navigation from '../components/navigation'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeArena - Master Coding Interviews',
  description: 'Practice coding problems, collaborate with peers, and ace your technical interviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <Navigation />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <main id="root">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}