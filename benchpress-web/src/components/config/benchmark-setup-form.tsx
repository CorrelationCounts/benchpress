"use client"

// No flowbite-react imports needed
import { HiPlus, HiTrash } from "react-icons/hi"
import { BenchpressConfig, DataSetup } from "@/types/benchpress"

interface BenchmarkSetupFormProps {
  config: BenchpressConfig
  setConfig: (config: BenchpressConfig) => void
}

export function BenchmarkSetupForm({ config, setConfig }: BenchmarkSetupFormProps) {
  const updateBenchmarkTitle = (title: string) => {
    setConfig({
      ...config,
      benchmark_setup: [{
        ...config.benchmark_setup[0],
        title
      }]
    })
  }

  const addDataSetup = () => {
    const newDataSetup: DataSetup = {
      graph_id: "",
      parameters_id: "",
      data_id: "",
      seed_range: [1, 5]
    }
    
    setConfig({
      ...config,
      benchmark_setup: [{
        ...config.benchmark_setup[0],
        data: [...config.benchmark_setup[0].data, newDataSetup]
      }]
    })
  }

  const updateDataSetup = (index: number, field: keyof DataSetup, value: string | number | [number, number]) => {
    const updatedData = [...config.benchmark_setup[0].data]
    updatedData[index] = { ...updatedData[index], [field]: value }
    
    setConfig({
      ...config,
      benchmark_setup: [{
        ...config.benchmark_setup[0],
        data: updatedData
      }]
    })
  }

  const removeDataSetup = (index: number) => {
    const updatedData = config.benchmark_setup[0].data.filter((_, i) => i !== index)
    
    setConfig({
      ...config,
      benchmark_setup: [{
        ...config.benchmark_setup[0],
        data: updatedData
      }]
    })
  }

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Basic Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Set the title and basic configuration for your benchmark
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Benchmark Title
              </label>
              <input
                id="title"
                type="text"
                value={config.benchmark_setup[0]?.title || ""}
                onChange={(e) => updateBenchmarkTitle(e.target.value)}
                placeholder="Enter benchmark title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Setup */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Data Setup
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Configure the data generation parameters for your benchmark
              </p>
            </div>
            <button 
              onClick={addDataSetup}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <HiPlus className="mr-2 h-4 w-4" />
              Add Data Setup
            </button>
          </div>
          
          {config.benchmark_setup[0]?.data.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiPlus className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                No data setups configured. Click &quot;Add Data Setup&quot; to begin.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {config.benchmark_setup[0].data.map((dataSetup, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Data Setup {index + 1}
                    </h4>
                    <button
                      onClick={() => removeDataSetup(index)}
                      className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      <HiTrash className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`graph_id_${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Graph ID
                      </label>
                      <input
                        id={`graph_id_${index}`}
                        type="text"
                        value={dataSetup.graph_id}
                        onChange={(e) => updateDataSetup(index, 'graph_id', e.target.value)}
                        placeholder="e.g., avneigs4_p20"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`parameters_id_${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Parameters ID
                      </label>
                      <input
                        id={`parameters_id_${index}`}
                        type="text"
                        value={dataSetup.parameters_id}
                        onChange={(e) => updateDataSetup(index, 'parameters_id', e.target.value)}
                        placeholder="e.g., SEM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`data_id_${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data ID
                      </label>
                      <input
                        id={`data_id_${index}`}
                        type="text"
                        value={dataSetup.data_id}
                        onChange={(e) => updateDataSetup(index, 'data_id', e.target.value)}
                        placeholder="e.g., standardized"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor={`seed_range_${index}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Seed Range
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={dataSetup.seed_range[0]}
                          onChange={(e) => updateDataSetup(index, 'seed_range', [parseInt(e.target.value), dataSetup.seed_range[1]])}
                          placeholder="From"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <input
                          type="number"
                          value={dataSetup.seed_range[1]}
                          onChange={(e) => updateDataSetup(index, 'seed_range', [dataSetup.seed_range[0], parseInt(e.target.value)])}
                          placeholder="To"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
