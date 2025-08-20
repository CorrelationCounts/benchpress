import Link from "next/link"
import { 
  HiPlay, 
  HiCog, 
  HiPresentationChartBar, 
  HiPlus,
  HiCheckCircle,
  HiClock
} from "react-icons/hi"

export default function HomePage() {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Benchpress Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Manage your structure learning benchmarks and analyze results
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm font-medium text-blue-100">Active Runs</h3>
              <p className="text-3xl font-bold text-white">2</p>
              <p className="text-sm text-blue-100">Currently running benchmarks</p>
            </div>
            <HiPlay className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm font-medium text-green-100">Configurations</h3>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-sm text-green-100">Saved configurations</p>
            </div>
            <HiCog className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-sm font-medium text-purple-100">Completed Runs</h3>
              <p className="text-3xl font-bold text-white">24</p>
              <p className="text-sm text-purple-100">Total completed benchmarks</p>
            </div>
            <HiPresentationChartBar className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Quick Actions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started with common tasks
            </p>
            
            <div className="space-y-4">
              <Link href="/config/new" className="block">
                <button className="w-full flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                  <HiPlus className="mr-3 h-5 w-5" />
                  Create New Configuration
                </button>
              </Link>
              
              <Link href="/runs" className="block">
                <button className="w-full flex items-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
                  <HiPlay className="mr-3 h-5 w-5" />
                  View All Runs
                </button>
              </Link>
              
              <Link href="/dashboard" className="block">
                <button className="w-full flex items-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
                  <HiPresentationChartBar className="mr-3 h-5 w-5" />
                  Analytics Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Recent Activity
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Latest benchmark runs and results
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <HiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Minimal Config Completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <HiClock className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Tetrad FGES Running
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    15 minutes ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <HiCheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    PC Algorithm Completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}