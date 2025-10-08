"use client"

import * as React from "react"
import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { 
  Search, 
  Phone, 
  Edit3, 
  Star, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Clock,
  Shield,
  Users,
  TrendingUp,
  Zap,
  Target,
  CheckCircle
} from "lucide-react"

interface Company {
  id: string
  name: string
  category: string
  rating: number
  reviewCount: number
  logo: string
  description: string
}

// Mock companies data for search
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    category: "Web Development",
    rating: 4.8,
    reviewCount: 127,
    logo: "/api/placeholder/60/60",
    description: "Leading web development company specializing in modern applications"
  },
  {
    id: "2", 
    name: "DataFlow Analytics",
    category: "Data Analytics",
    rating: 4.6,
    reviewCount: 89,
    logo: "/api/placeholder/60/60",
    description: "Advanced data analytics and business intelligence solutions"
  },
  {
    id: "3",
    name: "CloudScale Systems",
    category: "Cloud Solutions",
    rating: 4.9,
    reviewCount: 203,
    logo: "/api/placeholder/60/60",
    description: "Enterprise cloud infrastructure and migration services"
  },
  {
    id: "4",
    name: "SecureNet Pro",
    category: "Cybersecurity",
    rating: 4.7,
    reviewCount: 156,
    logo: "/api/placeholder/60/60",
    description: "Comprehensive cybersecurity solutions for businesses"
  },
  {
    id: "5",
    name: "MobileFirst Apps",
    category: "Mobile Development",
    rating: 4.5,
    reviewCount: 94,
    logo: "/api/placeholder/60/60",
    description: "Native and cross-platform mobile application development"
  }
]

export default function WriteReviewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Company[]>([])
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showResults, setShowResults] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const filtered = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        company.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company)
    setSearchQuery(company.name)
    setShowResults(false)
  }

  const handleTelephonicReview = () => {
    if (selectedCompany) {
      alert(`Scheduling a call to review ${selectedCompany.name}. This feature will be implemented soon!`)
    } else {
      alert("Please select a company first!")
    }
  }

  const handleOnlineReview = () => {
    if (selectedCompany) {
      // Navigate to detailed review form
      window.location.href = `/write-review/${selectedCompany.id}`
    } else {
      alert("Please select a company first!")
    }
  }

  const heroRef = useRef(null)
  const searchRef = useRef(null)
  const statsRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const searchInView = useInView(searchRef, { once: true })
  const statsInView = useInView(statsRef, { once: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Minimal Header */}
      <header className="bg-background/95 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="flex items-center justify-between h-16">
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
                <span className="text-xs text-muted-foreground font-medium -mt-1">
                  Share Your Experience
                </span>
              </div>
            </motion.button>
            
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </Container>
      </header>

      <main>
        {/* Hero Section */}
        <Section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
          {/* Background Elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{ 
              background: [
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <Container className="relative z-10">
            <motion.div 
              ref={heroRef}
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Share Your Experience</span>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-8 w-8 mr-3 text-white" />
                </motion.div>
                <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                  Write a Review
                </h1>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="h-8 w-8 ml-3 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your review will help other buyers to choose the best service providers for their business
              </motion.p>
              
              {/* Stats */}
              <motion.div 
                ref={statsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { icon: Users, value: "50,000+", label: "Reviews Written", color: "text-yellow-300" },
                  { icon: TrendingUp, value: "10,000+", label: "Companies Listed", color: "text-green-300" },
                  { icon: Shield, value: "100%", label: "Verified Reviews", color: "text-blue-300" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 group hover:bg-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`h-8 w-8 mx-auto mb-3 ${stat.color}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="h-8 w-8" />
                    </motion.div>
                    <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Search Section */}
        <Section className="py-12 bg-gradient-to-br from-background to-muted/30">
          <Container>
            <motion.div 
              ref={searchRef}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-display font-bold mb-4">
                  Which{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    company/software
                  </span>{" "}
                  are you reviewing?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Search for the company or software you want to review
                </p>
              </motion.div>

              {/* Search Input */}
              <motion.div 
                className="relative max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    animate={{ 
                      scale: searchQuery ? 1.1 : 1,
                      rotate: searchQuery ? 5 : 0 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                  <Input
                    type="text"
                    placeholder="Search for the Company / Software"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-2 border-border/50 rounded-xl focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                  />
                </div>

                {/* Search Results */}
                {showResults && searchResults.length > 0 && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto backdrop-blur-xl"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {searchResults.map((company, index) => (
                      <motion.div
                        key={company.id}
                        onClick={() => handleCompanySelect(company)}
                        className="p-4 hover:bg-muted/50 cursor-pointer border-b border-border/50 last:border-b-0 transition-all duration-200 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className="h-12 w-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/25 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <span className="text-primary-foreground font-bold text-sm">
                              {company.name.charAt(0)}
                            </span>
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{company.name}</h3>
                            <p className="text-sm text-muted-foreground">{company.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 transition-colors duration-200 ${
                                      i < Math.floor(company.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {company.rating} ({company.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <Sparkles className="h-4 w-4 text-primary" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {showResults && searchResults.length === 0 && searchQuery.length > 2 && (
                  <motion.div 
                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/50 rounded-xl shadow-xl z-50 p-4 backdrop-blur-xl"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-muted-foreground text-center">No companies found matching your search.</p>
                  </motion.div>
                )}

              {/* Selected Company */}
              {selectedCompany && (
                <motion.div 
                  className="max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="h-16 w-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-primary-foreground font-bold text-lg">
                            {selectedCompany.name.charAt(0)}
                          </span>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-bold text-foreground">{selectedCompany.name}</h3>
                          <p className="text-muted-foreground">{selectedCompany.category}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(selectedCompany.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {selectedCompany.rating} ({selectedCompany.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Selected
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Review Options */}
        <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
          <Container>
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-4xl font-display font-bold mb-4">
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Review Method
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Select how you'd like to share your experience
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Telephonic Review Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <motion.div 
                          className="h-20 w-20 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Phone className="h-10 w-10 text-primary-foreground" />
                        </motion.div>
                        <h3 className="text-2xl font-display font-bold text-foreground mb-4">Telephonic Review</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Share your review over a quick phone call, and we'll write it up for you. 
                          Perfect for detailed feedback and complex experiences.
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>15-20 minutes call</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span>We write the review for you</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>Verified and authentic</span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleTelephonicReview}
                        size="lg" 
                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
                      >
                        <Phone className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Schedule a Call
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Online Review Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-accent/30 bg-card/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <motion.div 
                          className="h-20 w-20 bg-gradient-to-r from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Edit3 className="h-10 w-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-display font-bold text-foreground mb-4">Submit Online</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          Share your experience of working with any company/software. 
                          Write your own detailed review at your own pace.
                        </p>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <Edit3 className="h-4 w-4" />
                          <span>Write at your own pace</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>Rate multiple aspects</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                          <Shield className="h-4 w-4" />
                          <span>Your review, your words</span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleOnlineReview}
                        variant="outline"
                        size="lg" 
                        className="w-full border-2 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 font-semibold py-4 rounded-xl transition-all duration-300 group"
                      >
                        <Edit3 className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Write a Review
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Additional Info */}
              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    Why Your{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      Review Matters
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Users, title: "Help Others", description: "Your experience helps other businesses make informed decisions", color: "text-primary" },
                      { icon: TrendingUp, title: "Build Trust", description: "Authentic reviews build trust in the B2B marketplace", color: "text-green-600" },
                      { icon: Shield, title: "Verified Quality", description: "All reviews are verified to ensure authenticity", color: "text-blue-600" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="text-center group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={searchInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className={`h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-all duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                        </motion.div>
                        <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
    </div>
  )
}
