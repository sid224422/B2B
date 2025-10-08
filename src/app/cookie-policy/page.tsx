"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Cookie, 
  Settings, 
  Shield, 
  Eye, 
  BarChart3, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Home,
  Zap,
  MessageSquare,
  Building2,
  Calendar,
  Database,
  Globe,
  Users,
  Mail,
  Phone,
  Info,
  Lock,
  ExternalLink,
  Download,
  Trash2
} from "lucide-react"

export default function CookiePolicyPage() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const settingsRef = useRef(null)
  const contactRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })
  const settingsInView = useInView(settingsRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

  const [cookieSettings, setCookieSettings] = React.useState({
    essential: true, // Always required
    functional: true,
    analytics: false,
    advertising: false
  })

  const handleCookieToggle = (type: keyof typeof cookieSettings) => {
    if (type === 'essential') return // Essential cookies cannot be disabled
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const saveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookieSettings))
    // Here you would typically send preferences to your backend
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.button 
              onClick={() => window.location.href = '/'}
              className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300">
                <Zap className="h-5 w-5 text-primary-foreground" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  B2B Reviews
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Cookie Policy</span>
              </div>
            </motion.button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.button 
                onClick={() => window.location.href = '/categories'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Categories</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/companies'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Users className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Companies</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/contact-us'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Contact Us</span>
              </motion.button>
            </nav>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <Section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <Container>
          <motion.div 
            ref={heroRef}
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-8 shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={heroInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Cookie className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Cookie
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Learn about how we use cookies and similar technologies to enhance your experience on our platform.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-all duration-300 px-4 py-2 text-sm font-medium"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Last Updated: December 2024
              </Badge>
              <span className="text-sm text-muted-foreground">GDPR & CCPA Compliant</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={contentRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              {/* What Are Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Info className="h-6 w-6 mr-3 text-primary" />
                      What Are Cookies?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Cookies are small text files that are stored on your device when you visit our website. They help us 
                      provide you with a better experience by remembering your preferences and understanding how you use our platform.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <Database className="h-5 w-5 mr-2 text-primary" />
                          How They Work
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Stored in your browser's memory</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Sent back to our servers on future visits</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Help personalize your experience</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-primary" />
                          Your Control
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>You can control cookie settings</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Delete cookies at any time</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Block cookies through browser settings</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Types of Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Settings className="h-6 w-6 mr-3 text-primary" />
                      Types of Cookies We Use
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Essential Cookies */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Lock className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Essential Cookies</h4>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          These cookies are necessary for the website to function properly. They enable basic functions 
                          like page navigation, access to secure areas, and user authentication.
                        </p>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li>• Session management</li>
                          <li>• Security features</li>
                          <li>• User authentication</li>
                          <li>• Form submissions</li>
                        </ul>
                      </div>

                      {/* Functional Cookies */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Settings className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Functional Cookies</h4>
                            <Badge variant="secondary" className="text-xs">Optional</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          These cookies remember your preferences and choices to provide a more personalized experience.
                        </p>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li>• Language preferences</li>
                          <li>• Theme settings</li>
                          <li>• User preferences</li>
                          <li>• Location settings</li>
                        </ul>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Analytics Cookies</h4>
                            <Badge variant="outline" className="text-xs">Optional</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          These cookies help us understand how visitors interact with our website by collecting 
                          and reporting information anonymously.
                        </p>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li>• Page views and visits</li>
                          <li>• User behavior patterns</li>
                          <li>• Performance metrics</li>
                          <li>• Error tracking</li>
                        </ul>
                      </div>

                      {/* Advertising Cookies */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Target className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">Advertising Cookies</h4>
                            <Badge variant="outline" className="text-xs">Optional</Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          These cookies are used to deliver advertisements that are relevant to you and your interests.
                        </p>
                        <ul className="space-y-1 text-muted-foreground text-sm">
                          <li>• Targeted advertising</li>
                          <li>• Ad performance tracking</li>
                          <li>• Frequency capping</li>
                          <li>• Cross-site tracking</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Third-Party Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Globe className="h-6 w-6 mr-3 text-primary" />
                      Third-Party Cookies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We may use third-party services that set their own cookies. These services help us provide 
                      better functionality and analytics. Here are the main third-party services we use:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Google Analytics",
                          purpose: "Website analytics and performance tracking",
                          link: "https://policies.google.com/privacy"
                        },
                        {
                          name: "Google Ads",
                          purpose: "Advertising and conversion tracking",
                          link: "https://policies.google.com/privacy"
                        },
                        {
                          name: "Facebook Pixel",
                          purpose: "Social media advertising and analytics",
                          link: "https://www.facebook.com/privacy/explanation"
                        },
                        {
                          name: "Hotjar",
                          purpose: "User experience and behavior analysis",
                          link: "https://www.hotjar.com/legal/policies/privacy"
                        }
                      ].map((service, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                          <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">{service.name}</h4>
                            <p className="text-muted-foreground text-xs mb-2">{service.purpose}</p>
                            <a 
                              href={service.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-xs hover:underline"
                            >
                              View Privacy Policy
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Cookie Settings */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={settingsRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={settingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={settingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 text-center">
                Manage Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Cookie Preferences
                </span>
              </h3>
              <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                You can control which types of cookies we use. Essential cookies are required for the website to function properly.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    key: 'essential',
                    title: 'Essential Cookies',
                    description: 'Required for basic website functionality, security, and user authentication.',
                    required: true,
                    icon: Lock
                  },
                  {
                    key: 'functional',
                    title: 'Functional Cookies',
                    description: 'Remember your preferences and settings to provide a personalized experience.',
                    required: false,
                    icon: Settings
                  },
                  {
                    key: 'analytics',
                    title: 'Analytics Cookies',
                    description: 'Help us understand how you use our website to improve our services.',
                    required: false,
                    icon: BarChart3
                  },
                  {
                    key: 'advertising',
                    title: 'Advertising Cookies',
                    description: 'Used to deliver relevant advertisements and measure ad performance.',
                    required: false,
                    icon: Target
                  }
                ].map((cookie, index) => (
                  <div key={cookie.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        cookie.required ? 'bg-red-100' : 'bg-primary/10'
                      }`}>
                        <cookie.icon className={`h-5 w-5 ${
                          cookie.required ? 'text-red-600' : 'text-primary'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground flex items-center space-x-2">
                          <span>{cookie.title}</span>
                          {cookie.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                        </h4>
                        <p className="text-muted-foreground text-sm">{cookie.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={cookieSettings[cookie.key as keyof typeof cookieSettings]}
                      onCheckedChange={() => handleCookieToggle(cookie.key as keyof typeof cookieSettings)}
                      disabled={cookie.required}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button 
                  onClick={saveCookiePreferences}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCookieSettings({
                      essential: true,
                      functional: false,
                      analytics: false,
                      advertising: false
                    })
                  }}
                  className="border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject All Optional
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Managing Cookies */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={settingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={settingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                    <Settings className="h-6 w-6 mr-3 text-primary" />
                    Managing Cookies in Your Browser
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    You can control and delete cookies through your browser settings. Here's how to manage cookies 
                    in the most popular browsers:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        browser: "Google Chrome",
                        steps: [
                          "Click the three dots menu",
                          "Go to Settings > Privacy and security",
                          "Click Cookies and other site data",
                          "Choose your preferred settings"
                        ]
                      },
                      {
                        browser: "Mozilla Firefox",
                        steps: [
                          "Click the hamburger menu",
                          "Go to Settings > Privacy & Security",
                          "Scroll to Cookies and Site Data",
                          "Configure your preferences"
                        ]
                      },
                      {
                        browser: "Safari",
                        steps: [
                          "Go to Safari menu",
                          "Select Preferences",
                          "Click Privacy tab",
                          "Choose cookie settings"
                        ]
                      },
                      {
                        browser: "Microsoft Edge",
                        steps: [
                          "Click the three dots menu",
                          "Go to Settings > Cookies and site permissions",
                          "Click Cookies and site data",
                          "Adjust your settings"
                        ]
                      }
                    ].map((browser, index) => (
                      <div key={index} className="space-y-3">
                        <h4 className="font-semibold text-foreground">{browser.browser}</h4>
                        <ol className="space-y-1 text-muted-foreground text-sm">
                          {browser.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start space-x-2">
                              <span className="text-primary font-semibold">{stepIndex + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={contactRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4 text-center">
                Questions About Our{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Cookie Policy?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                If you have any questions about our use of cookies or this policy, please contact us using the information below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">privacy@b2breviews.com</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Contact Form</h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/contact-us'}
                    className="mt-2"
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
