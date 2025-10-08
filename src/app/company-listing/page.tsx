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
import { ArrowLeft, ArrowRight, Upload, X, Plus, MapPin, Building2, Users, Target } from "lucide-react"

interface FormData {
  // General Information
  companyName: string
  tagline: string
  businessLogo: File | null
  founded: string
  employees: string
  hourlyRate: string
  website: string
  phoneNumber: string
  salesEmail: string
  description: string
  
  // Locations
  locations: Array<{
    id: string
    address: string
    city: string
    state: string
    country: string
    zipCode: string
    isPrimary: boolean
  }>
  
  // Services
  services: Array<{
    id: string
    name: string
    description: string
    priceRange: string
    deliveryTime: string
  }>
  
  // Clients & Industries
  clientIndustries: string[]
  clientSize: string[]
  projectTypes: string[]
  certifications: string[]
}

const steps = [
  { id: 1, title: "General Information", icon: Building2 },
  { id: 2, title: "Locations", icon: MapPin },
  { id: 3, title: "Services", icon: Target },
  { id: 4, title: "Clients & Industries", icon: Users },
]

const employeeOptions = [
  "1-10",
  "11-50", 
  "51-200",
  "201-500",
  "501-1000",
  "1000+"
]

const hourlyRateOptions = [
  "Less than $25",
  "$25 - $49",
  "$50 - $99", 
  "$100 - $149",
  "$150 - $199",
  "$200+"
]

const industryOptions = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Consulting",
  "Marketing",
  "Legal",
  "Other"
]

const clientSizeOptions = [
  "Startups (1-10 employees)",
  "Small Business (11-50 employees)",
  "Medium Business (51-200 employees)",
  "Large Business (201-1000 employees)",
  "Enterprise (1000+ employees)"
]

const projectTypeOptions = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Digital Marketing",
  "SEO Services",
  "Content Writing",
  "Graphic Design",
  "Consulting",
  "Other"
]

export default function CompanyListingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    tagline: "",
    businessLogo: null,
    founded: "",
    employees: "",
    hourlyRate: "",
    website: "",
    phoneNumber: "",
    salesEmail: "",
    description: "",
    locations: [{
      id: "1",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      isPrimary: true
    }],
    services: [{
      id: "1",
      name: "",
      description: "",
      priceRange: "",
      deliveryTime: ""
    }],
    clientIndustries: [],
    clientSize: [],
    projectTypes: [],
    certifications: []
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLocationChange = (index: number, field: string, value: string) => {
    const newLocations = [...formData.locations]
    newLocations[index] = { ...newLocations[index], [field]: value }
    setFormData(prev => ({ ...prev, locations: newLocations }))
  }

  const addLocation = () => {
    const newLocation = {
      id: Date.now().toString(),
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      isPrimary: false
    }
    setFormData(prev => ({
      ...prev,
      locations: [...prev.locations, newLocation]
    }))
  }

  const removeLocation = (index: number) => {
    if (formData.locations.length > 1) {
      const newLocations = formData.locations.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, locations: newLocations }))
    }
  }

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    setFormData(prev => ({ ...prev, services: newServices }))
  }

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      name: "",
      description: "",
      priceRange: "",
      deliveryTime: ""
    }
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }))
  }

  const removeService = (index: number) => {
    if (formData.services.length > 1) {
      const newServices = formData.services.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, services: newServices }))
    }
  }

  const handleMultiSelect = (field: keyof FormData, value: string) => {
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
      console.log("Form submitted:", formData)
      
      // Prepare the data for API submission
      const submissionData = {
        companyName: formData.companyName,
        tagline: formData.tagline,
        businessLogoUrl: formData.businessLogo ? URL.createObjectURL(formData.businessLogo) : null,
        foundedYear: formData.founded,
        employeeCount: formData.employees,
        hourlyRate: formData.hourlyRate,
        website: formData.website,
        phoneNumber: formData.phoneNumber,
        salesEmail: formData.salesEmail,
        description: formData.description,
        locations: formData.locations,
        services: formData.services,
        clientIndustries: formData.clientIndustries,
        clientSizes: formData.clientSize,
        projectTypes: formData.projectTypes,
        certifications: formData.certifications
      }

      const response = await fetch('/api/company-listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert("Company listing submitted successfully! Your listing is now under review.")
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
            {/* Company Name and Tagline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  placeholder="Enter tagline"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                />
              </div>
            </div>

            {/* Business Logo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Business Logo *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Image dimensions should not exceed 500 pixels
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Maximum Image size: 2 MB
                  </p>
                  <Button variant="outline" size="sm">
                    Browse
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">jpg, jpeg, png</p>
                </div>
              </div>
              <div className="space-y-6">
                {/* Key Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Details</h3>
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded *</Label>
                    <Input
                      id="founded"
                      placeholder="Enter the year of Foundation"
                      value={formData.founded}
                      onChange={(e) => handleInputChange("founded", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employees">No. of Employees *</Label>
                    <Select value={formData.employees} onValueChange={(value) => handleInputChange("employees", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Avg. Hourly Rate *</Label>
                    <Select value={formData.hourlyRate} onValueChange={(value) => handleInputChange("hourlyRate", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {hourlyRateOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website">Website *</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="salesEmail">Sales Email Address *</Label>
                  <Input
                    id="salesEmail"
                    placeholder="sales@example.com"
                    value={formData.salesEmail}
                    onChange={(e) => handleInputChange("salesEmail", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your company, services, and what makes you unique..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Company Locations</h3>
              <Button onClick={addLocation} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
            
            {formData.locations.map((location, index) => (
              <Card key={location.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">
                      {location.isPrimary ? "Primary Location" : `Location ${index + 1}`}
                    </h4>
                    {formData.locations.length > 1 && (
                      <Button
                        onClick={() => removeLocation(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Address *</Label>
                      <Input
                        placeholder="Enter street address"
                        value={location.address}
                        onChange={(e) => handleLocationChange(index, "address", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City *</Label>
                      <Input
                        placeholder="Enter city"
                        value={location.city}
                        onChange={(e) => handleLocationChange(index, "city", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State/Province *</Label>
                      <Input
                        placeholder="Enter state or province"
                        value={location.state}
                        onChange={(e) => handleLocationChange(index, "state", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Country *</Label>
                      <Input
                        placeholder="Enter country"
                        value={location.country}
                        onChange={(e) => handleLocationChange(index, "country", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>ZIP/Postal Code *</Label>
                      <Input
                        placeholder="Enter ZIP or postal code"
                        value={location.zipCode}
                        onChange={(e) => handleLocationChange(index, "zipCode", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Services Offered</h3>
              <Button onClick={addService} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
            
            {formData.services.map((service, index) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Service {index + 1}</h4>
                    {formData.services.length > 1 && (
                      <Button
                        onClick={() => removeService(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Service Name *</Label>
                      <Input
                        placeholder="e.g., Web Development, Digital Marketing"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Service Description *</Label>
                      <Textarea
                        placeholder="Describe what this service includes..."
                        rows={3}
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, "description", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Price Range</Label>
                        <Input
                          placeholder="e.g., $1,000 - $5,000"
                          value={service.priceRange}
                          onChange={(e) => handleServiceChange(index, "priceRange", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Delivery Time</Label>
                        <Input
                          placeholder="e.g., 2-4 weeks"
                          value={service.deliveryTime}
                          onChange={(e) => handleServiceChange(index, "deliveryTime", e.target.value)}
                        />
                      </div>
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
            {/* Client Industries */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Client Industries</h3>
              <p className="text-sm text-gray-600">Select the industries you typically work with</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industryOptions.map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      id={industry}
                      checked={formData.clientIndustries.includes(industry)}
                      onCheckedChange={() => handleMultiSelect("clientIndustries", industry)}
                    />
                    <Label htmlFor={industry} className="text-sm">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Size */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Client Size</h3>
              <p className="text-sm text-gray-600">Select the typical size of clients you work with</p>
              <div className="space-y-3">
                {clientSizeOptions.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={formData.clientSize.includes(size)}
                      onCheckedChange={() => handleMultiSelect("clientSize", size)}
                    />
                    <Label htmlFor={size} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Types */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Types</h3>
              <p className="text-sm text-gray-600">Select the types of projects you typically handle</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {projectTypeOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.projectTypes.includes(type)}
                      onCheckedChange={() => handleMultiSelect("projectTypes", type)}
                    />
                    <Label htmlFor={type} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Certifications & Awards</h3>
              <p className="text-sm text-gray-600">List any relevant certifications or awards</p>
              <div className="space-y-2">
                <Input
                  placeholder="Enter certification or award"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleMultiSelect("certifications", e.currentTarget.value.trim())
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {cert}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newCerts = formData.certifications.filter((_, i) => i !== index)
                          setFormData(prev => ({ ...prev, certifications: newCerts }))
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
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
                <Building2 className="h-5 w-5" />
                <span className="font-medium">Organisation</span>
              </button>

              <button className="flex items-center space-x-3 w-full p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                <Target className="h-5 w-5" />
                <span className="font-medium">Company Listing</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </button>
            </nav>

            {/* CTA Box */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white">
              <p className="text-sm font-medium mb-3">
                Need help with your listing?
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Company Profile</h1>
              <p className="text-gray-600">Complete your company listing to attract more clients</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
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
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
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
                  Submit Listing
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
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
