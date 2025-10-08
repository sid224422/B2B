"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Home,
  Zap,
  Sparkles,
  Send,
  CheckCircle,
  Users,
  Shield,
  Star,
  Calendar,
  FileText,
  BarChart3,
  Target,
  Building2,
  Settings,
  Globe,
  ExternalLink,
  Eye,
  EyeOff,
  AlertCircle,
  Plus,
  Trash2,
  Search,
  Filter,
  Download,
  Headphones,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Video,
  Mic
} from "lucide-react"

export default function ContactUsPage() {
  const heroRef = useRef(null)
  const contactRef = useRef(null)
  const faqRef = useRef(null)
  const supportRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })
  const supportInView = useInView(supportRef, { once: true, margin: "-100px" })

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
                <span className="text-xs text-muted-foreground -mt-1">Contact Us</span>
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
                onClick={() => window.location.href = '/organization'}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                whileHover={{ x: 2 }}
              >
                <Building2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Organization</span>
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
              <MessageSquare className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Get in
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              We're here to help! Reach out to our support team for any questions, concerns, or assistance you might need.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Badge 
                variant="secondary" 
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 px-4 py-2 text-sm font-medium"
              >
                <Clock className="h-4 w-4 mr-2" />
                Response Time: 24 hours
              </Badge>
              <span className="text-sm text-muted-foreground">Monday - Friday, 9 AM - 6 PM EST</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={contactRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Contact{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Methods
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the most convenient way to reach us. We're available through multiple channels.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Mail,
                  title: "Email Support",
                  description: "Send us an email and we'll get back to you within 24 hours.",
                  contact: "support@b2breviews.com",
                  color: "text-primary",
                  bgColor: "bg-primary/10"
                },
                {
                  icon: Phone,
                  title: "Phone Support",
                  description: "Call us directly for immediate assistance during business hours.",
                  contact: "+1 (555) 123-4567",
                  color: "text-green-600",
                  bgColor: "bg-green-100"
                },
                {
                  icon: MessageCircle,
                  title: "Live Chat",
                  description: "Chat with our support team in real-time for quick help.",
                  contact: "Available 9 AM - 6 PM EST",
                  color: "text-blue-600",
                  bgColor: "bg-blue-100"
                }
              ].map((method, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`h-20 w-20 ${method.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <method.icon className={`h-10 w-10 ${method.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <p className="text-sm font-medium text-primary">{method.contact}</p>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-display font-bold text-foreground flex items-center justify-center">
                    <Send className="h-8 w-8 mr-3 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Full Name *</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Email Address *</label>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="border-border/50 focus:border-primary/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                        <Input 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                          className="border-border/50 focus:border-primary/50"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Inquiry Type</label>
                        <select 
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border/50 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Subject *</label>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Enter the subject of your message"
                        className="border-border/50 focus:border-primary/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Message *</label>
                      <Textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter your message here..."
                        className="border-border/50 focus:border-primary/50 min-h-[150px]"
                        required
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 px-8 py-3"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={faqRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to common questions about our platform and services.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "How long does it take to get my listing approved?",
                  answer: "Our team typically reviews and approves listings within 24-48 hours during business days. You'll receive an email notification once your listing is live."
                },
                {
                  question: "Can I edit my listing after it's been approved?",
                  answer: "Yes! You can edit your listing at any time through your organization dashboard. Changes will be reviewed and updated within 24 hours."
                },
                {
                  question: "What information do I need to provide for my listing?",
                  answer: "We require basic company information including name, industry, website, contact details, and a brief description. Additional details like services, pricing, and case studies are optional but recommended."
                },
                {
                  question: "How do I respond to customer reviews?",
                  answer: "You can respond to reviews directly from your organization dashboard. Simply click on the review and use the 'Respond' button to add your response."
                },
                {
                  question: "Is there a cost to list my business?",
                  answer: "Basic listings are free! We also offer premium features and enhanced visibility options for businesses looking to maximize their reach."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-3 text-primary" />
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Support Resources */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={supportRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Support{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Resources
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive support resources to get the most out of our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Documentation",
                  description: "Comprehensive guides and tutorials",
                  color: "text-primary",
                  bgColor: "bg-primary/10"
                },
                {
                  icon: Video,
                  title: "Video Tutorials",
                  description: "Step-by-step video guides",
                  color: "text-green-600",
                  bgColor: "bg-green-100"
                },
                {
                  icon: Headphones,
                  title: "Webinars",
                  description: "Live training sessions",
                  color: "text-blue-600",
                  bgColor: "bg-blue-100"
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with other users",
                  color: "text-purple-600",
                  bgColor: "bg-purple-100"
                }
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`h-16 w-16 ${resource.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <resource.icon className={`h-8 w-8 ${resource.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
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
            animate={supportInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Still Need{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Help?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/organization'}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Organization Dashboard
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