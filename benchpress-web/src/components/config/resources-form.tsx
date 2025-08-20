"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BenchpressConfig } from "@/types/benchpress"

interface ResourcesFormProps {
  config: BenchpressConfig
  setConfig: (config: BenchpressConfig) => void
}

export function ResourcesForm({ config, setConfig }: ResourcesFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources Configuration</CardTitle>
        <CardDescription>
          Define the resources for data generation, graph structure, parameters, and algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="graph">Graph</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Data Resources</h4>
              <p className="text-sm text-gray-500">
                Configure data sampling methods. Common options include:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
                <li><strong>IID:</strong> Independent and identically distributed data</li>
                <li><strong>gcastle_iidsim:</strong> GCastle simulation methods</li>
                <li><strong>mvpc_gen_data:</strong> Multi-variate PC data generation</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="graph" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Graph Resources</h4>
              <p className="text-sm text-gray-500">
                Configure graph generation methods. Available options include:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
                <li><strong>pcalg_randdag:</strong> Random DAG generation from pcalg</li>
                <li><strong>bdgraph_graphsim:</strong> BDgraph simulation</li>
                <li><strong>trilearn_cta:</strong> Trilearn chordal tree approximation</li>
                <li><strong>gcastle_dag:</strong> GCastle DAG generation</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Parameter Resources</h4>
              <p className="text-sm text-gray-500">
                Configure parameter generation for different model types:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
                <li><strong>sem_params:</strong> Structural equation model parameters</li>
                <li><strong>bdgraph_rgwish:</strong> Bayesian parameter sampling</li>
                <li><strong>bin_bn:</strong> Binary Bayesian network parameters</li>
                <li><strong>trilearn_g_inv_wishart:</strong> Inverse Wishart parameters</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="algorithms" className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-4">Algorithm Resources</h4>
              <p className="text-sm text-gray-500">
                Configure structure learning algorithms. Popular choices include:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1 list-disc list-inside">
                <li><strong>PC Algorithm:</strong> Constraint-based structure learning</li>
                <li><strong>FGES:</strong> Score-based greedy equivalence search</li>
                <li><strong>Tabu Search:</strong> Local search optimization</li>
                <li><strong>MCMC Methods:</strong> Bayesian structure learning</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

