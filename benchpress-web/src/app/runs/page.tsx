"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Play, 
  Pause, 
  Square, 
  Eye, 
  Download, 
  Clock,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react"
import Link from "next/link"

const mockRuns = [
  {
    id: "run_001",
    title: "Example Config - Run 1",
    config: "example_config",
    status: "completed",
    startTime: "2024-01-15 14:30:00",
    endTime: "2024-01-15 15:45:00",
    duration: "1h 15m",
    algorithms: ["pc-gaussCItest", "fges-sem-bic", "tabu-bge"],
    metrics: {
      avgSHD: 12.5,
      avgF1: 0.78,
      avgPrecision: 0.82
    }
  },
  {
    id: "run_002", 
    title: "Tetrad Suite - Large Scale",
    config: "tetrad_suite",
    status: "running",
    startTime: "2024-01-15 16:00:00",
    endTime: null,
    duration: "45m (ongoing)",
    algorithms: ["tetrad_fges", "tetrad_boss", "tetrad_grasp"],
    progress: 65
  },
  {
    id: "run_003",
    title: "MCMC Methods Comparison", 
    config: "mcmc_methods",
    status: "failed",
    startTime: "2024-01-15 12:00:00",
    endTime: "2024-01-15 12:15:00",
    duration: "15m",
    algorithms: ["bidag_itsearch", "bdgraph"],
    error: "Memory allocation error"
  },
  {
    id: "run_004",
    title: "PC vs GES Benchmark",
    config: "pc_vs_ges", 
    status: "queued",
    startTime: null,
    endTime: null,
    duration: "Waiting...",
    algorithms: ["pcalg_pc", "tetrad_fges"]
  }
]

export default function RunsPage() {
  const [filter, setFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRuns = mockRuns.filter(run => {
    const matchesSearch = run.title.toLowerCase().includes(filter.toLowerCase()) ||
                         run.config.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = statusFilter === "all" || run.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "running":
        return <Play className="h-4 w-4 text-blue-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "queued":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "queued":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Benchmark Runs
          </h1>
          <p className="text-gray-600">
            Monitor and manage your structure learning benchmark executions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <Input
          placeholder="Search runs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="all">All Status</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="queued">Queued</option>
        </select>
      </div>

      {/* Runs List */}
      <div className="space-y-4">
        {filteredRuns.map((run) => (
          <Card key={run.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(run.status)}
                  <div>
                    <CardTitle className="text-lg">{run.title}</CardTitle>
                    <CardDescription>
                      Config: {run.config} • ID: {run.id}
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(run.status)}>
                  {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-sm text-gray-600">{run.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Start Time</p>
                  <p className="text-sm text-gray-600">{run.startTime || "Not started"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Algorithms</p>
                  <p className="text-sm text-gray-600">{run.algorithms.length} configured</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Status Details</p>
                  {run.status === "running" && run.progress && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full transition-all"
                          style={{ width: `${run.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{run.progress}%</span>
                    </div>
                  )}
                  {run.status === "failed" && run.error && (
                    <p className="text-sm text-red-600">{run.error}</p>
                  )}
                  {run.status === "completed" && run.metrics && (
                    <div className="text-sm text-gray-600">
                      SHD: {run.metrics.avgSHD}, F1: {run.metrics.avgF1}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Link href={`/runs/${run.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                </Link>
                
                {run.status === "running" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Pause className="mr-2 h-3 w-3" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Square className="mr-2 h-3 w-3" />
                      Stop
                    </Button>
                  </>
                )}
                
                {run.status === "completed" && (
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" />
                    Download Results
                  </Button>
                )}
                
                {(run.status === "failed" || run.status === "completed") && (
                  <Button variant="outline" size="sm">
                    <Play className="mr-2 h-3 w-3" />
                    Restart
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRuns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No runs found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

