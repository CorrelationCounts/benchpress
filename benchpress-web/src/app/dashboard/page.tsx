"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceMetrics } from "@/components/analytics/performance-metrics"
import { AlgorithmComparison } from "@/components/analytics/algorithm-comparison"
import { ExecutionTimeChart } from "@/components/analytics/execution-time-chart"
import { ROCCurve } from "@/components/analytics/roc-curve"

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Analyze and compare structure learning algorithm performance
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithm Comparison</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="roc">ROC Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg F1 Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.782</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg SHD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4</div>
                <p className="text-xs text-muted-foreground">
                  -5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.845</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Recall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.729</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutionTimeChart />
            <PerformanceMetrics />
          </div>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-6">
          <AlgorithmComparison />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceMetrics />
        </TabsContent>

        <TabsContent value="roc" className="space-y-6">
          <ROCCurve />
        </TabsContent>
      </Tabs>
    </div>
  )
}

