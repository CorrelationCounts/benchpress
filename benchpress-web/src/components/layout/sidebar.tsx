"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  HiChartPie,
  HiCog,
  HiPlay,
  HiPresentationChartBar,
  HiDocumentText,
  HiDatabase,
  HiCode
} from "react-icons/hi"

const navigation = [
  { name: "Dashboard", href: "/", icon: HiChartPie },
  { name: "Configurations", href: "/config", icon: HiCog },
  { name: "Runs", href: "/runs", icon: HiPlay },
  { name: "Analytics", href: "/dashboard", icon: HiPresentationChartBar },
  { name: "Data Sources", href: "/data", icon: HiDatabase },
  { name: "Algorithms", href: "/algorithms", icon: HiCode },
  { name: "Documentation", href: "/docs", icon: HiDocumentText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Benchpress</h1>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
