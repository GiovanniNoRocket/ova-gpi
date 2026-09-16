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
  title: 'Fundamentos de Gestión de Proyectos e Inteligencia Artificial | Universidad de Cartagena',
  description:
    'Nivel 1 de 3 · Comprensión del proyecto tecnológico, PMBOK®, enfoques predictivos, ágiles e híbridos, gobernanza y uso responsable de Inteligencia Artificial Generativa.',
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
