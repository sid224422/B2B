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
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  Settings, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Home,
  Zap,
  MessageSquare,
  Building2,
  Calendar,
  User,
  Key,
  Trash2,
  Download,
  Edit3
} from "lucide-react"

export default function PrivacyPolicyPage() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const contactRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })

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
                <span className="text-xs text-muted-foreground -mt-1">Privacy Policy</span>
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
              <Shield className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Privacy
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
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-primary" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      B2B Reviews ("we," "our," or "us") is committed to protecting your privacy and personal information. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                      visit our website and use our services.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our platform, you consent to the data practices described in this policy. If you do not 
                      agree with the terms of this Privacy Policy, please do not access or use our services.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Database className="h-6 w-6 mr-3 text-primary" />
                      Information We Collect
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          Personal Information
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Name and contact information (email, phone)</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Company information and job title</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Account credentials and preferences</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Profile information and bio</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-primary" />
                          Usage Information
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>IP address and device information</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Browser type and operating system</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Pages visited and time spent</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Search queries and interactions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Settings className="h-6 w-6 mr-3 text-primary" />
                      How We Use Your Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          icon: Users,
                          title: "Service Provision",
                          description: "To provide and maintain our B2B review platform, process registrations, and deliver requested services."
                        },
                        {
                          icon: Mail,
                          title: "Communication",
                          description: "To send you updates, notifications, and respond to your inquiries and support requests."
                        },
                        {
                          icon: Shield,
                          title: "Security & Safety",
                          description: "To protect against fraud, abuse, and ensure the security of our platform and users."
                        },
                        {
                          icon: Database,
                          title: "Analytics & Improvement",
                          description: "To analyze usage patterns, improve our services, and develop new features."
                        }
                      ].map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Users className="h-6 w-6 mr-3 text-primary" />
                      Information Sharing and Disclosure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We do not sell, trade, or rent your personal information to third parties. We may share your 
                      information only in the following circumstances:
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          icon: CheckCircle,
                          title: "With Your Consent",
                          description: "When you explicitly consent to sharing your information with specific parties."
                        },
                        {
                          icon: Shield,
                          title: "Legal Requirements",
                          description: "When required by law, court order, or to protect our rights and safety."
                        },
                        {
                          icon: Settings,
                          title: "Service Providers",
                          description: "With trusted third-party service providers who assist in operating our platform."
                        },
                        {
                          icon: Building2,
                          title: "Business Transfers",
                          description: "In connection with a merger, acquisition, or sale of business assets."
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                          <item.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Lock className="h-6 w-6 mr-3 text-primary" />
                      Data Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "SSL/TLS encryption for data transmission",
                        "Regular security audits and assessments",
                        "Access controls and authentication systems",
                        "Secure data storage and backup procedures",
                        "Employee training on data protection",
                        "Incident response and breach notification procedures"
                      ].map((measure, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{measure}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Key className="h-6 w-6 mr-3 text-primary" />
                      Your Rights and Choices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      You have certain rights regarding your personal information. You can exercise these rights by 
                      contacting us using the information provided below.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: Eye, title: "Access", description: "Request access to your personal information" },
                        { icon: Edit3, title: "Correction", description: "Request correction of inaccurate information" },
                        { icon: Trash2, title: "Deletion", description: "Request deletion of your personal information" },
                        { icon: Download, title: "Portability", description: "Request a copy of your data in a portable format" },
                        { icon: Settings, title: "Restriction", description: "Request restriction of processing" },
                        { icon: AlertTriangle, title: "Objection", description: "Object to certain types of processing" }
                      ].map((right, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                          <right.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">{right.title}</h4>
                            <p className="text-muted-foreground text-xs">{right.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Settings className="h-6 w-6 mr-3 text-primary" />
                      Cookies and Tracking Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies and similar tracking technologies to enhance your experience on our platform. 
                      For detailed information about our cookie practices, please see our 
                      <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" onClick={() => window.location.href = '/cookie-policy'}>
                        Cookie Policy
                      </Button>.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Changes to Policy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Calendar className="h-6 w-6 mr-3 text-primary" />
                      Changes to This Privacy Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by 
                      posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We encourage you to review this Privacy Policy periodically for any changes. Changes to this 
                      Privacy Policy are effective when they are posted on this page.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
                Questions About This{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Privacy Policy?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or our data practices, please contact us using the information below.
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
