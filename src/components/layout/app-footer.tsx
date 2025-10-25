import * as React from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <Container>
        <div className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-brand flex items-center justify-center">
                <span className="text-brand-foreground font-bold text-sm">B2B</span>
              </div>
              <span className="font-bold text-xl">Reviews</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Find and compare the best B2B service providers. Read authentic reviews from real customers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/companies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted-foreground hover:text-foreground transition-colors">
                  Compare Services
                </Link>
              </li>
              <li>
                <Link href="/write-review" className="text-muted-foreground hover:text-foreground transition-colors">
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/categories/web-development" className="text-muted-foreground hover:text-foreground transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/categories/mobile-development" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/categories/digital-marketing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/categories/cloud-services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cloud Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 B2B Reviews. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for the B2B community</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
