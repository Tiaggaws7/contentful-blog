// src/app/layout.tsx
import Navbar from '@/components/navbar';
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Elise Buil Immobilier',
  description: 'Votre partenaire immobilier en Guadeloupe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
          <Navbar></Navbar>
        <main>{children}</main>
      </body>
    </html>
  )
}