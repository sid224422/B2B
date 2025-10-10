import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Clock, 
  Zap,
  Brain,
  Target,
  Activity,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Analytics Dashboard - B2B Reviews',
  description: 'Track AI assistant usage, performance metrics, and user engagement analytics.',
}

// Mock data - in production, this would come from your analytics API
const mockAnalytics = {
  overview: {
    totalQueries: 12547,
    activeUsers: 3421,
    avgResponseTime: 1.2,
    satisfactionRating: 4.6,
    totalConversations: 8932,
    avgMessagesPerConversation: 4.3
  },
  topQueries: [
    { query: "Find web development agencies", count: 1247, category: "Web Development" },
    { query: "Best digital marketing companies", count: 982, category: "Marketing" },
    { query: "Top SaaS providers", count: 756, category: "SaaS" },
    { query: "Cybersecurity consulting firms", count: 634, category: "Security" },
    { query: "Cloud migration services", count: 521, category: "Cloud" },
    { query: "Mobile app development teams", count: 489, category: "Mobile" },
    { query: "Data analytics consultants", count: 445, category: "Analytics" },
    { query: "UI/UX design agencies", count: 398, category: "Design" }
  ],
  categoryBreakdown: [
    { category: "Web Development", count: 3247, percentage: 25.9 },
    { category: "Marketing", count: 2891, percentage: 23.1 },
    { category: "SaaS", count: 2156, percentage: 17.2 },
    { category: "Cloud Services", count: 1789, percentage: 14.3 },
    { category: "Security", count: 1234, percentage: 9.8 },
    { category: "Analytics", count: 987, percentage: 7.9 },
    { category: "Design", count: 643, percentage: 5.1 },
    { category: "Other", count: 600, percentage: 4.8 }
  ],
  hourlyUsage: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    queries: Math.floor(Math.random() * 200) + 50
  })),
  weeklyTrends: [
    { day: "Mon", queries: 1847, users: 421 },
    { day: "Tue", queries: 2134, users: 489 },
    { day: "Wed", queries: 1987, users: 456 },
    { day: "Thu", queries: 2256, users: 523 },
    { day: "Fri", queries: 2341, users: 567 },
    { day: "Sat", queries: 1456, users: 312 },
    { day: "Sun", queries: 1234, users: 278 }
  ]
}

export default function AIAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            AI Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track AI assistant performance, user engagement, and usage patterns
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.totalQueries.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.activeUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.avgResponseTime}s</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                -15.2% improvement
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {mockAnalytics.overview.satisfactionRating}
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <p className="text-xs text-muted-foreground">
                Based on 1,234 ratings
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.overview.totalConversations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {mockAnalytics.overview.avgMessagesPerConversation} avg messages
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Performance</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                Uptime & accuracy
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="queries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="queries">Popular Queries</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Popular Queries Tab */}
          <TabsContent value="queries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Most Popular Queries
                </CardTitle>
                <CardDescription>
                  Top AI assistant queries ranked by frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.topQueries.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.query}</p>
                          <Badge variant="secondary" className="mt-1">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.count.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">queries</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Category Breakdown
                </CardTitle>
                <CardDescription>
                  Distribution of queries across different service categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.categoryBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.count.toLocaleString()} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Patterns Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Usage Distribution</CardTitle>
                  <CardDescription>
                    AI queries throughout the day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockAnalytics.hourlyUsage.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-12 text-sm text-muted-foreground">
                          {item.hour.toString().padStart(2, '0')}:00
                        </div>
                        <div className="flex-1 bg-muted rounded-full h-4 relative">
                          <div 
                            className="bg-primary h-4 rounded-full"
                            style={{ width: `${(item.queries / 250) * 100}%` }}
                          />
                          <span className="absolute right-2 top-0 text-xs text-muted-foreground">
                            {item.queries}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Trends</CardTitle>
                  <CardDescription>
                    Daily activity over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.weeklyTrends.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{item.day}</p>
                          <p className="text-sm text-muted-foreground">{item.users} users</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.queries.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">queries</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Metrics</CardTitle>
                  <CardDescription>
                    AI assistant performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Average Response Time</span>
                    <span className="font-semibold">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>95th Percentile</span>
                    <span className="font-semibold">2.8s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Success Rate</span>
                    <span className="font-semibold text-green-600">98.7%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Satisfaction</CardTitle>
                  <CardDescription>
                    Feedback and rating metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Overall Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">4.6</span>
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>Helpful Responses</span>
                    <span className="font-semibold text-green-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span>User Retention</span>
                    <span className="font-semibold">87.5%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button>
            <Activity className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Detailed Analytics
          </Button>
        </div>
      </div>
    </div>
  )
}
