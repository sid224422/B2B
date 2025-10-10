import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { ConditionalHeader } from "@/components/layout/conditional-header"
import { ConditionalFooter } from "@/components/layout/conditional-footer"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AdvancedPageTransition } from "@/components/ui/advanced-page-transition"
import { NavigationProgress } from "@/components/ui/navigation-progress"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { AIChat } from "@/components/ai/ai-chat"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
})

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: "B2B Reviews - Find & Compare Business Services",
  description: "Discover and compare the best B2B service providers. Read authentic reviews from real customers and make informed decisions.",
  keywords: ["B2B", "reviews", "business services", "compare", "ratings"],
  authors: [{ name: "B2B Reviews Team" }],
  creator: "B2B Reviews",
  publisher: "B2B Reviews",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://b2breviews.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://b2breviews.com",
    title: "B2B Reviews - Find & Compare Business Services",
    description: "Discover and compare the best B2B service providers. Read authentic reviews from real customers and make informed decisions.",
    siteName: "B2B Reviews",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B Reviews - Find & Compare Business Services",
    description: "Discover and compare the best B2B service providers. Read authentic reviews from real customers and make informed decisions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <div className="min-h-screen flex flex-col">
                <NavigationProgress />
                <ConditionalHeader />
                <main className="flex-1">
                  <AdvancedPageTransition>
                    {children}
                  </AdvancedPageTransition>
                </main>
                <ConditionalFooter />
              </div>
              <AIChat />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}