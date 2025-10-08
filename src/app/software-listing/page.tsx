"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Upload, X, Plus, Info, FileText, Calendar, Image, Link, DollarSign, Settings, HelpCircle } from "lucide-react"

interface SoftwareFormData {
  // Software Information
  softwareLogo: File | null
  softwareName: string
  tagline: string
  softwareWebsite: string
  vendorName: string
  vendorFounded: string
  softwareDescription: string
  category: string
  deployment: string
  pricingModel: string
  
  // Descriptions
  shortDescription: string
  longDescription: string
  keyFeatures: string[]
  benefits: string[]
  
  // Features
  features: Array<{
    id: string
    name: string
    description: string
    category: string
  }>
  
  // Media
  screenshots: File[]
  videos: string[]
  demos: string[]
  
  // Destination URLs
  websiteUrl: string
  demoUrl: string
  pricingUrl: string
  supportUrl: string
  documentationUrl: string
  
  // Pricing
  pricingPlans: Array<{
    id: string
    name: string
    price: string
    billingPeriod: string
    features: string[]
    isPopular: boolean
  }>
  
  // Integrations & API
  integrations: string[]
  apiAvailable: boolean
  apiDocumentation: string
  sdkAvailable: boolean
  webhooks: boolean
  
  // Support & Training
  supportChannels: string[]
  trainingOptions: string[]
  documentationQuality: string
  communitySupport: boolean
}

const steps = [
  { id: 1, title: "Software Information", icon: Info },
  { id: 2, title: "Descriptions", icon: FileText },
  { id: 3, title: "Features", icon: Calendar },
  { id: 4, title: "Media", icon: Image },
  { id: 5, title: "Destination URLs", icon: Link },
  { id: 6, title: "Pricing", icon: DollarSign },
  { id: 7, title: "Integrations & API", icon: Settings },
  { id: 8, title: "Support & Training", icon: HelpCircle },
]

const categoryOptions = [
  "Project Management",
  "CRM",
  "Marketing Automation",
  "Analytics",
  "Communication",
  "Development Tools",
  "Design",
  "E-commerce",
  "HR & Payroll",
  "Accounting",
  "Security",
  "Other"
]

const deploymentOptions = [
  "Cloud-based",
  "On-premise",
  "Hybrid",
  "Mobile App",
  "Desktop App"
]

const pricingModelOptions = [
  "Free",
  "Freemium",
  "Subscription",
  "One-time Purchase",
  "Usage-based",
  "Custom"
]

const supportChannelOptions = [
  "Email Support",
  "Phone Support",
  "Live Chat",
  "Ticket System",
  "Knowledge Base",
  "Video Tutorials",
  "Webinars",
  "Community Forum"
]

const trainingOptions = [
  "Online Training",
  "In-person Training",
  "Video Tutorials",
  "Documentation",
  "Webinars",
  "Certification Programs",
  "One-on-one Support"
]

export default function SoftwareListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<SoftwareFormData>({
    softwareLogo: null,
    softwareName: "",
    tagline: "",
    softwareWebsite: "",
    vendorName: "",
    vendorFounded: "",
    softwareDescription: "",
    category: "",
    deployment: "",
    pricingModel: "",
    shortDescription: "",
    longDescription: "",
    keyFeatures: [],
    benefits: [],
    features: [{
      id: "1",
      name: "",
      description: "",
      category: ""
    }],
    screenshots: [],
    videos: [],
    demos: [],
    websiteUrl: "",
    demoUrl: "",
    pricingUrl: "",
    supportUrl: "",
    documentationUrl: "",
    pricingPlans: [{
      id: "1",
      name: "",
      price: "",
      billingPeriod: "",
      features: [],
      isPopular: false
    }],
    integrations: [],
    apiAvailable: false,
    apiDocumentation: "",
    sdkAvailable: false,
    webhooks: false,
    supportChannels: [],
    trainingOptions: [],
    documentationQuality: "",
    communitySupport: false
  })

  const handleInputChange = (field: keyof SoftwareFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMultiSelect = (field: keyof SoftwareFormData, value: string) => {
    const currentValues = formData[field] as string[]
    if (currentValues.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: currentValues.filter(item => item !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentValues, value]
      }))
    }
  }

  const addFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      name: "",
      description: "",
      category: ""
    }
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }))
  }

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, features: newFeatures }))
    }
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const addPricingPlan = () => {
    const newPlan = {
      id: Date.now().toString(),
      name: "",
      price: "",
      billingPeriod: "",
      features: [],
      isPopular: false
    }
    setFormData(prev => ({
      ...prev,
      pricingPlans: [...prev.pricingPlans, newPlan]
    }))
  }

  const removePricingPlan = (index: number) => {
    if (formData.pricingPlans.length > 1) {
      const newPlans = formData.pricingPlans.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, pricingPlans: newPlans }))
    }
  }

  const handlePricingPlanChange = (index: number, field: string, value: any) => {
    const newPlans = [...formData.pricingPlans]
    newPlans[index] = { ...newPlans[index], [field]: value }
    setFormData(prev => ({ ...prev, pricingPlans: newPlans }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      console.log("Software form submitted:", formData)
      
      // Prepare the data for API submission
      const submissionData = {
        softwareName: formData.softwareName,
        tagline: formData.tagline,
        softwareLogoUrl: formData.softwareLogo ? URL.createObjectURL(formData.softwareLogo) : null,
        softwareWebsite: formData.softwareWebsite,
        vendorName: formData.vendorName,
        vendorFounded: formData.vendorFounded,
        softwareDescription: formData.softwareDescription,
        category: formData.category,
        deployment: formData.deployment,
        pricingModel: formData.pricingModel,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        keyFeatures: formData.keyFeatures,
        benefits: formData.benefits,
        features: formData.features,
        media: [
          ...formData.screenshots.map(file => ({ type: 'screenshot', url: URL.createObjectURL(file) })),
          ...formData.videos.map(url => ({ type: 'video', url })),
          ...formData.demos.map(url => ({ type: 'demo', url }))
        ],
        urls: [
          { type: 'website', url: formData.websiteUrl },
          { type: 'demo', url: formData.demoUrl },
          { type: 'pricing', url: formData.pricingUrl },
          { type: 'support', url: formData.supportUrl },
          { type: 'documentation', url: formData.documentationUrl }
        ].filter(item => item.url),
        pricingPlans: formData.pricingPlans,
        integrations: formData.integrations,
        apiInfo: {
          apiAvailable: formData.apiAvailable,
          apiDocumentation: formData.apiDocumentation,
          sdkAvailable: formData.sdkAvailable,
          webhooks: formData.webhooks
        },
        supportChannels: formData.supportChannels,
        trainingOptions: formData.trainingOptions,
        supportInfo: {
          documentationQuality: formData.documentationQuality,
          communitySupport: formData.communitySupport
        }
      }

      const response = await fetch('/api/software-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert("Software listing submitted successfully! Your listing is now under review.")
        // Redirect to dashboard
        window.location.href = '/dashboard/listing-success'
      } else {
        console.error('Submission error:', result.error)
        alert(`Failed to submit listing: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred while submitting your listing. Please try again.')
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Software Logo */}
            <div className="space-y-4">
              <Label>Software Logo *</Label>
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gray-400 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">&lt;/&gt;</span>
                    </div>
                    <p className="text-xs text-gray-500">480px</p>
                  </div>
                </div>
                <div className="flex-1">
                  <Button variant="outline" className="mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <p className="text-sm text-gray-600">
                    Recommended size: 480x480px. Max file size: 2MB. Formats: JPG, PNG, SVG
                  </p>
                </div>
              </div>
            </div>

            {/* Software Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="softwareName">Software Name *</Label>
                <span className="text-sm text-gray-500">{formData.softwareName.length}/50</span>
              </div>
              <Input
                id="softwareName"
                placeholder="Enter software name"
                value={formData.softwareName}
                onChange={(e) => handleInputChange("softwareName", e.target.value)}
                maxLength={50}
              />
            </div>

            {/* Tagline */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tagline">Tagline *</Label>
                <span className="text-sm text-gray-500">{formData.tagline.length}/100</span>
              </div>
              <Input
                id="tagline"
                placeholder="Enter tagline"
                value={formData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                maxLength={100}
              />
            </div>

            {/* Software Website */}
            <div className="space-y-2">
              <Label htmlFor="softwareWebsite">Software Website *</Label>
              <Input
                id="softwareWebsite"
                placeholder="Enter software website"
                value={formData.softwareWebsite}
                onChange={(e) => handleInputChange("softwareWebsite", e.target.value)}
              />
            </div>

            {/* Vendor Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="vendorName">Vendor Name *</Label>
                <span className="text-sm text-gray-500">{formData.vendorName.length}/50</span>
              </div>
              <Input
                id="vendorName"
                placeholder="Enter vendor name"
                value={formData.vendorName}
                onChange={(e) => handleInputChange("vendorName", e.target.value)}
                maxLength={50}
              />
            </div>

            {/* Vendor Founded */}
            <div className="space-y-2">
              <Label htmlFor="vendorFounded">Vendor/Company Year Founded *</Label>
              <Input
                id="vendorFounded"
                placeholder="Enter year founded"
                value={formData.vendorFounded}
                onChange={(e) => handleInputChange("vendorFounded", e.target.value)}
              />
            </div>

            {/* Category and Deployment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deployment">Deployment *</Label>
                <Select value={formData.deployment} onValueChange={(value) => handleInputChange("deployment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deployment" />
                  </SelectTrigger>
                  <SelectContent>
                    {deploymentOptions.map((deployment) => (
                      <SelectItem key={deployment} value={deployment}>
                        {deployment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pricing Model */}
            <div className="space-y-2">
              <Label htmlFor="pricingModel">Pricing Model *</Label>
              <Select value={formData.pricingModel} onValueChange={(value) => handleInputChange("pricingModel", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pricing model" />
                </SelectTrigger>
                <SelectContent>
                  {pricingModelOptions.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Software Description */}
            <div className="space-y-2">
              <Label htmlFor="softwareDescription">Software Description *</Label>
              <Textarea
                id="softwareDescription"
                placeholder="Describe your software, its main purpose, and key benefits..."
                rows={4}
                value={formData.softwareDescription}
                onChange={(e) => handleInputChange("softwareDescription", e.target.value)}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            {/* Short Description */}
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief description (1-2 sentences)"
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <Label htmlFor="longDescription">Long Description *</Label>
              <Textarea
                id="longDescription"
                placeholder="Detailed description of your software"
                rows={6}
                value={formData.longDescription}
                onChange={(e) => handleInputChange("longDescription", e.target.value)}
              />
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <Label>Key Features</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter a key feature"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("keyFeatures", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.keyFeatures.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newFeatures = formData.keyFeatures.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, keyFeatures: newFeatures }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <Label>Benefits</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter a benefit"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("benefits", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {benefit}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newBenefits = formData.benefits.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, benefits: newBenefits }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Software Features</h3>
              <Button onClick={addFeature} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
            
            {formData.features.map((feature, index) => (
              <Card key={feature.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Feature {index + 1}</h4>
                    {formData.features.length > 1 && (
                      <Button
                        onClick={() => removeFeature(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Feature Name *</Label>
                        <Input
                          placeholder="e.g., Real-time Collaboration"
                          value={feature.name}
                          onChange={(e) => handleFeatureChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                          placeholder="e.g., Collaboration, Security"
                          value={feature.category}
                          onChange={(e) => handleFeatureChange(index, "category", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        placeholder="Describe this feature in detail..."
                        rows={3}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            {/* Screenshots */}
            <div className="space-y-4">
              <Label>Screenshots</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload screenshots of your software interface
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Recommended: 1200x800px. Max file size: 5MB each
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Screenshots
                </Button>
                <p className="text-xs text-gray-500 mt-2">JPG, PNG formats</p>
              </div>
            </div>

            {/* Videos */}
            <div className="space-y-4">
              <Label>Video URLs</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("videos", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.videos.map((video, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {video}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newVideos = formData.videos.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, videos: newVideos }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Demo URLs */}
            <div className="space-y-4">
              <Label>Demo URLs</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter demo URL"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("demos", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.demos.map((demo, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {demo}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newDemos = formData.demos.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, demos: newDemos }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Destination URLs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL *</Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://example.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  placeholder="https://demo.example.com"
                  value={formData.demoUrl}
                  onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricingUrl">Pricing URL</Label>
                <Input
                  id="pricingUrl"
                  placeholder="https://example.com/pricing"
                  value={formData.pricingUrl}
                  onChange={(e) => handleInputChange("pricingUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportUrl">Support URL</Label>
                <Input
                  id="supportUrl"
                  placeholder="https://support.example.com"
                  value={formData.supportUrl}
                  onChange={(e) => handleInputChange("supportUrl", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="documentationUrl">Documentation URL</Label>
                <Input
                  id="documentationUrl"
                  placeholder="https://docs.example.com"
                  value={formData.documentationUrl}
                  onChange={(e) => handleInputChange("documentationUrl", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pricing Plans</h3>
              <Button onClick={addPricingPlan} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Plan
              </Button>
            </div>
            
            {formData.pricingPlans.map((plan, index) => (
              <Card key={plan.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Plan {index + 1}</h4>
                    {formData.pricingPlans.length > 1 && (
                      <Button
                        onClick={() => removePricingPlan(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Plan Name *</Label>
                        <Input
                          placeholder="e.g., Basic, Pro, Enterprise"
                          value={plan.name}
                          onChange={(e) => handlePricingPlanChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price *</Label>
                        <Input
                          placeholder="e.g., $29, Free, Custom"
                          value={plan.price}
                          onChange={(e) => handlePricingPlanChange(index, "price", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Billing Period</Label>
                        <Select value={plan.billingPeriod} onValueChange={(value) => handlePricingPlanChange(index, "billingPeriod", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="one-time">One-time</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Plan Features</Label>
                      <Input
                        placeholder="Enter a feature"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            const newFeatures = [...plan.features, e.currentTarget.value.trim()]
                            handlePricingPlanChange(index, "features", newFeatures)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2">
                        {plan.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="secondary" className="flex items-center gap-1">
                            {feature}
                            <X
                              className="h-3 w-3 cursor-pointer"
                              onClick={() => {
                                const newFeatures = plan.features.filter((_, i) => i !== featureIndex)
                                handlePricingPlanChange(index, "features", newFeatures)
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`popular-${index}`}
                        checked={plan.isPopular}
                        onCheckedChange={(checked) => handlePricingPlanChange(index, "isPopular", checked)}
                      />
                      <Label htmlFor={`popular-${index}`} className="text-sm">
                        Mark as popular plan
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 7:
        return (
          <div className="space-y-8">
            {/* Integrations */}
            <div className="space-y-4">
              <Label>Integrations</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter integration name (e.g., Slack, Salesforce)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("integrations", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.integrations.map((integration, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {integration}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newIntegrations = formData.integrations.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, integrations: newIntegrations }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* API Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">API Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="apiAvailable"
                    checked={formData.apiAvailable}
                    onCheckedChange={(checked) => handleInputChange("apiAvailable", checked)}
                  />
                  <Label htmlFor="apiAvailable">API Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sdkAvailable"
                    checked={formData.sdkAvailable}
                    onCheckedChange={(checked) => handleInputChange("sdkAvailable", checked)}
                  />
                  <Label htmlFor="sdkAvailable">SDK Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="webhooks"
                    checked={formData.webhooks}
                    onCheckedChange={(checked) => handleInputChange("webhooks", checked)}
                  />
                  <Label htmlFor="webhooks">Webhooks Support</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiDocumentation">API Documentation URL</Label>
                  <Input
                    id="apiDocumentation"
                    placeholder="https://api-docs.example.com"
                    value={formData.apiDocumentation}
                    onChange={(e) => handleInputChange("apiDocumentation", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-8">
            {/* Support Channels */}
            <div className="space-y-4">
              <Label>Support Channels</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {supportChannelOptions.map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Checkbox
                      id={channel}
                      checked={formData.supportChannels.includes(channel)}
                      onCheckedChange={() => handleMultiSelect("supportChannels", channel)}
                    />
                    <Label htmlFor={channel} className="text-sm">
                      {channel}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Options */}
            <div className="space-y-4">
              <Label>Training Options</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {trainingOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.trainingOptions.includes(option)}
                      onCheckedChange={() => handleMultiSelect("trainingOptions", option)}
                    />
                    <Label htmlFor={option} className="text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation Quality */}
            <div className="space-y-2">
              <Label htmlFor="documentationQuality">Documentation Quality</Label>
              <Select value={formData.documentationQuality} onValueChange={(value) => handleInputChange("documentationQuality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select documentation quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Community Support */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="communitySupport"
                checked={formData.communitySupport}
                onCheckedChange={(checked) => handleInputChange("communitySupport", checked)}
              />
              <Label htmlFor="communitySupport">Community Support Available</Label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen shadow-sm">
          <div className="p-6">
            {/* Logo in Sidebar */}
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center space-x-2 mb-8 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B2B</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Reviews</span>
            </button>

            {/* Navigation */}
            <nav className="space-y-2">
              <button 
                onClick={() => window.location.href = '/dashboard/listing-success'}
                className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="h-5 w-5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="font-medium">Dashboard</span>
              </button>

              <button 
                onClick={() => window.location.href = '/organization'}
                className="flex items-center space-x-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5" />
                <span className="font-medium">Organisation</span>
              </button>

              <button className="flex items-center space-x-3 w-full p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                <Info className="h-5 w-5" />
                <span className="font-medium">Software Information</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </button>
            </nav>

            {/* CTA Box */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white">
              <p className="text-sm font-medium mb-3">
                Need help with your software listing?
              </p>
              <div className="space-y-2">
                <Button size="sm" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium">
                  Contact Support
                </Button>
                <Button size="sm" variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                  View Guidelines
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/organization'}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Organization
              </Button>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Software Information</h1>
              <p className="text-gray-600">Create a comprehensive software listing to attract more users</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 overflow-x-auto">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <div key={step.id} className="flex items-center min-w-0">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 ${
                      isActive 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : isCompleted 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 min-w-[20px] ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Form Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              
              {currentStep === steps.length ? (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Submit Software Listing
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Save & Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
