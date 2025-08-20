import Link from "next/link"
import { HiPlus, HiCog, HiDuplicate, HiTrash } from "react-icons/hi"

const mockConfigs = [
  {
    id: "1",
    title: "Example Config",
    description: "Basic configuration with PC and FGES algorithms",
    algorithms: ["pc-gaussCItest", "fges-sem-bic"],
    lastModified: "2024-01-15",
    status: "active"
  },
  {
    id: "2", 
    title: "Tetrad Suite",
    description: "Comprehensive Tetrad algorithm comparison",
    algorithms: ["tetrad_fges", "tetrad_boss", "tetrad_grasp"],
    lastModified: "2024-01-14",
    status: "draft"
  },
  {
    id: "3",
    title: "MCMC Methods",
    description: "Bayesian MCMC structure learning algorithms",
    algorithms: ["bidag_itsearch", "bdgraph"],
    lastModified: "2024-01-13", 
    status: "active"
  }
]

export default function ConfigPage() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Configurations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your Benchpress configuration files
          </p>
        </div>
        <Link href="/config/new">
          <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg">
            <HiPlus className="mr-2 h-5 w-5" />
            New Configuration
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockConfigs.map((config) => (
          <div key={config.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {config.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {config.description}
                  </p>
                </div>
                <span 
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    config.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}
                >
                  {config.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Algorithms:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {config.algorithms.map((alg) => (
                      <span key={alg} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium rounded-md">
                        {alg}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last modified: {config.lastModified}
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link href={`/config/${config.id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                      <HiCog className="mr-2 h-4 w-4" />
                      Edit
                    </button>
                  </Link>
                  <button className="flex items-center px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    <HiDuplicate className="h-4 w-4" />
                  </button>
                  <button className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    <HiTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockConfigs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiCog className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No configurations yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started by creating your first Benchpress configuration.
          </p>
          <Link href="/config/new">
            <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
              <HiPlus className="mr-2 h-4 w-4" />
              Create Configuration
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
