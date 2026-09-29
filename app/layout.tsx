import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron, Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { LayoutWrapper } from "./components/layout-wrapper";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2B7FFF" },
    { media: "(prefers-color-scheme: dark)", color: "#2B7FFF" }
  ],
}

export const metadata: Metadata = {
  title: {
    default: "VeloraCloud - Game Hosting, VPS & Dedicated Servers",
    template: "%s | VeloraCloud"
  },
  description: "Premium game hosting, VPS & dedicated servers by VeloraCloud. High-performance infrastructure with 99.9% uptime, DDoS protection & 24/7 support.",
  keywords: [
    "game hosting",
    "minecraft hosting",
    "discord bot hosting",
    "VPS hosting",
    "dedicated servers",
    "cloud servers",
    "gaming servers",
    "VeloraCloud",
    "low latency hosting",
    "DDoS protection",
    "24/7 support",
    "custom server hosting",
    "modded game hosting",
    "server rental"
  ],
  authors: [{ name: "VeloraCloud" }],
  creator: "VeloraCloud",
  publisher: "VeloraCloud",
  category: "Game Hosting & Server Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://veloracloud.space",
    siteName: "VeloraCloud - Game Hosting & Servers",
    title: "VeloraCloud - Game Hosting, VPS & Dedicated Servers",
    description: "Premium game hosting, VPS, and dedicated server solutions. High-performance infrastructure for gaming communities and developers with DDoS protection.",
    images: [
      {
        url: "https://veloracloud.space/meta/Banner.png",
        width: 1200,
        height: 630,
        alt: "VeloraCloud - Game Hosting, VPS & Dedicated Servers",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VeloraCloud - Game Hosting, VPS & Dedicated Servers",
    description: "Premium game hosting and server solutions. High-performance infrastructure for gaming communities with DDoS protection and 24/7 support.",
    images: ["https://veloracloud.space/meta/Banner.png"]
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: "vzsKvhNUgAPlCbf1annB0Sl-bttSFos87mhOyQSU2aY", 
  },

  applicationName: "VeloraCloud",
  referrer: "origin-when-cross-origin",

  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/meta/Logo.png", sizes: "32x32", type: "image/png" },
      { url: "/meta/Logo.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/meta/Logo.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.ico"
  },

  alternates: {
    canonical: "https://veloracloud.space"
  },
  other: {
    "msapplication-TileColor": "#2B7FFF",
    "msapplication-config": "/browserconfig.xml",
    "terms-of-service": "https://veloracloud.space/terms-of-services",
    "privacy-policy": "https://veloracloud.space/privacy-policy"
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VeloraCloud" />
        <meta name="crawl-delay" content="10" />
        <meta name="revisit-after" content="7 days" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VeloraCloud",
              "url": "https://veloracloud.space",
              "logo": "https://veloracloud.space/meta/Logo.png",
              "description": "Premium game hosting, VPS, and dedicated server solutions for gaming communities and developers",
              "serviceType": ["Game Server Hosting", "VPS Hosting", "Cloud Infrastructure"],
              "areaServed": "Worldwide",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Gaming & Server Solutions",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Game Server Hosting",
                      "description": "High-performance game servers with DDoS protection"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "VPS Hosting",
                      "description": "Virtual private servers with full root access"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://discord.gg/rxhy4j7Xrh"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English",
                "serviceType": "Technical Support",
                "url": "https://discord.gg/rxhy4j7Xrh"
              },
              "termsOfService": "https://veloracloud.space/terms-of-services",
              "privacyPolicy": "https://veloracloud.space/privacy-policy"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${quicksand.variable} antialiased min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <LayoutWrapper>
              {children}
              <Analytics />
            </LayoutWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
