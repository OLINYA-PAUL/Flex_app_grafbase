import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Navber from '@/components/Navber'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flexible App',
  description: 'Generated amazing porfolio as a developer using flexible',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navber />
        <main>
        {children}
        </main>
        <Footer/> 
      </body>
    </html>
  )
}
