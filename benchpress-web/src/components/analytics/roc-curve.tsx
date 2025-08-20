"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const rocData = [
  { fpr: 0, PC: 0, FGES: 0, Tabu: 0, ITSearch: 0 },
  { fpr: 0.1, PC: 0.15, FGES: 0.22, Tabu: 0.18, ITSearch: 0.20 },
  { fpr: 0.2, PC: 0.35, FGES: 0.45, Tabu: 0.40, ITSearch: 0.42 },
  { fpr: 0.3, PC: 0.52, FGES: 0.62, Tabu: 0.58, ITSearch: 0.60 },
  { fpr: 0.4, PC: 0.66, FGES: 0.74, Tabu: 0.71, ITSearch: 0.73 },
  { fpr: 0.5, PC: 0.76, FGES: 0.82, Tabu: 0.80, ITSearch: 0.81 },
  { fpr: 0.6, PC: 0.84, FGES: 0.89, Tabu: 0.87, ITSearch: 0.88 },
  { fpr: 0.7, PC: 0.90, FGES: 0.93, Tabu: 0.92, ITSearch: 0.92 },
  { fpr: 0.8, PC: 0.94, FGES: 0.96, Tabu: 0.95, ITSearch: 0.96 },
  { fpr: 0.9, PC: 0.97, FGES: 0.98, Tabu: 0.97, ITSearch: 0.98 },
  { fpr: 1.0, PC: 1.0, FGES: 1.0, Tabu: 1.0, ITSearch: 1.0 }
]

export function ROCCurve() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ROC Curves</CardTitle>
        <CardDescription>
          Receiver Operating Characteristic curves for algorithm comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={rocData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="fpr" 
              label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
              domain={[0, 1]}
            />
            <YAxis 
              label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
              domain={[0, 1]}
            />
            <Tooltip 
              formatter={(value, name) => [Number(value).toFixed(3), name]}
              labelFormatter={(label) => `FPR: ${Number(label).toFixed(2)}`}
            />
            <Legend />
            
            {/* Diagonal reference line */}
            <Line 
              type="monotone" 
              dataKey="fpr" 
              stroke="#9ca3af" 
              strokeDasharray="5 5" 
              strokeWidth={1}
              dot={false}
              name="Random"
            />
            
            <Line type="monotone" dataKey="PC" stroke="#3b82f6" strokeWidth={2} name="PC (AUC: 0.81)" />
            <Line type="monotone" dataKey="FGES" stroke="#10b981" strokeWidth={2} name="FGES (AUC: 0.88)" />
            <Line type="monotone" dataKey="Tabu" stroke="#f59e0b" strokeWidth={2} name="Tabu (AUC: 0.85)" />
            <Line type="monotone" dataKey="ITSearch" stroke="#ef4444" strokeWidth={2} name="ITSearch (AUC: 0.86)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

