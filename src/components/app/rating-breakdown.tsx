"use client"

import * as React from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getRatingSummary } from "@/lib/utils/rating"
import { Review } from "@/lib/types"

interface RatingBreakdownProps {
  reviews: Review[]
  className?: string
}

export function RatingBreakdown({ reviews, className }: RatingBreakdownProps) {
  const ratingSummary = getRatingSummary(reviews)
  const { distribution, percentages } = ratingSummary

  const chartData = [
    { rating: 5, count: distribution[5], percentage: percentages[5], color: "#22c55e" },
    { rating: 4, count: distribution[4], percentage: percentages[4], color: "#84cc16" },
    { rating: 3, count: distribution[3], percentage: percentages[3], color: "#eab308" },
    { rating: 2, count: distribution[2], percentage: percentages[2], color: "#f97316" },
    { rating: 1, count: distribution[1], percentage: percentages[1], color: "#ef4444" },
  ]

  const getBarColor = (rating: number) => {
    switch (rating) {
      case 5: return "#22c55e" // green-500
      case 4: return "#84cc16" // lime-500
      case 3: return "#eab308" // yellow-500
      case 2: return "#f97316" // orange-500
      case 1: return "#ef4444" // red-500
      default: return "#6b7280" // gray-500
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Rating Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-brand mb-2">
            {ratingSummary.average.toFixed(1)}
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {ratingSummary.count} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          {chartData.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="w-8 text-sm font-medium text-muted-foreground">
                {rating}
              </div>
              <div className="flex-1">
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
              </div>
              <div className="w-12 text-sm text-muted-foreground text-right">
                {count}
              </div>
              <div className="w-12 text-sm text-muted-foreground text-right">
                {percentage.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>

        {/* Chart Visualization */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="horizontal">
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="rating" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar 
                dataKey="percentage" 
                radius={[0, 4, 4, 0]}
                fill="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
