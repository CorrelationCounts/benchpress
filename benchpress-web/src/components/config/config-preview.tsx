"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BenchpressConfig } from "@/types/benchpress"

interface ConfigPreviewProps {
  config: BenchpressConfig
}

export function ConfigPreview({ config }: ConfigPreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration Preview</CardTitle>
        <CardDescription>
          JSON representation of your Benchpress configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
          <code>{JSON.stringify(config, null, 2)}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

