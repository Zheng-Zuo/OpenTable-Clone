import { NavBar } from '@/sections'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GlobalStatesProvider } from '@/components/ContextApi/GlobalStatesProvider'
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "OpenTable",
    template: '%s | Opentable'
  },
  description: 'This is an OpenTable clone',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth'>
      <GlobalStatesProvider>
        <body className={inter.className}>
          <main className="bg-gray-100 min-h-screen w-screen">
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar />
              {children}
            </main>
          </main>
        </body>
      </GlobalStatesProvider>
    </html>
  )
}
