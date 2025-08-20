"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const performanceData = [
  {
    algorithm: "PC",
    f1_score: 0.75,
    precision: 0.82,
    recall: 0.69,
    shd: 12.3
  },
  {
    algorithm: "FGES",
    f1_score: 0.81,
    precision: 0.85,
    recall: 0.78,
    shd: 8.7
  },
  {
    algorithm: "Tabu",
    f1_score: 0.78,
    precision: 0.83,
    recall: 0.74,
    shd: 10.1
  },
  {
    algorithm: "ITSearch",
    f1_score: 0.79,
    precision: 0.84,
    recall: 0.75,
    shd: 9.5
  },
  {
    algorithm: "BOSS",
    f1_score: 0.76,
    precision: 0.81,
    recall: 0.72,
    shd: 11.2
  }
]

export function PerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics by Algorithm</CardTitle>
        <CardDescription>
          Comparison of F1 score, precision, and recall across different algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="algorithm" />
            <YAxis domain={[0, 1]} />
            <Tooltip formatter={(value, name) => [Number(value).toFixed(3), name]} />
            <Legend />
            <Bar dataKey="f1_score" fill="#3b82f6" name="F1 Score" />
            <Bar dataKey="precision" fill="#10b981" name="Precision" />
            <Bar dataKey="recall" fill="#f59e0b" name="Recall" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

