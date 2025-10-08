"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CompanyCard } from "@/components/app/company-card"
import { 
  Building2, 
  MessageSquare, 
  Home,
  Zap,
  CheckCircle,
  ArrowRight,
  Code,
  Smartphone,
  TrendingUp,
  Shield,
  Database,
  Cloud,
  Palette,
  Search,
  BarChart3,
  Users,
  Globe,
  FileText,
  Headphones,
  Target,
  Star,
  Eye,
  MessageCircle,
  Filter,
  SortAsc,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react"
import { mockCompanies } from "@/lib/data/mock"
import { Company } from "@/lib/types"

// Category definitions
const categoryData = {
  "web-development": {
    name: "Web Development",
    description: "Custom websites, web applications, and e-commerce solutions",
    icon: Code,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    features: ["Custom Websites", "Web Applications", "E-commerce", "CMS Development", "API Integration"],
    popularServices: ["React Development", "Node.js", "WordPress", "Shopify", "Laravel"]
  },
  "mobile-development": {
    name: "Mobile App Development",
    description: "iOS, Android, and cross-platform mobile applications",
    icon: Smartphone,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    features: ["iOS Apps", "Android Apps", "React Native", "Flutter", "Progressive Web Apps"],
    popularServices: ["Native iOS", "Native Android", "Cross-platform", "App Store Optimization", "Mobile UI/UX"]
  },
  "digital-marketing": {
    name: "Digital Marketing",
    description: "SEO, social media, PPC, and comprehensive marketing strategies",
    icon: TrendingUp,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    features: ["SEO & SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics"],
    popularServices: ["Google Ads", "Facebook Marketing", "SEO Services", "Content Strategy", "Marketing Automation"]
  },
  "cloud-services": {
    name: "Cloud Services",
    description: "Cloud migration, infrastructure, and managed cloud solutions",
    icon: Cloud,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    features: ["Cloud Migration", "AWS Services", "Azure Solutions", "DevOps", "Infrastructure"],
    popularServices: ["AWS Consulting", "Azure Migration", "Docker & Kubernetes", "CI/CD", "Cloud Security"]
  },
  "data-analytics": {
    name: "Data Analytics",
    description: "Business intelligence, data visualization, and analytics solutions",
    icon: BarChart3,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    features: ["Business Intelligence", "Data Visualization", "Machine Learning", "Big Data", "Reporting"],
    popularServices: ["Tableau", "Power BI", "Python Analytics", "SQL Development", "Data Engineering"]
  },
  "cybersecurity": {
    name: "Cybersecurity",
    description: "Security audits, penetration testing, and security solutions",
    icon: Shield,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment", "Security Training"],
    popularServices: ["ISO 27001", "SOC 2", "Penetration Testing", "Security Consulting", "Incident Response"]
  },
  "ui-ux-design": {
    name: "UI/UX Design",
    description: "User interface design, user experience, and design systems",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-600",
    features: ["UI Design", "UX Research", "Prototyping", "Design Systems", "User Testing"],
    popularServices: ["Figma Design", "Adobe XD", "Sketch", "User Research", "Design Systems"]
  },
  "consulting": {
    name: "Business Consulting",
    description: "Strategic consulting, process optimization, and business transformation",
    icon: Users,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    features: ["Strategic Planning", "Process Optimization", "Change Management", "Digital Transformation", "Project Management"],
    popularServices: ["Agile Consulting", "Digital Strategy", "Process Improvement", "Change Management", "PMO Services"]
  }
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.categoryId as string
  
  const heroRef = useRef(null)
  const companiesRef = useRef(null)
  const filtersRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const companiesInView = useInView(companiesRef, { once: true, margin: "-100px" })
  const filtersInView = useInView(filtersRef, { once: true, margin: "-100px" })

  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortBy, setSortBy] = React.useState("rating")
  const [filterBy, setFilterBy] = React.useState("all")

  // Get category data
  const category = categoryData[categoryId as keyof typeof categoryData]
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = '/categories'}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
        </div>
      </div>
    )
  }

  // Filter companies based on category and search
  const filteredCompanies = React.useMemo(() => {
    let companies = mockCompanies.filter(company => 
      company.services.some(service => 
        service.toLowerCase().includes(category.name.toLowerCase()) ||
        category.popularServices.some(popular => 
          service.toLowerCase().includes(popular.toLowerCase())
        )
      )
    )

    // Apply search filter
    if (searchTerm) {
      companies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply sorting
    companies.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviewCount - a.reviewCount
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return companies
  }, [category, searchTerm, sortBy])

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
                <span className="text-xs text-muted-foreground -mt-1">{category.name}</span>
              </div>
            </motion.button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.button 
                onClick={() => window.location.href = '/categories'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">All Categories</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/companies'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">All Companies</span>
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
                Home
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
              <category.icon className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {category.name}
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Companies
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {category.description}
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
                {filteredCompanies.length} Companies Found
              </Badge>
              <span className="text-sm text-muted-foreground">Verified & Reviewed</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Filters Section */}
      <Section className="py-8 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={filtersRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={filtersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border/50 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="reviews">Sort by Reviews</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Companies Grid */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={companiesRef}
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {filteredCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CompanyCard company={company} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="max-w-md mx-auto">
                  <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Companies Found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any companies matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSortBy("rating")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </Container>
      </Section>

      {/* Category Features */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Popular{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Common services offered by {category.name.toLowerCase()} companies.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.popularServices.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={companiesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Badge 
                        variant="outline" 
                        className={`${category.bgColor} ${category.textColor} ${category.borderColor} hover:opacity-80 transition-opacity`}
                      >
                        {service}
                      </Badge>
                    </CardContent>
                  </Card>
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
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Need More{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Options?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Browse other categories or use our advanced search to find the perfect service provider for your needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/categories'}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Browse All Categories
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/companies'}
                  className="border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  View All Companies
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
