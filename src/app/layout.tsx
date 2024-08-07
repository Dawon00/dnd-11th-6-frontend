import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  themeColor: '#9aa7fe',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-512x512.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </body>
    </html>
  )
}
