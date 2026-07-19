import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import { TenantProvider } from '@/lib/config/tenant-provider'
import { tenantConfig } from '@/lib/config/tenant'

const { branding } = tenantConfig

export const metadata: Metadata = {
  title: {
    default: branding.name,
    template: `%s · ${branding.name}`,
  },
  description: branding.description,
  keywords: [branding.name, 'POS', 'punto de venta', 'inventario', 'gestión'],
  authors: [{ name: branding.name }],
  creator: branding.name,
  icons: {
    icon: [
      { url: branding.faviconUrl, type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: branding.locale,
    url: branding.url,
    siteName: branding.name,
    title: `${branding.name} — Sistema de Gestión`,
    description: branding.description,
    images: [{ url: '/icon.svg', width: 512, height: 512, alt: branding.name }],
  },
  robots: {
    index: false,
    follow: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#18181b" />
      </head>
      <body>
        <TenantProvider>
          {children}
        </TenantProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3500}
        />
      </body>
    </html>
  )
}
