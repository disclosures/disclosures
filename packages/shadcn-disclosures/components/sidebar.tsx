"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X, Layers, BookOpen, HelpCircle } from "lucide-react"

interface SidebarProps {
  sections: { id: string; label: string }[]
  activeSection: string
  onSectionChange: (id: string) => void
}

export function Sidebar({ sections, activeSection, onSectionChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleClick = (id: string) => {
    onSectionChange(id)
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-card border border-border shadow-sm hover:bg-accent transition-colors"
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">SDS Kit</h1>
                <p className="text-xs text-muted-foreground">Progressive Disclosure</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Components
              </p>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleClick(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    activeSection === section.id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      activeSection === section.id ? "bg-primary" : "bg-border"
                    )}
                  />
                  {section.label}
                </button>
              ))}
            </div>

            {/* Page links */}
            <div className="mt-6 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Documentation
              </p>
              <Link
                href="/about"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Philosophy
              </Link>
              <Link
                href="/faq"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                PRFAQ
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="px-3 py-2 rounded-md bg-muted/50">
              <p className="text-xs font-medium text-foreground">Tip</p>
              <p className="text-xs text-muted-foreground mt-1">
                Use keyboard navigation with Tab and Enter keys
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
