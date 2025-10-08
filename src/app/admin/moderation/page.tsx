"use client"

import * as React from "react"
import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageHeading } from "@/components/layout/page-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, X, Eye, Filter, Search } from "lucide-react"
import { mockReviews } from "@/lib/data/mock"
import { Review } from "@/lib/types"
import { Stars } from "@/components/ui/stars"

type ReviewStatus = "pending" | "approved" | "rejected"
type ReviewFlag = "spam" | "inappropriate" | "fake" | "duplicate"

interface ReviewWithStatus extends Review {
  status: ReviewStatus
  flags: ReviewFlag[]
  moderationNotes?: string
}

export default function ModerationPage() {
  const [reviews, setReviews] = useState<ReviewWithStatus[]>(
    mockReviews.map(review => ({
      ...review,
      status: "pending" as ReviewStatus,
      flags: [] as ReviewFlag[],
    }))
  )
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("all")
  const [flagFilter, setFlagFilter] = useState<ReviewFlag | "all">("all")
  const [selectedReview, setSelectedReview] = useState<ReviewWithStatus | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.reviewerName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesFlag = flagFilter === "all" || review.flags.includes(flagFilter)
    
    return matchesSearch && matchesStatus && matchesFlag
  })

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    )
  }

  const handleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(filteredReviews.map(review => review.id))
    }
  }

  const handleApprove = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: "approved" as ReviewStatus }
        : review
    ))
    setSelectedReviews(prev => prev.filter(id => id !== reviewId))
  }

  const handleReject = (reviewId: string, reason: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, status: "rejected" as ReviewStatus, moderationNotes: reason }
        : review
    ))
    setSelectedReviews(prev => prev.filter(id => id !== reviewId))
    setRejectionReason("")
  }

  const handleBulkApprove = () => {
    setReviews(prev => prev.map(review => 
      selectedReviews.includes(review.id)
        ? { ...review, status: "approved" as ReviewStatus }
        : review
    ))
    setSelectedReviews([])
  }

  const handleBulkReject = () => {
    setReviews(prev => prev.map(review => 
      selectedReviews.includes(review.id)
        ? { ...review, status: "rejected" as ReviewStatus, moderationNotes: "Bulk rejected" }
        : review
    ))
    setSelectedReviews([])
  }

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "approved":
        return <Badge variant="default">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  const getFlagBadges = (flags: ReviewFlag[]) => {
    if (flags.length === 0) return null
    
    return (
      <div className="flex gap-1">
        {flags.map(flag => (
          <Badge key={flag} variant="secondary" className="text-xs">
            {flag}
          </Badge>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Section className="border-b">
        <Container>
          <PageHeading
            title="Review Moderation"
            description="Review and moderate user-submitted reviews for quality and authenticity."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ReviewStatus | "all")}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={flagFilter} onValueChange={(value) => setFlagFilter(value as ReviewFlag | "all")}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Flags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Flags</SelectItem>
                      <SelectItem value="spam">Spam</SelectItem>
                      <SelectItem value="inappropriate">Inappropriate</SelectItem>
                      <SelectItem value="fake">Fake</SelectItem>
                      <SelectItem value="duplicate">Duplicate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions */}
            {selectedReviews.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {selectedReviews.length} review(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button onClick={handleBulkApprove} size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        Approve Selected
                      </Button>
                      <Button onClick={handleBulkReject} variant="destructive" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Reject Selected
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Table */}
            <Card>
              <CardHeader>
                <CardTitle>Reviews ({filteredReviews.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Review</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Flags</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedReviews.includes(review.id)}
                            onCheckedChange={() => handleSelectReview(review.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium truncate">{review.title}</div>
                            <div className="text-sm text-muted-foreground truncate">
                              {review.content.substring(0, 100)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">Company Name</div>
                          <div className="text-xs text-muted-foreground">ID: {review.companyId}</div>
                        </TableCell>
                        <TableCell>
                          <Stars rating={review.rating} size="sm" showValue />
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(review.status)}
                        </TableCell>
                        <TableCell>
                          {getFlagBadges(review.flags)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedReview(review)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Review Details</DialogTitle>
                                  <DialogDescription>
                                    Review by {review.reviewerName} on {new Date(review.createdAt).toLocaleDateString()}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-sm font-medium">Title</Label>
                                    <p className="text-sm">{review.title}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Content</Label>
                                    <p className="text-sm whitespace-pre-wrap">{review.content}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Ratings</Label>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>Overall: <Stars rating={review.rating} size="sm" /></div>
                                      <div>Communication: <Stars rating={review.comms} size="sm" /></div>
                                      <div>Quality: <Stars rating={review.quality} size="sm" /></div>
                                      <div>Timeline: <Stars rating={review.timeline} size="sm" /></div>
                                      <div>Value: <Stars rating={review.value} size="sm" /></div>
                                    </div>
                                  </div>
                                  {review.moderationNotes && (
                                    <div>
                                      <Label className="text-sm font-medium">Moderation Notes</Label>
                                      <p className="text-sm text-muted-foreground">{review.moderationNotes}</p>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() => handleApprove(review.id)}
                                    disabled={review.status === "approved"}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        disabled={review.status === "rejected"}
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Reject Review</DialogTitle>
                                        <DialogDescription>
                                          Please provide a reason for rejecting this review.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div>
                                          <Label htmlFor="reason">Reason for rejection</Label>
                                          <Textarea
                                            id="reason"
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            placeholder="Enter reason for rejection..."
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button
                                          variant="destructive"
                                          onClick={() => handleReject(review.id, rejectionReason)}
                                          disabled={!rejectionReason.trim()}
                                        >
                                          Reject Review
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </div>
  )
}
