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
  FileText, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Home,
  Zap,
  MessageSquare,
  Building2,
  Calendar,
  User,
  Lock,
  Globe,
  Settings,
  Mail,
  Phone,
  Scale,
  Gavel,
  Ban,
  Trash2,
  Edit3,
  Eye,
  Key
} from "lucide-react"

export default function TermsOfServicePage() {
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
                <span className="text-xs text-muted-foreground -mt-1">Terms of Service</span>
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
              <Scale className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Terms of
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Service
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Please read these terms carefully before using our B2B Reviews platform. By using our services, you agree to be bound by these terms.
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
              <span className="text-sm text-muted-foreground">Legally Binding Agreement</span>
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
              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <CheckCircle className="h-6 w-6 mr-3 text-primary" />
                      Acceptance of Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      By accessing and using B2B Reviews ("the Service"), you accept and agree to be bound by the terms 
                      and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms of Service ("Terms") govern your use of our website and services operated by B2B Reviews 
                      ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of 
                      and compliance with these Terms.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* User Responsibilities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <User className="h-6 w-6 mr-3 text-primary" />
                      User Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      As a user of our platform, you agree to the following responsibilities:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Provide accurate and truthful information",
                        "Maintain the security of your account credentials",
                        "Comply with all applicable laws and regulations",
                        "Respect the intellectual property rights of others",
                        "Use the service for lawful purposes only",
                        "Report any violations or suspicious activities"
                      ].map((responsibility, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Prohibited Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Ban className="h-6 w-6 mr-3 text-red-500" />
                      Prohibited Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      You may not use our service for any of the following prohibited activities:
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          icon: AlertTriangle,
                          title: "Illegal Activities",
                          description: "Any activities that violate local, state, national, or international laws"
                        },
                        {
                          icon: Shield,
                          title: "Fraudulent Behavior",
                          description: "Creating fake reviews, impersonating others, or providing false information"
                        },
                        {
                          icon: Lock,
                          title: "Security Violations",
                          description: "Attempting to hack, breach, or compromise our systems or user accounts"
                        },
                        {
                          icon: Users,
                          title: "Harassment",
                          description: "Harassing, threatening, or intimidating other users or our staff"
                        },
                        {
                          icon: FileText,
                          title: "Spam and Abuse",
                          description: "Sending unsolicited communications or engaging in spam activities"
                        },
                        {
                          icon: Globe,
                          title: "Intellectual Property",
                          description: "Infringing on copyrights, trademarks, or other intellectual property rights"
                        }
                      ].map((prohibition, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                          <prohibition.icon className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-red-900 dark:text-red-100 text-sm">{prohibition.title}</h4>
                            <p className="text-red-700 dark:text-red-200 text-xs leading-relaxed">{prohibition.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Key className="h-6 w-6 mr-3 text-primary" />
                      Account Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          Account Creation
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>You must be at least 18 years old to create an account</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Provide accurate and complete information</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Maintain one account per person or business</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Keep your account information up to date</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-foreground flex items-center">
                          <Trash2 className="h-5 w-5 mr-2 text-primary" />
                          Account Termination
                        </h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-start space-x-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>You may terminate your account at any time</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>We may suspend or terminate accounts for violations</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>Account termination may result in data loss</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>Some content may remain visible after termination</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Content and Reviews */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-primary" />
                      Content and Reviews
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-foreground">User-Generated Content</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        You retain ownership of content you post, but grant us a license to use, display, and distribute 
                        your content on our platform. You are responsible for ensuring your content does not violate 
                        these terms or infringe on others' rights.
                      </p>
                      
                      <h4 className="text-lg font-semibold text-foreground">Review Guidelines</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          "Reviews must be based on genuine experiences",
                          "No fake, misleading, or fraudulent reviews",
                          "Respectful language and constructive feedback",
                          "No personal attacks or harassment",
                          "Relevant to the service or product reviewed",
                          "Comply with our content moderation policies"
                        ].map((guideline, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{guideline}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-primary" />
                      Limitation of Liability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      To the maximum extent permitted by law, B2B Reviews shall not be liable for any indirect, incidental, 
                      special, consequential, or punitive damages, including without limitation, loss of profits, data, 
                      use, goodwill, or other intangible losses.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">Important Notice</h4>
                          <p className="text-yellow-700 dark:text-yellow-200 text-sm leading-relaxed">
                            Our service is provided "as is" without warranties of any kind. We do not guarantee the 
                            accuracy, completeness, or reliability of any information on our platform.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Governing Law */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Gavel className="h-6 w-6 mr-3 text-primary" />
                      Governing Law and Disputes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of the United States, 
                      without regard to its conflict of law provisions. Any disputes arising from these Terms or your 
                      use of our service shall be resolved through binding arbitration.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Jurisdiction</h4>
                        <p className="text-muted-foreground text-sm">United States Federal Courts</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Dispute Resolution</h4>
                        <p className="text-muted-foreground text-sm">Binding Arbitration</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display font-bold text-foreground flex items-center">
                      <Calendar className="h-6 w-6 mr-3 text-primary" />
                      Changes to Terms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                      we will try to provide at least 30 days notice prior to any new terms taking effect.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. 
                      If you do not agree to the new terms, please stop using the Service.
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
                Questions About These{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Terms?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please contact us using the information below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">legal@b2breviews.com</p>
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
