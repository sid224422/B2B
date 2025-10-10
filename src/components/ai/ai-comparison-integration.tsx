'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  GitCompare, 
  Plus, 
  X, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useCompareStore } from '@/lib/store/compare'
import { Company } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

interface AIComparisonIntegrationProps {
  companies: Company[]
  onCompanyClick: (company: Company) => void
  onAddToCompare: (company: Company) => void
  className?: string
}

export function AIComparisonIntegration({ 
  companies, 
  onCompanyClick, 
  onAddToCompare,
  className 
}: AIComparisonIntegrationProps) {
  const { 
    selectedCompanies, 
    addCompany, 
    removeCompany, 
    isInCompare, 
    canAddMore, 
    clearAll 
  } = useCompareStore()
  
  const [isOpen, setIsOpen] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  // Auto-open comparison when we have companies to compare
  useEffect(() => {
    if (selectedCompanies.length > 1) {
      setShowComparison(true)
    }
  }, [selectedCompanies.length])

  const handleAddToCompare = (company: Company) => {
    if (isInCompare(company.id)) {
      removeCompany(company.id)
    } else if (canAddMore()) {
      addCompany(company)
      onAddToCompare(company)
    }
  }

  const handleCompareNow = () => {
    if (selectedCompanies.length >= 2) {
      window.location.href = '/compare'
    }
  }

  const handleRemoveFromCompare = (companyId: string) => {
    removeCompany(companyId)
  }

  if (companies.length === 0) {
    return null
  }

  return (
    <div className={className}>
      {/* Quick Comparison Status */}
      {selectedCompanies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GitCompare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm leading-tight break-words">
                      {selectedCompanies.length} companies selected for comparison
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight break-words">
                      {selectedCompanies.length < 3 ? `Add ${3 - selectedCompanies.length} more to compare` : 'Ready to compare!'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCompanies.length >= 2 && (
                    <Button 
                      size="sm" 
                      onClick={handleCompareNow}
                      className="h-8"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Compare Now
                    </Button>
                  )}
                  
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8">
                        <GitCompare className="h-4 w-4 mr-1" />
                        View ({selectedCompanies.length})
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <GitCompare className="h-5 w-5" />
                          Comparison Queue
                        </DialogTitle>
                        <DialogDescription>
                          Manage companies selected for comparison
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            {selectedCompanies.length} of 3 companies selected
                          </p>
                          {selectedCompanies.length > 0 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={clearAll}
                              className="text-xs"
                            >
                              Clear All
                            </Button>
                          )}
                        </div>
                        
                        <ScrollArea className="h-64">
                          <div className="space-y-2">
                            <AnimatePresence>
                              {selectedCompanies.map((company) => (
                                <motion.div
                                  key={company.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 20 }}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                      <span className="text-lg">🏢</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm truncate">
                                        {company.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground truncate">
                                        {company.category}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                      <span className="text-xs font-medium">
                                        {company.rating}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveFromCompare(company.id)}
                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </ScrollArea>
                        
                        {selectedCompanies.length >= 2 && (
                          <div className="flex gap-2 pt-2">
                            <Button onClick={handleCompareNow} className="flex-1">
                              <GitCompare className="h-4 w-4 mr-2" />
                              Start Comparison
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Recommendations with Comparison Actions */}
      <div className="space-y-3">
        {companies.slice(0, 5).map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:shadow-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-xl">🏢</span>
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm leading-tight">
                            {company.name}
                          </h4>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            {company.category}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                          {company.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="font-medium">{company.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{company.reviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{company.employees}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          onCompanyClick(company)
                        }}
                        className="h-8 px-3 text-xs flex-1 hover:bg-primary/10 hover:border-primary/30"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Profile
                      </Button>
                      
                      <Button
                        size="sm"
                        variant={isInCompare(company.id) ? "default" : "outline"}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAddToCompare(company)
                        }}
                        disabled={!isInCompare(company.id) && !canAddMore()}
                        className={`h-8 px-3 text-xs flex-1 transition-all duration-200 ${
                          isInCompare(company.id) 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'hover:bg-primary/10 hover:border-primary/30'
                        }`}
                      >
                        {isInCompare(company.id) ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Added
                          </>
                        ) : canAddMore() ? (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            Compare
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Max
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Comparison Tips */}
      {selectedCompanies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-muted/50 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <GitCompare className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium mb-1">💡 Comparison Tip</p>
              <p className="text-xs text-muted-foreground">
                Select 2-3 companies to compare their features, pricing, and reviews side-by-side
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
