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
  Building2, 
  Plus, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Home,
  Zap,
  Sparkles,
  Save,
  Edit3,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Users,
  Star,
  BarChart3,
  Target,
  Calendar,
  FileText,
  Headphones,
  MessageCircle,
  HelpCircle,
  BookOpen,
  Video,
  Mic,
  Search,
  Filter,
  ExternalLink,
  Copy,
  Share2,
  QrCode,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Laptop,
  Settings,
  MessageSquare,
  Shield,
  TrendingUp,
  Award,
  Briefcase,
  DollarSign,
  Tag,
  Image,
  Link,
  FileImage,
  Camera,
  X
} from "lucide-react"

export default function ListCompanyPage() {
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const benefitsRef = useRef(null)
  const processRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })

  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    // Basic Information
    companyName: '',
    industry: '',
    website: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Business Details
    description: '',
    foundedYear: '',
    employees: '',
    revenue: '',
    services: '',
    
    // Additional Information
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    certifications: '',
    awards: '',
    
    // Contact Information
    contactPerson: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: ''
  })

  const [uploadedImages, setUploadedImages] = React.useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setUploadedImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Redirect to success page
    window.location.href = '/dashboard/listing-success'
  }

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Company details and contact info' },
    { number: 2, title: 'Business Details', description: 'Services, description, and metrics' },
    { number: 3, title: 'Media & Assets', description: 'Images, logos, and documents' },
    { number: 4, title: 'Review & Submit', description: 'Final review and submission' }
  ]

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
                <span className="text-xs text-muted-foreground -mt-1">List Your Company</span>
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
              <Building2 className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                List Your
              </span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Company
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join thousands of businesses already listed on B2B Reviews. Get discovered by potential clients and grow your business.
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
                <CheckCircle className="h-4 w-4 mr-2" />
                Free to List
              </Badge>
              <span className="text-sm text-muted-foreground">Approval within 24-48 hours</span>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={benefitsRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                Why List Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Company?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the benefits of listing your business on our platform.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Increased Visibility",
                  description: "Get discovered by thousands of potential clients searching for your services.",
                  color: "text-primary",
                  bgColor: "bg-primary/10"
                },
                {
                  icon: Star,
                  title: "Build Trust",
                  description: "Showcase customer reviews and ratings to build credibility and trust.",
                  color: "text-yellow-500",
                  bgColor: "bg-yellow-100"
                },
                {
                  icon: TrendingUp,
                  title: "Grow Your Business",
                  description: "Connect with qualified leads and grow your customer base.",
                  color: "text-green-600",
                  bgColor: "bg-green-100"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`h-20 w-20 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <benefit.icon className={`h-10 w-10 ${benefit.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Form Section */}
      <Section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <Container>
          <motion.div 
            ref={formRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {/* Progress Steps */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border/50 text-muted-foreground'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-primary' : 'bg-border/50'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-2 border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-display font-bold text-foreground flex items-center justify-center">
                    <Building2 className="h-8 w-8 mr-3 text-primary" />
                    {steps[currentStep - 1].title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    {steps[currentStep - 1].description}
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Company Name *</label>
                            <Input 
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleInputChange}
                              placeholder="Enter your company name"
                              className="border-border/50 focus:border-primary/50"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Industry *</label>
                            <select 
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-border/50 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                              required
                            >
                              <option value="">Select Industry</option>
                              <option value="technology">Technology</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="finance">Finance</option>
                              <option value="education">Education</option>
                              <option value="retail">Retail</option>
                              <option value="manufacturing">Manufacturing</option>
                              <option value="consulting">Consulting</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                            <Input 
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              placeholder="https://yourcompany.com"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                            <Input 
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="contact@yourcompany.com"
                              className="border-border/50 focus:border-primary/50"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                          <Input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 123-4567"
                            className="border-border/50 focus:border-primary/50"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">City</label>
                            <Input 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">State</label>
                            <Input 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="State"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">ZIP Code</label>
                            <Input 
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              placeholder="12345"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Business Details */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Company Description *</label>
                          <Textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your company, services, and what makes you unique..."
                            className="border-border/50 focus:border-primary/50 min-h-[120px]"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Founded Year</label>
                            <Input 
                              name="foundedYear"
                              value={formData.foundedYear}
                              onChange={handleInputChange}
                              placeholder="2020"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Number of Employees</label>
                            <select 
                              name="employees"
                              value={formData.employees}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-border/50 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                            >
                              <option value="">Select Range</option>
                              <option value="1-10">1-10</option>
                              <option value="11-50">11-50</option>
                              <option value="51-200">51-200</option>
                              <option value="201-500">201-500</option>
                              <option value="500+">500+</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Annual Revenue</label>
                            <select 
                              name="revenue"
                              value={formData.revenue}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-border/50 rounded-md focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background"
                            >
                              <option value="">Select Range</option>
                              <option value="0-100k">$0 - $100K</option>
                              <option value="100k-500k">$100K - $500K</option>
                              <option value="500k-1m">$500K - $1M</option>
                              <option value="1m-5m">$1M - $5M</option>
                              <option value="5m+">$5M+</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Services Offered</label>
                          <Textarea 
                            name="services"
                            value={formData.services}
                            onChange={handleInputChange}
                            placeholder="List your main services and offerings..."
                            className="border-border/50 focus:border-primary/50 min-h-[100px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Media & Assets */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Company Images</label>
                          <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
                            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-2">Upload company images, logos, and photos</p>
                            <p className="text-sm text-muted-foreground mb-4">PNG, JPG up to 10MB each</p>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('image-upload')?.click()}
                              className="border-primary/30 text-primary hover:bg-primary/10"
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              Choose Images
                            </Button>
                          </div>
                          
                          {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              {uploadedImages.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">LinkedIn URL</label>
                            <Input 
                              name="socialMedia.linkedin"
                              value={formData.socialMedia.linkedin}
                              onChange={handleInputChange}
                              placeholder="https://linkedin.com/company/yourcompany"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Twitter URL</label>
                            <Input 
                              name="socialMedia.twitter"
                              value={formData.socialMedia.twitter}
                              onChange={handleInputChange}
                              placeholder="https://twitter.com/yourcompany"
                              className="border-border/50 focus:border-primary/50"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Certifications & Awards</label>
                          <Textarea 
                            name="certifications"
                            value={formData.certifications}
                            onChange={handleInputChange}
                            placeholder="List any certifications, awards, or recognitions..."
                            className="border-border/50 focus:border-primary/50 min-h-[100px]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Review & Submit */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                            Review Your Information
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Company Name:</span>
                              <span className="font-medium">{formData.companyName || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Industry:</span>
                              <span className="font-medium">{formData.industry || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Email:</span>
                              <span className="font-medium">{formData.email || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Website:</span>
                              <span className="font-medium">{formData.website || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Images Uploaded:</span>
                              <span className="font-medium">{uploadedImages.length} images</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-2">Terms & Conditions</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            By submitting this form, you agree to our terms of service and privacy policy. 
                            Your listing will be reviewed and approved within 24-48 hours.
                          </p>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="terms" required className="rounded" />
                            <label htmlFor="terms" className="text-sm text-foreground">
                              I agree to the terms and conditions
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="border-border/50 hover:border-primary/30 hover:bg-primary/5"
                      >
                        Previous
                      </Button>
                      
                      {currentStep < 4 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                        >
                          Next Step
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Submit Listing
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <Container>
          <motion.div 
            ref={processRef}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold mb-4">
                How It{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Works
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Simple steps to get your business listed and visible to potential clients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { 
                  icon: FileText, 
                  title: "Submit Information", 
                  description: "Fill out the form with your company details and information.",
                  color: "text-primary",
                  bgColor: "bg-primary/10"
                },
                { 
                  icon: Clock, 
                  title: "Review Process", 
                  description: "Our team reviews your listing within 24-48 hours.",
                  color: "text-blue-600",
                  bgColor: "bg-blue-100"
                },
                { 
                  icon: CheckCircle, 
                  title: "Get Approved", 
                  description: "Receive approval notification and your listing goes live.",
                  color: "text-green-600",
                  bgColor: "bg-green-100"
                },
                { 
                  icon: TrendingUp, 
                  title: "Start Growing", 
                  description: "Begin receiving inquiries and growing your business.",
                  color: "text-purple-600",
                  bgColor: "bg-purple-100"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`h-16 w-16 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
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
            animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-card/60 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of businesses already listed on our platform. Start your listing today!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.href = '/contact-us'}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Need Help?
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="border-2 border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}


