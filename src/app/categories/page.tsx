"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  MessageSquare, 
  Settings, 
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
  MessageCircle
} from "lucide-react"

// Service categories with detailed information
const serviceCategories = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Custom websites, web applications, and e-commerce solutions",
    icon: Code,
    count: "2,500+",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    href: "/categories/web-development",
    features: ["Custom Websites", "Web Applications", "E-commerce", "CMS Development", "API Integration"],
    popularServices: ["React Development", "Node.js", "WordPress", "Shopify", "Laravel"]
  },
  {
    id: "mobile-development",
    name: "Mobile App Development",
    description: "iOS, Android, and cross-platform mobile applications",
    icon: Smartphone,
    count: "900+",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    href: "/categories/mobile-development",
    features: ["iOS Apps", "Android Apps", "React Native", "Flutter", "Progressive Web Apps"],
    popularServices: ["Native iOS", "Native Android", "Cross-platform", "App Store Optimization", "Mobile UI/UX"]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "SEO, social media, PPC, and comprehensive marketing strategies",
    icon: TrendingUp,
    count: "1,800+",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    href: "/categories/digital-marketing",
    features: ["SEO & SEM", "Social Media Marketing", "Content Marketing", "Email Marketing", "Analytics"],
    popularServices: ["Google Ads", "Facebook Marketing", "SEO Services", "Content Strategy", "Marketing Automation"]
  },
  {
    id: "cloud-services",
    name: "Cloud Services",
    description: "Cloud migration, infrastructure, and managed cloud solutions",
    icon: Cloud,
    count: "1,200+",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    href: "/categories/cloud-services",
    features: ["Cloud Migration", "AWS Services", "Azure Solutions", "DevOps", "Infrastructure"],
    popularServices: ["AWS Consulting", "Azure Migration", "Docker & Kubernetes", "CI/CD", "Cloud Security"]
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    description: "Business intelligence, data visualization, and analytics solutions",
    icon: BarChart3,
    count: "700+",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    href: "/categories/data-analytics",
    features: ["Business Intelligence", "Data Visualization", "Machine Learning", "Big Data", "Reporting"],
    popularServices: ["Tableau", "Power BI", "Python Analytics", "SQL Development", "Data Engineering"]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Security audits, penetration testing, and security solutions",
    icon: Shield,
    count: "500+",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-600",
    href: "/categories/cybersecurity",
    features: ["Security Audits", "Penetration Testing", "Compliance", "Risk Assessment", "Security Training"],
    popularServices: ["ISO 27001", "SOC 2", "Penetration Testing", "Security Consulting", "Incident Response"]
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    description: "User interface design, user experience, and design systems",
    icon: Palette,
    count: "600+",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    textColor: "text-pink-600",
    href: "/categories/ui-ux-design",
    features: ["UI Design", "UX Research", "Prototyping", "Design Systems", "User Testing"],
    popularServices: ["Figma Design", "Adobe XD", "Sketch", "User Research", "Design Systems"]
  },
  {
    id: "consulting",
    name: "Business Consulting",
    description: "Strategic consulting, process optimization, and business transformation",
    icon: Users,
    count: "400+",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    textColor: "text-teal-600",
    href: "/categories/consulting",
    features: ["Strategic Planning", "Process Optimization", "Change Management", "Digital Transformation", "Project Management"],
    popularServices: ["Agile Consulting", "Digital Strategy", "Process Improvement", "Change Management", "PMO Services"]
  }
]

export default function CategoriesPage() {
  const heroRef = useRef(null)
  const categoriesRef = useRef(null)
  const statsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" })
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
                <span className="text-xs text-muted-foreground -mt-1">Categories</span>
              </div>
            </motion.button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.button 
                onClick={() => window.location.href = '/companies'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Companies</span>
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/organization'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Users className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Organization</span>
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
              <Target className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Service
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Categories
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Discover B2B service providers across different categories. Find the perfect partner for your business needs.
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
                {serviceCategories.reduce((total, cat) => total + parseInt(cat.count.replace(/[^\d]/g, '')), 0).toLocaleString()}+ Companies
              </Badge>
              <span className="text-sm text-muted-foreground">Across {serviceCategories.length} categories</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Categories Grid */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={categoriesRef}
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Browse by{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Category
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive directory of B2B service providers organized by industry and expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link href={category.href}>
                    <Card className="h-full border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <motion.div 
                            className={`h-12 w-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <category.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <Badge 
                            variant="secondary" 
                            className={`${category.bgColor} ${category.textColor} ${category.borderColor} hover:opacity-80 transition-opacity`}
                          >
                            {category.count}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {category.description}
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Popular Services:</h4>
                          <div className="flex flex-wrap gap-1">
                            {category.popularServices.slice(0, 3).map((service, idx) => (
                              <Badge 
                                key={idx}
                                variant="outline" 
                                className="text-xs px-2 py-1 border-border/30 hover:border-primary/30 transition-colors"
                              >
                                {service}
                              </Badge>
                            ))}
                            {category.popularServices.length > 3 && (
                              <Badge 
                                variant="outline" 
                                className="text-xs px-2 py-1 border-border/30"
                              >
                                +{category.popularServices.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm text-muted-foreground">View Companies</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
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
                Platform{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Statistics
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of businesses already using our platform to find and connect with service providers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Building2, label: "Total Companies", value: "8,000+", color: "text-primary", change: "+15%" },
                { icon: Star, label: "Average Rating", value: "4.7", color: "text-yellow-500", change: "+0.3" },
                { icon: MessageSquare, label: "Reviews Written", value: "25,000+", color: "text-green-500", change: "+28%" },
                { icon: Users, label: "Active Users", value: "12,000+", color: "text-blue-500", change: "+22%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
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
                Can't Find What You're{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Looking For?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our search functionality to find specific companies or services, or contact us for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/companies'}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Companies
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/contact-us'}
                  className="border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Recommendations
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}
