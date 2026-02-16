import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"
import {
  Keyboard,
  Eye,
  MonitorSmartphone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export function AccessibilityGuide() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          WCAG 2.1 Compliant
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Accessibility</h2>
        <p className="text-muted-foreground">
          Built with accessibility as a core principle. Every component follows WCAG 2.1 guidelines 
          and supports assistive technologies out of the box.
        </p>
      </div>

      {/* Key Features */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-3">
            <Keyboard className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Keyboard Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Full keyboard support with Tab, Enter, Space, and Arrow keys for all interactions.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-3">
            <Eye className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Screen Reader Support</h3>
          <p className="text-sm text-muted-foreground">
            Proper ARIA attributes and roles ensure content is announced correctly.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted mb-3">
            <MonitorSmartphone className="h-5 w-5 text-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Reduced Motion</h3>
          <p className="text-sm text-muted-foreground">
            Respects prefers-reduced-motion for users sensitive to animations.
          </p>
        </div>
      </div>

      {/* ARIA Attributes */}
      <Section>
        <SectionHeader>
          <SectionTitle>ARIA Implementation</SectionTitle>
          <SectionDescription>
            Semantic HTML and ARIA attributes ensure proper accessibility tree construction.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-foreground">Attribute</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Element</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">aria-expanded</td>
                  <td className="px-4 py-3 text-muted-foreground">Summary</td>
                  <td className="px-4 py-3 text-muted-foreground">Indicates current open/closed state</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">aria-controls</td>
                  <td className="px-4 py-3 text-muted-foreground">Summary</td>
                  <td className="px-4 py-3 text-muted-foreground">References the content being controlled</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">aria-hidden</td>
                  <td className="px-4 py-3 text-muted-foreground">Content</td>
                  <td className="px-4 py-3 text-muted-foreground">Hides collapsed content from screen readers</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">role="region"</td>
                  <td className="px-4 py-3 text-muted-foreground">Content</td>
                  <td className="px-4 py-3 text-muted-foreground">Defines the expandable content area</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">role="tree"</td>
                  <td className="px-4 py-3 text-muted-foreground">Tree</td>
                  <td className="px-4 py-3 text-muted-foreground">Identifies hierarchical navigation</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">role="treeitem"</td>
                  <td className="px-4 py-3 text-muted-foreground">TreeItem</td>
                  <td className="px-4 py-3 text-muted-foreground">Identifies items within a tree</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionContent>
      </Section>

      {/* Keyboard Shortcuts */}
      <Section>
        <SectionHeader>
          <SectionTitle>Keyboard Shortcuts</SectionTitle>
          <SectionDescription>
            All components are fully operable with keyboard only.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Disclosure & Accordion</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">Tab</kbd>
                  <span className="text-muted-foreground">Navigate between triggers</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">Enter</kbd>
                  <span className="text-muted-foreground">Toggle open/close state</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">Space</kbd>
                  <span className="text-muted-foreground">Toggle open/close state</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Tree View</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">→</kbd>
                  <span className="text-muted-foreground">Expand node / move to child</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">←</kbd>
                  <span className="text-muted-foreground">Collapse node / move to parent</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">Home</kbd>
                  <span className="text-muted-foreground">Move to first node</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs min-w-[60px] text-center">End</kbd>
                  <span className="text-muted-foreground">Move to last visible node</span>
                </div>
              </div>
            </div>
          </div>
        </SectionContent>
      </Section>

      {/* Best Practices */}
      <Section>
        <SectionHeader>
          <SectionTitle>Accessibility Best Practices</SectionTitle>
          <SectionDescription>
            Guidelines for implementing progressive disclosure accessibly.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Use descriptive summary text</p>
                <p className="text-sm text-muted-foreground">
                  The summary should clearly indicate what content will be revealed when expanded.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Maintain focus management</p>
                <p className="text-sm text-muted-foreground">
                  Focus should remain on the trigger after toggling. Don't automatically move focus into content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Provide skip links for long content</p>
                <p className="text-sm text-muted-foreground">
                  When using many nested levels, consider skip links to bypass multiple layers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Test with assistive technology</p>
                <p className="text-sm text-muted-foreground">
                  Regularly test with screen readers and keyboard-only navigation.
                </p>
              </div>
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  )
}
