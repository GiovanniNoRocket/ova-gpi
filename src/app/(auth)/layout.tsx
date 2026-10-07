import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Autenticación — OVA',
  description: 'Inicia sesión en la plataforma OVA',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-muted/30 antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
