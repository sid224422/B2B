"use client"

import * as React from "react"
import { Search, Menu, ShoppingCart, Zap, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Container } from "@/components/layout/container"
import { useCompareStore } from "@/lib/store/compare"
import { SearchBar } from "@/components/app/search-bar"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function AppHeader() {
  const { selectedCompanies } = useCompareStore()
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogoClick = () => {
    window.location.href = '/'
  }

  const handleCompareClick = () => {
    window.location.href = '/compare'
  }

  const handleSignInClick = () => {
    window.location.href = '/auth/signin'
  }

  const handleRegisterClick = () => {
    window.location.href = '/auth/register'
  }

  const handleAIClick = () => {
    // Navigate to dedicated AI chat page
    window.location.href = '/ai-chat'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogoClick} 
              className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300 ring-2 ring-primary/20 group-hover:ring-primary/40">
                <Zap className="h-6 w-6 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                  B2B Reviews
                </span>
                <span className="text-xs text-muted-foreground font-medium -mt-1 group-hover:text-primary/70 transition-colors duration-300">
                  Find. Compare. Decide.
                </span>
              </div>
            </button>
          </div>


          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* AI Assistant Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative group hover:bg-primary/10 hover:text-primary transition-all duration-300 hidden sm:flex" 
              onClick={handleAIClick}
            >
              <Bot className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              AI Assistant
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Compare Button */}
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="group hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" 
                onClick={handleCompareClick}
              >
                <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Compare
              </Button>
              {isClient && selectedCompanies.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce-in z-10"
                >
                  {selectedCompanies.length}
                </Badge>
              )}
            </div>

            {/* Sign In Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300" 
              onClick={handleSignInClick}
            >
              Sign In
            </Button>

            {/* Get Listed Button */}
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-semibold" 
              onClick={handleRegisterClick}
            >
              Get Listed
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <SearchBar />
                  </div>


                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <button 
                      onClick={() => window.location.href = '/categories'}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      Categories
                    </button>
                    <button 
                      onClick={() => window.location.href = '/companies'}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      All Companies
                    </button>
                    <button 
                      onClick={() => window.location.href = '/ai-assistant'}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      AI Assistant
                    </button>
                    <button 
                      onClick={() => window.location.href = '/ai-chat'}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      AI Chat
                    </button>
                    <button 
                      onClick={() => window.location.href = '/ai-analytics'}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      AI Analytics
                    </button>
                  </div>

                  {/* Mobile User Menu */}
                  <div className="flex flex-col space-y-2 pt-4 border-t">
                    <button 
                      onClick={handleSignInClick}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={handleRegisterClick}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      Get Listed
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
