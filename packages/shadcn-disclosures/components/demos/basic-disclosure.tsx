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
import { Code, Lightbulb } from "lucide-react"

export function BasicDisclosureDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          {"<Details /> <Summary /> <Content />"}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Basic Disclosure</h2>
        <p className="text-muted-foreground">
          The foundational building blocks. A Summary acts as the visible trigger, 
          while Content holds information that appears on interaction.
        </p>
      </div>

      {/* Basic Example */}
      <Section>
        <SectionHeader>
          <SectionTitle>Single Disclosure</SectionTitle>
          <SectionDescription>
            Click the summary to reveal hidden content. Notice the smooth animation and rotation indicator.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Details>
            <Summary>What is progressive disclosure?</Summary>
            <Content>
              <p className="text-muted-foreground leading-relaxed">
                Progressive disclosure is an interaction design pattern that sequences information 
                and actions across several screens in order to reduce feelings of overwhelm for 
                the user. The idea is to show only essential or requested information at first, 
                providing additional details on demand.
              </p>
            </Content>
          </Details>
        </SectionContent>
      </Section>

      {/* Variant Examples */}
      <Section>
        <SectionHeader>
          <SectionTitle>Indicator Variants</SectionTitle>
          <SectionDescription>
            Different visual indicators communicate expandability in various ways.
          </SectionDescription>
        </SectionHeader>
        <SectionContent className="space-y-3">
          <Details variant="chevron">
            <Summary>Chevron Indicator (Default)</Summary>
            <Content>
              <p className="text-sm text-muted-foreground">
                The chevron rotates 90° when expanded, providing a clear directional cue.
              </p>
            </Content>
          </Details>

          <Details variant="plus">
            <Summary>Plus/Minus Indicator</Summary>
            <Content>
              <p className="text-sm text-muted-foreground">
                Plus transforms to minus when expanded. Common in FAQ patterns and form builders.
              </p>
            </Content>
          </Details>

          <Details variant="arrow">
            <Summary>Arrow Down Indicator</Summary>
            <Content>
              <p className="text-sm text-muted-foreground">
                Arrow rotates 180° when expanded. Often used in dropdown-style disclosures.
              </p>
            </Content>
          </Details>
        </SectionContent>
      </Section>

      {/* Usage Guidelines */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm text-foreground">Implementation</span>
          </div>
          <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto font-mono text-foreground">
{`<Details>
  <Summary>
    Click to expand
  </Summary>
  <Content>
    Hidden content here
  </Content>
</Details>`}
          </pre>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm text-foreground">Best Practices</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Keep summaries concise and descriptive
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Use consistent indicator styles per context
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              Ensure content is meaningful when revealed
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
