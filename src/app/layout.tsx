// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

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
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-xl font-bold">Elise Buil Immobilier</a>
                </div>
                <nav className="ml-6 flex items-center space-x-4">
                  <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                    Accueil
                  </a>
                  <a href="/blog" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
                    Actualités
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 mt-12">
          <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
            <p className="text-center text-gray-500">© {new Date().getFullYear()} Elise Buil Immobilier</p>
          </div>
        </footer>
      </body>
    </html>
  )
}