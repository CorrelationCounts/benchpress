"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const comparisonData = [
  { algorithm: "PC", f1_score: 0.75, shd: 12.3, execution_time: 45 },
  { algorithm: "FGES", f1_score: 0.81, shd: 8.7, execution_time: 120 },
  { algorithm: "Tabu", f1_score: 0.78, shd: 10.1, execution_time: 89 },
  { algorithm: "ITSearch", f1_score: 0.79, shd: 9.5, execution_time: 156 },
  { algorithm: "BOSS", f1_score: 0.76, shd: 11.2, execution_time: 78 },
  { algorithm: "GES", f1_score: 0.82, shd: 8.1, execution_time: 134 },
  { algorithm: "MMHC", f1_score: 0.74, shd: 13.1, execution_time: 67 },
  { algorithm: "Hill Climbing", f1_score: 0.77, shd: 10.8, execution_time: 92 }
]

export function AlgorithmComparison() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>F1 Score vs SHD</CardTitle>
          <CardDescription>
            Trade-off between accuracy (F1) and structural differences (SHD)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={comparisonData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shd" name="SHD" type="number" domain={['dataMin - 1', 'dataMax + 1']} />
              <YAxis dataKey="f1_score" name="F1 Score" type="number" domain={[0.7, 0.85]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-medium">{data.algorithm}</p>
                        <p>F1 Score: {data.f1_score.toFixed(3)}</p>
                        <p>SHD: {data.shd}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="f1_score" fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>F1 Score vs Execution Time</CardTitle>
          <CardDescription>
            Performance vs computational cost analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={comparisonData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="execution_time" name="Time (s)" type="number" />
              <YAxis dataKey="f1_score" name="F1 Score" type="number" domain={[0.7, 0.85]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-medium">{data.algorithm}</p>
                        <p>F1 Score: {data.f1_score.toFixed(3)}</p>
                        <p>Time: {data.execution_time}s</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter dataKey="f1_score" fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

