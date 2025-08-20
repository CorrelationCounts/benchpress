"use client"

import { ConfigBuilder } from "@/components/config/config-builder"

export default function NewConfigPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Configuration
        </h1>
        <p className="text-gray-600">
          Build a new Benchpress configuration for your structure learning experiments
        </p>
      </div>
      <ConfigBuilder />
    </div>
  )
}

