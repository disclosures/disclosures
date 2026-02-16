import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          Progressive Disclosure
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Disclosure UI Kit
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A comprehensive collection of progressive disclosure components for building
          accessible, human-centric interfaces. Built on semantic HTML with full keyboard
          navigation and screen reader support.
        </p>
      </div>
    </div>
  )
}
