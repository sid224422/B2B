"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  MessageSquare, 
  Settings, 
  Phone, 
  Clock, 
  ArrowRight, 
  Home,
  Zap,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Star,
  Calendar,
  FileText,
  BarChart3,
  Target,
  Edit3,
  Save,
  Upload,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Laptop,
  PenTool,
  PlusCircle,
  ArrowUpRight,
  Briefcase,
  Code,
  MessageCircle
} from "lucide-react"

export default function OrganizationPage() {
  const heroRef = useRef(null)
  const actionsRef = useRef(null)
  const statsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const actionsInView = useInView(actionsRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

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
                <span className="text-xs text-muted-foreground -mt-1">Organization</span>
              </div>
            </motion.button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.button 
                onClick={() => window.location.href = '/dashboard/listing-success'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Dashboard</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/contact-us'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Contact Us</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/settings'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Settings className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Settings</span>
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
              <Building2 className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Organization
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Hub
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Manage your business presence, list your services, and engage with customers all in one place.
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
                Active Organization
              </Badge>
              <span className="text-sm text-muted-foreground">Last updated: 2 hours ago</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Main Actions Section */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={actionsRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={actionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={actionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                What would you like to{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  do?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from the options below to manage your business presence and engage with customers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* List Your Company */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={actionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="h-full border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 cursor-pointer group"
                  onClick={() => window.location.href = '/list-company'}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="h-20 w-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Building2 className="h-10 w-10 text-primary-foreground" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">List Your Company</h3>
                    <p className="text-muted-foreground mb-6">
                      Create a comprehensive business profile to showcase your services, team, and expertise to potential clients.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Company information</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Service descriptions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Contact details</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Get Started
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* List Your Software */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={actionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="h-full border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 cursor-pointer group"
                  onClick={() => window.location.href = '/list-software'}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="h-20 w-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Laptop className="h-10 w-10 text-accent-foreground" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">List Your Software</h3>
                    <p className="text-muted-foreground mb-6">
                      Showcase your software solution with detailed features, pricing, and technical specifications for potential users.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Feature descriptions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Pricing models</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Technical specs</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300">
                      <Code className="h-4 w-4 mr-2" />
                      Get Started
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Write a Review */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={actionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  className="h-full border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 cursor-pointer group"
                  onClick={() => window.location.href = '/write-review'}
                >
                  <CardContent className="p-8 text-center">
                    <motion.div 
                      className="h-20 w-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PenTool className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-4">Write a Review</h3>
                    <p className="text-muted-foreground mb-6">
                      Share your experience with a business service provider to help others make informed decisions.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Rate your experience</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Share detailed feedback</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Help other businesses</span>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:shadow-green-600/25 transition-all duration-300">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Write Review
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={statsRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Impact
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track your organization's performance and engagement on our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Eye, label: "Profile Views", value: "2.4K", color: "text-primary", change: "+12%" },
                { icon: Star, label: "Average Rating", value: "4.8", color: "text-yellow-500", change: "+0.2" },
                { icon: MessageCircle, label: "Total Reviews", value: "47", color: "text-green-600", change: "+5" },
                { icon: TrendingUp, label: "Growth Rate", value: "18%", color: "text-blue-600", change: "+3%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium mb-1">{stat.label}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Quick Actions */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Quick{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Actions
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access your most frequently used features and tools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BarChart3, label: "Analytics", href: "/dashboard/listing-success", color: "text-primary" },
                { icon: MessageSquare, label: "Messages", href: "/contact-us", color: "text-blue-600" },
                { icon: Settings, label: "Settings", href: "/settings", color: "text-gray-600" },
                { icon: Download, label: "Export Data", href: "#", color: "text-green-600" }
              ].map((action, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.button
                    onClick={() => window.location.href = action.href}
                    className="w-full p-6 bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className={`h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                    </motion.div>
                    <p className="text-sm font-medium text-foreground">{action.label}</p>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Footer CTA */}
      <Section className="py-16 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Need{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Help?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our support team is here to help you make the most of your organization's presence on our platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/contact-us'}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/settings'}
                  className="border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}