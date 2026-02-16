"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { BasicDisclosureDemo } from "@/components/demos/basic-disclosure"
import { NestedDisclosureDemo } from "@/components/demos/nested-disclosure"
import { FAQDemo } from "@/components/demos/faq-demo"
import { TreeViewDemo } from "@/components/demos/tree-view-demo"
import { StepperDemo } from "@/components/demos/stepper-demo"
import { SettingsPanelDemo } from "@/components/demos/settings-panel-demo"
import { DataTableDemo } from "@/components/demos/data-table-demo"
import { AccessibilityGuide } from "@/components/accessibility-guide"

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "basic", label: "Basic Disclosure" },
  { id: "nested", label: "Nested Hierarchy" },
  { id: "faq", label: "FAQ Pattern" },
  { id: "tree", label: "Tree View" },
  { id: "stepper", label: "Stepper" },
  { id: "settings", label: "Settings Panel" },
  { id: "data-table", label: "Data Table" },
  { id: "accessibility", label: "Accessibility" },
]

export default function UIKitShowcase() {
  const [activeSection, setActiveSection] = useState("introduction")

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 lg:pl-64">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <HeroSection />
            
            <div className="mt-16 space-y-24">
              <section id="basic" className="scroll-mt-8">
                <BasicDisclosureDemo />
              </section>
              
              <section id="nested" className="scroll-mt-8">
                <NestedDisclosureDemo />
              </section>
              
              <section id="faq" className="scroll-mt-8">
                <FAQDemo />
              </section>
              
              <section id="tree" className="scroll-mt-8">
                <TreeViewDemo />
              </section>
              
              <section id="stepper" className="scroll-mt-8">
                <StepperDemo />
              </section>
              
              <section id="settings" className="scroll-mt-8">
                <SettingsPanelDemo />
              </section>
              
              <section id="data-table" className="scroll-mt-8">
                <DataTableDemo />
              </section>
              
              <section id="accessibility" className="scroll-mt-8">
                <AccessibilityGuide />
              </section>
            </div>
            
            <footer className="mt-24 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Section Details Summary UI Kit — Built with progressive disclosure principles
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
