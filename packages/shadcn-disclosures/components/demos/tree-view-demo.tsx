"use client"

import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  Tree,
  TreeItem,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"
import { Folder, File, ImageIcon, FileText, Code2, Settings, Database } from "lucide-react"

export function TreeViewDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          {"<Tree /> <TreeItem />"}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Tree View</h2>
        <p className="text-muted-foreground">
          Hierarchical navigation for file systems, categories, or any tree-structured data. 
          Supports keyboard navigation with arrow keys.
        </p>
      </div>

      {/* File System Example */}
      <Section>
        <SectionHeader>
          <SectionTitle>File System Navigation</SectionTitle>
          <SectionDescription>
            A typical file browser pattern. Use arrow keys to navigate and expand/collapse folders.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Tree>
            <TreeItem 
              label="project" 
              icon={<Folder className="h-4 w-4" />}
              defaultOpen
            >
              <TreeItem 
                label="src" 
                icon={<Folder className="h-4 w-4" />}
                defaultOpen
              >
                <TreeItem 
                  label="components" 
                  icon={<Folder className="h-4 w-4" />}
                >
                  <TreeItem 
                    label="Button.tsx" 
                    icon={<Code2 className="h-4 w-4" />}
                  />
                  <TreeItem 
                    label="Input.tsx" 
                    icon={<Code2 className="h-4 w-4" />}
                  />
                  <TreeItem 
                    label="Disclosure.tsx" 
                    icon={<Code2 className="h-4 w-4" />}
                  />
                </TreeItem>
                <TreeItem 
                  label="lib" 
                  icon={<Folder className="h-4 w-4" />}
                >
                  <TreeItem 
                    label="utils.ts" 
                    icon={<Code2 className="h-4 w-4" />}
                  />
                </TreeItem>
                <TreeItem 
                  label="App.tsx" 
                  icon={<Code2 className="h-4 w-4" />}
                />
                <TreeItem 
                  label="index.tsx" 
                  icon={<Code2 className="h-4 w-4" />}
                />
              </TreeItem>
              <TreeItem 
                label="public" 
                icon={<Folder className="h-4 w-4" />}
              >
                <TreeItem 
                  label="images" 
                  icon={<Folder className="h-4 w-4" />}
                >
                  <TreeItem 
                    label="logo.png" 
                    icon={<ImageIcon className="h-4 w-4" />}
                  />
                  <TreeItem 
                    label="hero.jpg" 
                    icon={<ImageIcon className="h-4 w-4" />}
                  />
                </TreeItem>
                <TreeItem 
                  label="favicon.ico" 
                  icon={<File className="h-4 w-4" />}
                />
              </TreeItem>
              <TreeItem 
                label="package.json" 
                icon={<FileText className="h-4 w-4" />}
              />
              <TreeItem 
                label="README.md" 
                icon={<FileText className="h-4 w-4" />}
              />
            </TreeItem>
          </Tree>
        </SectionContent>
      </Section>

      {/* Category Navigation */}
      <Section>
        <SectionHeader>
          <SectionTitle>Category Navigation</SectionTitle>
          <SectionDescription>
            Organizing settings or navigation into collapsible categories.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Tree>
            <TreeItem 
              label="General Settings" 
              icon={<Settings className="h-4 w-4" />}
              defaultOpen
            >
              <TreeItem label="Account" />
              <TreeItem label="Notifications" />
              <TreeItem label="Privacy" />
            </TreeItem>
            <TreeItem 
              label="Data Management" 
              icon={<Database className="h-4 w-4" />}
            >
              <TreeItem label="Import" />
              <TreeItem label="Export" />
              <TreeItem label="Backup" />
              <TreeItem label="Delete Account" />
            </TreeItem>
            <TreeItem 
              label="Appearance" 
              icon={<ImageIcon className="h-4 w-4" />}
            >
              <TreeItem label="Theme" />
              <TreeItem label="Colors" />
              <TreeItem label="Typography" />
            </TreeItem>
          </Tree>
        </SectionContent>
      </Section>

      {/* Keyboard Navigation */}
      <div className="p-4 rounded-lg border border-border bg-card">
        <h3 className="font-medium text-foreground mb-3">Keyboard Navigation</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-4">
            <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">Tab</kbd>
            <span className="text-muted-foreground">Navigate between items</span>
          </div>
          <div className="flex items-center gap-4">
            <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">Enter</kbd>
            <span className="text-muted-foreground">Expand/collapse folder</span>
          </div>
          <div className="flex items-center gap-4">
            <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">→</kbd>
            <span className="text-muted-foreground">Expand folder</span>
          </div>
          <div className="flex items-center gap-4">
            <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">←</kbd>
            <span className="text-muted-foreground">Collapse folder</span>
          </div>
        </div>
      </div>
    </div>
  )
}
