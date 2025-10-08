"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { 
  ArrowLeft, 
  Star, 
  Send, 
  CheckCircle,
  Clock,
  DollarSign,
  MessageSquare,
  Award,
  TrendingUp,
  Sparkles,
  Zap,
  Shield,
  Users
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

// Mock company data
const mockCompany: Company = {
  id: "1",
  name: "TechCorp Solutions",
  category: "Web Development",
  rating: 4.8,
  reviewCount: 127,
  logo: "/api/placeholder/60/60",
  description: "Leading web development company specializing in modern applications"
}

interface ReviewFormData {
  overallRating: number
  title: string
  content: string
  projectType: string
  projectBudget: string
  projectDuration: string
  communicationRating: number
  qualityRating: number
  timelineRating: number
  valueRating: number
  wouldRecommend: string
  reviewerName: string
  reviewerEmail: string
  reviewerCompany: string
  reviewerRole: string
}

export default function WriteReviewPage({ params }: { params: Promise<{ companyId: string }> }) {
  const [formData, setFormData] = useState<ReviewFormData>({
    overallRating: 0,
    title: "",
    content: "",
    projectType: "",
    projectBudget: "",
    projectDuration: "",
    communicationRating: 0,
    qualityRating: 0,
    timelineRating: 0,
    valueRating: 0,
    wouldRecommend: "",
    reviewerName: "",
    reviewerEmail: "",
    reviewerCompany: "",
    reviewerRole: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof ReviewFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Review submitted:", formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 hover:text-yellow-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
        <Container>
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-12">
                <motion.div 
                  className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="h-12 w-12 text-primary" />
                </motion.div>
                <motion.h1 
                  className="text-3xl font-display font-bold text-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Review Submitted Successfully!
                </motion.h1>
                <motion.p 
                  className="text-lg text-muted-foreground mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for sharing your experience with {mockCompany.name}. 
                  Your review will help other businesses make informed decisions.
                </motion.p>
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = '/write-review'}
                    className="w-full border-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    Write Another Review
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </div>
    )
  }

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
              onClick={() => window.location.href = '/write-review'}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="mb-8 border-2 border-primary/30 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="h-16 w-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-primary-foreground font-bold text-xl">
                        {mockCompany.name.charAt(0)}
                      </span>
                    </motion.div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-display font-bold text-foreground">{mockCompany.name}</h1>
                      <p className="text-muted-foreground">{mockCompany.category}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 transition-colors duration-200 ${
                                i < Math.floor(mockCompany.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mockCompany.rating} ({mockCompany.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Review Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center mb-4"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6 mr-2 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Write Your Review
                    </CardTitle>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      <Sparkles className="h-6 w-6 ml-2 text-primary" />
                    </motion.div>
                  </motion.div>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Share your experience to help other businesses make informed decisions
                  </motion.p>
                </CardHeader>
                <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Overall Rating */}
                  <div className="text-center">
                    <Label className="text-lg font-semibold mb-4 block">Overall Rating *</Label>
                    {renderStars(formData.overallRating, (rating) => handleInputChange("overallRating", rating))}
                    <p className="text-sm text-gray-500 mt-2">
                      {formData.overallRating > 0 && (
                        <>
                          {formData.overallRating === 1 && "Poor"}
                          {formData.overallRating === 2 && "Fair"}
                          {formData.overallRating === 3 && "Good"}
                          {formData.overallRating === 4 && "Very Good"}
                          {formData.overallRating === 5 && "Excellent"}
                        </>
                      )}
                    </p>
                  </div>

                  {/* Review Title */}
                  <div>
                    <Label htmlFor="title" className="text-lg font-semibold">Review Title *</Label>
                    <Input
                      id="title"
                      placeholder="Summarize your experience in a few words"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Review Content */}
                  <div>
                    <Label htmlFor="content" className="text-lg font-semibold">Your Review *</Label>
                    <Textarea
                      id="content"
                      placeholder="Tell us about your experience working with this company. What went well? What could be improved?"
                      rows={6}
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="projectType" className="text-lg font-semibold">Project Type</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="e-commerce">E-commerce</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectBudget" className="text-lg font-semibold">Project Budget</Label>
                      <Select value={formData.projectBudget} onValueChange={(value) => handleInputChange("projectBudget", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectDuration" className="text-lg font-semibold">Project Duration</Label>
                      <Select value={formData.projectDuration} onValueChange={(value) => handleInputChange("projectDuration", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1-month">Under 1 month</SelectItem>
                          <SelectItem value="1-3-months">1-3 months</SelectItem>
                          <SelectItem value="3-6-months">3-6 months</SelectItem>
                          <SelectItem value="6-12-months">6-12 months</SelectItem>
                          <SelectItem value="over-1-year">Over 1 year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Detailed Ratings */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Detailed Ratings</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                            Communication
                          </span>
                          {renderStars(formData.communicationRating, (rating) => handleInputChange("communicationRating", rating))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-green-600" />
                            Quality
                          </span>
                          {renderStars(formData.qualityRating, (rating) => handleInputChange("qualityRating", rating))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-orange-600" />
                            Timeline
                          </span>
                          {renderStars(formData.timelineRating, (rating) => handleInputChange("timelineRating", rating))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-purple-600" />
                            Value
                          </span>
                          {renderStars(formData.valueRating, (rating) => handleInputChange("valueRating", rating))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Would you recommend this company?</Label>
                    <RadioGroup value={formData.wouldRecommend} onValueChange={(value) => handleInputChange("wouldRecommend", value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Yes, I would recommend them</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No, I would not recommend them</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Reviewer Information */}
                  <div className="border-t pt-8">
                    <h3 className="text-xl font-semibold mb-6">Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="reviewerName" className="text-lg font-semibold">Your Name *</Label>
                        <Input
                          id="reviewerName"
                          placeholder="Enter your full name"
                          value={formData.reviewerName}
                          onChange={(e) => handleInputChange("reviewerName", e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewerEmail" className="text-lg font-semibold">Email Address *</Label>
                        <Input
                          id="reviewerEmail"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.reviewerEmail}
                          onChange={(e) => handleInputChange("reviewerEmail", e.target.value)}
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewerCompany" className="text-lg font-semibold">Your Company</Label>
                        <Input
                          id="reviewerCompany"
                          placeholder="Enter your company name"
                          value={formData.reviewerCompany}
                          onChange={(e) => handleInputChange("reviewerCompany", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewerRole" className="text-lg font-semibold">Your Role</Label>
                        <Input
                          id="reviewerRole"
                          placeholder="e.g., CEO, Project Manager, Developer"
                          value={formData.reviewerRole}
                          onChange={(e) => handleInputChange("reviewerRole", e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div 
                    className="text-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || formData.overallRating === 0}
                      className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                          Submitting Review...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </main>
    </div>
  )
}