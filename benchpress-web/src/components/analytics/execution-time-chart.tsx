"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const executionData = [
  { run: "Run 1", PC: 45, FGES: 120, Tabu: 89, ITSearch: 156 },
  { run: "Run 2", PC: 48, FGES: 115, Tabu: 92, ITSearch: 162 },
  { run: "Run 3", PC: 42, FGES: 125, Tabu: 85, ITSearch: 148 },
  { run: "Run 4", PC: 46, FGES: 118, Tabu: 88, ITSearch: 159 },
  { run: "Run 5", PC: 44, FGES: 122, Tabu: 91, ITSearch: 154 },
  { run: "Run 6", PC: 47, FGES: 119, Tabu: 87, ITSearch: 157 }
]

export function ExecutionTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Execution Time Trends</CardTitle>
        <CardDescription>
          Algorithm execution times across different benchmark runs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={executionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="run" />
            <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="PC" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="FGES" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Tabu" stroke="#f59e0b" strokeWidth={2} />
            <Line type="monotone" dataKey="ITSearch" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

