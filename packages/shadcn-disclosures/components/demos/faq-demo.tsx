"use client"

import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  DisclosureGroup,
  DisclosureItem,
  Summary,
  Content,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"

const faqItems = [
  {
    value: "item-1",
    question: "What is progressive disclosure?",
    answer: "Progressive disclosure is a design technique that sequences information and actions across several screens to reduce cognitive load. Instead of overwhelming users with all available options at once, you present the minimum viable information first and reveal more as needed.",
  },
  {
    value: "item-2",
    question: "When should I use this pattern?",
    answer: "Use progressive disclosure when dealing with complex information architecture, lengthy forms, detailed documentation, or any interface where showing everything at once would overwhelm users. It's particularly effective for FAQs, settings panels, and data-heavy dashboards.",
  },
  {
    value: "item-3",
    question: "How do I ensure accessibility?",
    answer: "The components are built with accessibility in mind. They use proper ARIA attributes (aria-expanded, aria-controls), support keyboard navigation (Enter/Space to toggle, Tab to navigate), and maintain focus management. Always ensure your summary text is descriptive enough for screen readers.",
  },
  {
    value: "item-4",
    question: "Can I control the open state programmatically?",
    answer: "Yes! All disclosure components support both controlled and uncontrolled modes. Use the 'open' and 'onOpenChange' props for controlled behavior, or 'defaultOpen' for uncontrolled. The DisclosureGroup component can manage single or multiple open states.",
  },
  {
    value: "item-5",
    question: "How deep can I nest disclosures?",
    answer: "Technically unlimited, but we recommend a maximum of 3 levels for usability. Each level is visually distinguished by a subtle background color change. Beyond 3 levels, consider restructuring your content or using alternative navigation patterns.",
  },
]

export function FAQDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          {"<DisclosureGroup /> <DisclosureItem />"}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ Pattern</h2>
        <p className="text-muted-foreground">
          The classic accordion pattern for FAQs and similar content. Choose between single 
          or multiple items being open simultaneously.
        </p>
      </div>

      {/* Single Mode */}
      <Section>
        <SectionHeader>
          <SectionTitle>Single Mode (Accordion)</SectionTitle>
          <SectionDescription>
            Only one item can be open at a time. Opening a new item automatically closes the previous one.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <DisclosureGroup type="single" defaultValue="item-1">
            {faqItems.slice(0, 3).map((item) => (
              <DisclosureItem key={item.value} value={item.value} variant="plus">
                <Summary>{item.question}</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </Content>
              </DisclosureItem>
            ))}
          </DisclosureGroup>
        </SectionContent>
      </Section>

      {/* Multiple Mode */}
      <Section>
        <SectionHeader>
          <SectionTitle>Multiple Mode</SectionTitle>
          <SectionDescription>
            Multiple items can be open simultaneously. Users have full control over what they want to see.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <DisclosureGroup type="multiple" defaultValue={["item-4"]}>
            {faqItems.slice(2, 5).map((item) => (
              <DisclosureItem key={item.value} value={item.value} variant="plus">
                <Summary>{item.question}</Summary>
                <Content>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </Content>
              </DisclosureItem>
            ))}
          </DisclosureGroup>
        </SectionContent>
      </Section>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-foreground">Feature</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Single Mode</th>
              <th className="px-4 py-3 text-left font-medium text-foreground">Multiple Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground">Open items at once</td>
              <td className="px-4 py-3 text-foreground">1</td>
              <td className="px-4 py-3 text-foreground">Unlimited</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground">Auto-collapse</td>
              <td className="px-4 py-3 text-foreground">Yes</td>
              <td className="px-4 py-3 text-foreground">No</td>
            </tr>
            <tr className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground">Best for</td>
              <td className="px-4 py-3 text-foreground">Limited space, focused reading</td>
              <td className="px-4 py-3 text-foreground">Comparison, reference</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
