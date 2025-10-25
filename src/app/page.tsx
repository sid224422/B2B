"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Star, Users, Shield, TrendingUp, Zap, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SearchBar } from "@/components/app/search-bar"
import { CompanyCard } from "@/components/app/company-card"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { mockCompanies } from "@/lib/data/mock"
import { Company } from "@/lib/types"

// Categories for the hero section
const categories = [
  { name: "Web Development", count: "2,500+", href: "/categories/web-development" },
  { name: "Digital Marketing", count: "1,800+", href: "/categories/digital-marketing" },
  { name: "Cloud Services", count: "1,200+", href: "/categories/cloud-services" },
  { name: "Mobile Apps", count: "900+", href: "/categories/mobile-development" },
  { name: "Data Analytics", count: "700+", href: "/categories/data-analytics" },
  { name: "Cybersecurity", count: "500+", href: "/categories/cybersecurity" },
]

// Features for the features section
const features = [
  {
    icon: <Star className="h-6 w-6" />,
    title: "Verified Reviews",
    description: "All reviews are verified and come from real customers who have worked with these companies.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community Driven",
    description: "Join thousands of businesses sharing their experiences to help others make informed decisions.",
    color: "from-blue-400 to-purple-500"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Trusted Platform",
    description: "Our platform ensures authenticity and prevents fake reviews through rigorous verification processes.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Data Insights",
    description: "Get detailed insights, ratings, and comparisons to find the perfect service provider for your needs.",
    color: "from-purple-400 to-pink-500"
  }
]

// Stats for the stats section
const stats = [
  { label: "Companies Listed", value: "10,000+" },
  { label: "Reviews Written", value: "50,000+" },
  { label: "Happy Customers", value: "100,000+" },
  { label: "Countries Covered", value: "50+" },
]

export default function HomePage() {
  // Use mock data for now - memoize to prevent hydration mismatches
  const topRatedCompanies = React.useMemo(() => {
    return [...mockCompanies]
      .sort((a, b) => {
        // Stable sort: if ratings are equal, sort by id
        if (b.rating === a.rating) {
          return a.id.localeCompare(b.id)
        }
        return b.rating - a.rating
      })
      .slice(0, 6)
  }, [])
  
  const latestCompanies = React.useMemo(() => {
    return [...mockCompanies]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || '').getTime()
        const dateB = new Date(b.createdAt || '').getTime()
        // Stable sort: if dates are equal, sort by id
        if (dateB === dateA) {
          return a.id.localeCompare(b.id)
        }
        return dateB - dateA
      })
      .slice(0, 6)
  }, [])

  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const companiesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const statsInView = useInView(statsRef, { once: true })
  const featuresInView = useInView(featuresRef, { once: true })
  const companiesInView = useInView(companiesRef, { once: true })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <Container>
          <motion.div 
            ref={heroRef}
            className="text-center max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 10,000+ Companies</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Find the Best{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                B2B Services
              </span>{" "}
              for Your Business
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, compare, and choose from thousands of verified B2B service providers. 
              Read authentic reviews from real customers and make informed decisions.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <SearchBar placeholder="Search companies, services, industries..." />
            </motion.div>

            {/* Categories */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Link href={category.href}>
                    <Badge 
                      variant="outline" 
                      className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 border-primary/20"
                    >
                      {category.name} ({category.count})
                    </Badge>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                variant="glow"
                onClick={() => window.location.href = '/companies'}
                className="group w-full sm:w-auto"
              >
                <Target className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                Browse Companies
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.href = '/write-review'}
                className="group w-full sm:w-auto"
              >
                <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                Share Experience
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gradient-to-r from-muted/30 to-muted/50">
        <Container>
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0.8 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Top Rated Companies */}
      <Section>
        <Container>
          <motion.div 
            ref={companiesRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Top Rated{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Companies
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Discover the highest-rated B2B service providers based on authentic customer reviews.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            suppressHydrationWarning
          >
            {topRatedCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                suppressHydrationWarning
              >
                <CompanyCard key={company.id} company={company} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={companiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              variant="glow"
              onClick={() => window.location.href = '/companies?sort=rating_desc'}
              className="group"
            >
              View All Top Rated Companies
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={featuresRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                B2B Reviews
              </span>
              ?
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We provide the tools and insights you need to make the best decisions for your business.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="text-center group h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                  <CardHeader>
                    <motion.div 
                      className={`mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Latest Companies */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recently Added Companies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out the newest companies that have joined our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <div className="text-center">
            <Button onClick={() => window.location.href = '/companies?sort=newest'}>
              View All Latest Companies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
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
        
        <Container>
          <motion.div 
            className="text-center max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Find Your Perfect{" "}
              <span className="text-white/90">B2B Partner</span>?
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join thousands of businesses who have found their ideal service providers through our platform.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => window.location.href = '/companies'}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white hover:text-white"
              >
                <Target className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                Start Searching
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-primary group" 
                onClick={() => window.location.href = '/write-review'}
              >
                <Sparkles className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                Share Your Experience
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}