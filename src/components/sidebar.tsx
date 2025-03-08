"use client"

import Link from "next/link"
import { LayoutDashboard, Brain, Briefcase } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-full md:w-60 bg-white border-r border-gray-200 md:min-h-screen">
      <div className="p-4 border-b">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold text-lg"
          onClick={() => setActiveTab("dashboard")}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          <li>
            <Link
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                activeTab === "skill-test" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("skill-test")}
            >
              <Brain className="w-5 h-5" />
              <span>Skill Test</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                activeTab === "internship" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("internship")}
            >
              <Briefcase className="w-5 h-5" />
              <span>Internship</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

