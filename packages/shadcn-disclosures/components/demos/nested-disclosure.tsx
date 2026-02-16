"use client"

import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  Details,
  Summary,
  Content,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

export function NestedDisclosureDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          Hierarchical Nesting
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Nested Hierarchy</h2>
        <p className="text-muted-foreground">
          Disclosures can be nested to create multi-level hierarchies. Visual depth is automatically 
          communicated through subtle background color changes.
        </p>
      </div>

      {/* Depth Indicator */}
      <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
        <Info className="h-5 w-5 text-muted-foreground shrink-0" />
        <p className="text-sm text-muted-foreground">
          Notice how each nesting level has a slightly darker background. This visual cue helps 
          users understand their position in the hierarchy.
        </p>
      </div>

      {/* Nested Example */}
      <Section>
        <SectionHeader>
          <SectionTitle>Documentation Structure</SectionTitle>
          <SectionDescription>
            An example of nested disclosures organizing documentation content.
          </SectionDescription>
        </SectionHeader>
        <SectionContent className="space-y-3">
          <Details defaultOpen>
            <Summary>Getting Started</Summary>
            <Content className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Everything you need to know to start using the component library.
              </p>
              
              <Details>
                <Summary>Installation</Summary>
                <Content className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Install the package using your preferred package manager.
                  </p>
                  
                  <Details>
                    <Summary>npm</Summary>
                    <Content>
                      <pre className="text-xs bg-muted p-3 rounded-md font-mono text-foreground">
                        npm install @ui/disclosure
                      </pre>
                    </Content>
                  </Details>
                  
                  <Details>
                    <Summary>yarn</Summary>
                    <Content>
                      <pre className="text-xs bg-muted p-3 rounded-md font-mono text-foreground">
                        yarn add @ui/disclosure
                      </pre>
                    </Content>
                  </Details>
                  
                  <Details>
                    <Summary>pnpm</Summary>
                    <Content>
                      <pre className="text-xs bg-muted p-3 rounded-md font-mono text-foreground">
                        pnpm add @ui/disclosure
                      </pre>
                    </Content>
                  </Details>
                </Content>
              </Details>

              <Details>
                <Summary>Basic Usage</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground mb-3">
                    Import and use the components in your React application.
                  </p>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono text-foreground">
{`import { Details, Summary, Content } 
  from '@ui/disclosure'

function MyComponent() {
  return (
    <Details>
      <Summary>Click me</Summary>
      <Content>Hidden content</Content>
    </Details>
  )
}`}
                  </pre>
                </Content>
              </Details>
            </Content>
          </Details>

          <Details>
            <Summary>Components</Summary>
            <Content className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Reference documentation for all available components.
              </p>
              
              <Details>
                <Summary>Section</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground">
                    The top-level container component that groups related content with an optional 
                    header and content area.
                  </p>
                </Content>
              </Details>
              
              <Details>
                <Summary>Details</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground">
                    The expandable container that wraps Summary and Content components. 
                    Supports controlled and uncontrolled modes.
                  </p>
                </Content>
              </Details>
              
              <Details>
                <Summary>Summary</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground">
                    The always-visible trigger element. Includes an indicator icon and 
                    handles keyboard interactions.
                  </p>
                </Content>
              </Details>
            </Content>
          </Details>

          <Details>
            <Summary>API Reference</Summary>
            <Content>
              <p className="text-sm text-muted-foreground">
                Detailed API documentation for props, events, and styling options.
              </p>
            </Content>
          </Details>
        </SectionContent>
      </Section>

      {/* Depth Colors */}
      <Section>
        <SectionHeader>
          <SectionTitle>Visual Depth Levels</SectionTitle>
          <SectionDescription>
            Each nesting level uses a distinct background color for spatial awareness.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="space-y-2">
            <div className="flex items-center gap-4 p-3 rounded-md bg-disclosure-depth-1">
              <span className="text-sm font-medium text-foreground">Level 1</span>
              <span className="text-xs text-muted-foreground">bg-disclosure-depth-1</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-md bg-disclosure-depth-2 ml-4">
              <span className="text-sm font-medium text-foreground">Level 2</span>
              <span className="text-xs text-muted-foreground">bg-disclosure-depth-2</span>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-md bg-disclosure-depth-3 ml-8">
              <span className="text-sm font-medium text-foreground">Level 3</span>
              <span className="text-xs text-muted-foreground">bg-disclosure-depth-3</span>
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  )
}
