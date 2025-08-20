"use client"

import { useState } from "react"
// No flowbite-react imports needed
import { HiSave, HiPlay, HiDownload, HiEye } from "react-icons/hi"
import { BenchmarkSetupForm } from "./benchmark-setup-form"
import { ResourcesForm } from "./resources-form"
import { ConfigPreview } from "./config-preview"
import { BenchpressConfig } from "@/types/benchpress"

export function ConfigBuilder() {
  const [config, setConfig] = useState<BenchpressConfig>({
    benchmark_setup: [{
      title: "",
      data: [],
      evaluation: {}
    }],
    resources: {
      data: {},
      graph: {},
      parameters: {},
      structure_learning_algorithms: {}
    }
  })

  const [activeTab, setActiveTab] = useState(0)

  const handleSave = () => {
    console.log("Saving configuration:", config)
  }

  const handleRun = () => {
    console.log("Running benchmark with config:", config)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${config.benchmark_setup[0]?.title || 'config'}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex space-x-3">
          <button 
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <HiSave className="mr-2 h-5 w-5" />
            Save Configuration
          </button>
          <button 
            onClick={handleRun}
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <HiPlay className="mr-2 h-5 w-5" />
            Run Benchmark
          </button>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <HiDownload className="mr-2 h-4 w-4" />
            Export JSON
          </button>
          <button 
            onClick={() => setActiveTab(3)}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <HiEye className="mr-2 h-4 w-4" />
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {['Benchmark Setup', 'Resources', 'Algorithms', 'Preview'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 0 && <BenchmarkSetupForm config={config} setConfig={setConfig} />}
          {activeTab === 1 && <ResourcesForm config={config} setConfig={setConfig} />}
          {activeTab === 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Structure Learning Algorithms
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Configure the algorithms to include in your benchmark
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200">
                  ⚡ Algorithm configuration interface coming soon...
                </p>
              </div>
            </div>
          )}
          {activeTab === 3 && <ConfigPreview config={config} />}
        </div>
      </div>
    </div>
  )
}
