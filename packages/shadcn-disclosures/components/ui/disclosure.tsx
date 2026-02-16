"use client"

import * as React from "react"
import { ChevronRight, Plus, Minus, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Context to manage disclosure state and depth
interface DisclosureContextValue {
  depth: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  variant: "chevron" | "plus" | "arrow"
}

const DisclosureContext = React.createContext<DisclosureContextValue | null>(null)

function useDisclosure() {
  const context = React.useContext(DisclosureContext)
  if (!context) {
    throw new Error("useDisclosure must be used within a Disclosure component")
  }
  return context
}

// Depth context for nested disclosures
const DepthContext = React.createContext(0)

function useDepth() {
  return React.useContext(DepthContext)
}

// ============================================
// Section Component - Top level container
// ============================================
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SectionHeader({ children, className, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

function SectionTitle({ children, className, ...props }: SectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

function SectionDescription({ children, className, ...props }: SectionDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground mt-1",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

interface SectionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function SectionContent({ children, className, ...props }: SectionContentProps) {
  return (
    <div
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================
// Details Component - Expandable container
// ============================================
interface DetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "chevron" | "plus" | "arrow"
}

function Details({
  children,
  className,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  variant = "chevron",
  ...props
}: DetailsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const parentDepth = useDepth()
  const depth = parentDepth + 1

  const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const setIsOpen = React.useCallback((newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen)
    }
  }, [onOpenChange, controlledOpen])

  const depthClass = depth === 1
    ? "bg-disclosure-depth-1"
    : depth === 2
    ? "bg-disclosure-depth-2"
    : "bg-disclosure-depth-3"

  return (
    <DisclosureContext.Provider value={{ depth, isOpen, setIsOpen, variant }}>
      <DepthContext.Provider value={depth}>
        <div
          data-state={isOpen ? "open" : "closed"}
          data-depth={depth}
          className={cn(
            "rounded-md border border-border transition-colors",
            depthClass,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DepthContext.Provider>
    </DisclosureContext.Provider>
  )
}

// ============================================
// Summary Component - Clickable trigger
// ============================================
interface SummaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  showIndicator?: boolean
}

function Summary({
  children,
  className,
  showIndicator = true,
  ...props
}: SummaryProps) {
  const { isOpen, setIsOpen, variant, depth } = useDisclosure()

  const IndicatorIcon = React.useMemo(() => {
    if (variant === "plus") {
      return isOpen ? Minus : Plus
    }
    if (variant === "arrow") {
      return ChevronDown
    }
    return ChevronRight
  }, [variant, isOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  return (
    <button
      type="button"
      role="button"
      aria-expanded={isOpen}
      aria-controls={`details-content-${depth}`}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3",
        "text-left font-medium text-foreground",
        "transition-colors duration-200",
        "hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {showIndicator && (
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded transition-transform duration-200",
            "text-disclosure-indicator",
            variant === "chevron" && isOpen && "rotate-90",
            variant === "arrow" && isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          <IndicatorIcon className="h-4 w-4" />
        </span>
      )}
    </button>
  )
}

// ============================================
// Content Component - Expandable content
// ============================================
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Content({ children, className, ...props }: ContentProps) {
  const { isOpen, depth } = useDisclosure()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  return (
    <div
      id={`details-content-${depth}`}
      role="region"
      aria-hidden={!isOpen}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      style={{
        height: isOpen ? height : 0,
      }}
    >
      <div
        ref={contentRef}
        className={cn("px-4 pb-4 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

// ============================================
// DisclosureGroup - For managing multiple disclosures
// ============================================
interface DisclosureGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

interface DisclosureGroupContextValue {
  type: "single" | "multiple"
  value: string[]
  onToggle: (itemValue: string) => void
}

const DisclosureGroupContext = React.createContext<DisclosureGroupContextValue | null>(null)

function DisclosureGroup({
  children,
  className,
  type = "multiple",
  defaultValue = [],
  value: controlledValue,
  onValueChange,
  ...props
}: DisclosureGroupProps) {
  const normalizedDefault = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(normalizedDefault)

  const value = controlledValue !== undefined
    ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : uncontrolledValue

  const onToggle = React.useCallback((itemValue: string) => {
    const newValue = type === "single"
      ? (value.includes(itemValue) ? [] : [itemValue])
      : (value.includes(itemValue)
          ? value.filter(v => v !== itemValue)
          : [...value, itemValue])

    if (onValueChange) {
      onValueChange(type === "single" ? (newValue[0] || "") : newValue)
    }
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue)
    }
  }, [type, value, onValueChange, controlledValue])

  return (
    <DisclosureGroupContext.Provider value={{ type, value, onToggle }}>
      <div
        role="group"
        className={cn("space-y-2", className)}
        {...props}
      >
        {children}
      </div>
    </DisclosureGroupContext.Provider>
  )
}

// ============================================
// DisclosureItem - Item within a group
// ============================================
interface DisclosureItemProps extends Omit<DetailsProps, "open" | "onOpenChange"> {
  value: string
}

function DisclosureItem({ value, children, ...props }: DisclosureItemProps) {
  const groupContext = React.useContext(DisclosureGroupContext)

  if (groupContext) {
    const isOpen = groupContext.value.includes(value)
    return (
      <Details
        open={isOpen}
        onOpenChange={() => groupContext.onToggle(value)}
        {...props}
      >
        {children}
      </Details>
    )
  }

  return <Details {...props}>{children}</Details>
}

// ============================================
// Tree View Components - For hierarchical data
// ============================================
interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

function Tree({ children, className, ...props }: TreeProps) {
  return (
    <div
      role="tree"
      className={cn("space-y-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  defaultOpen?: boolean
  label: React.ReactNode
  icon?: React.ReactNode
  level?: number
}

function TreeItem({
  children,
  className,
  defaultOpen = false,
  label,
  icon,
  level = 0,
  ...props
}: TreeItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const hasChildren = React.Children.count(children) > 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (hasChildren) {
        setIsOpen(!isOpen)
      }
    }
    if (e.key === "ArrowRight" && hasChildren && !isOpen) {
      setIsOpen(true)
    }
    if (e.key === "ArrowLeft" && hasChildren && isOpen) {
      setIsOpen(false)
    }
  }

  return (
    <div
      role="treeitem"
      aria-expanded={hasChildren ? isOpen : undefined}
      className={cn("", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer",
          "hover:bg-accent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        style={{ paddingLeft: `${(level * 16) + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
        ) : (
          <span className="w-4" />
        )}
        {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}
        <span className="text-sm">{label}</span>
      </div>
      {hasChildren && isOpen && (
        <div role="group" className="mt-1">
          {React.Children.map(children, (child) => {
            if (React.isValidElement<TreeItemProps>(child)) {
              return React.cloneElement(child, { level: level + 1 })
            }
            return child
          })}
        </div>
      )}
    </div>
  )
}

// ============================================
// Collapsible Panel - Sidebar style
// ============================================
interface CollapsiblePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title: string
  defaultOpen?: boolean
  badge?: React.ReactNode
}

function CollapsiblePanel({
  children,
  className,
  title,
  defaultOpen = true,
  badge,
  ...props
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-sm font-medium text-foreground",
          "hover:bg-accent/50 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        )}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {title}
          {badge}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  )
}

// ============================================
// Stepper - Progressive form disclosure
// ============================================
interface StepperContextValue {
  currentStep: number
  totalSteps: number
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  canGoNext: boolean
  canGoPrev: boolean
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepper() {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error("useStepper must be used within a Stepper component")
  }
  return context
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultStep?: number
  step?: number
  onStepChange?: (step: number) => void
}

function Stepper({
  children,
  className,
  defaultStep = 1,
  step: controlledStep,
  onStepChange,
  ...props
}: StepperProps) {
  const [uncontrolledStep, setUncontrolledStep] = React.useState(defaultStep)
  const currentStep = controlledStep !== undefined ? controlledStep : uncontrolledStep

  const childArray = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.type as React.ComponentType).displayName === "Step"
  )
  const totalSteps = childArray.length

  const goToStep = React.useCallback((step: number) => {
    const clampedStep = Math.max(1, Math.min(step, totalSteps))
    if (onStepChange) {
      onStepChange(clampedStep)
    }
    if (controlledStep === undefined) {
      setUncontrolledStep(clampedStep)
    }
  }, [totalSteps, onStepChange, controlledStep])

  const nextStep = () => goToStep(currentStep + 1)
  const prevStep = () => goToStep(currentStep - 1)

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        prevStep,
        canGoNext: currentStep < totalSteps,
        canGoPrev: currentStep > 1,
      }}
    >
      <div className={cn("space-y-6", className)} {...props}>
        {/* Progress indicator */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Progress">
          {childArray.map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <React.Fragment key={index}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Step ${stepNumber}`}
                  onClick={() => goToStep(stepNumber)}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-2 ring-ring ring-offset-2",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {stepNumber}
                </button>
                {index < childArray.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors",
                      stepNumber < currentStep ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Current step content */}
        <div role="tabpanel">
          {childArray.map((child, index) => {
            if (index + 1 === currentStep) {
              return child
            }
            return null
          })}
        </div>
      </div>
    </StepperContext.Provider>
  )
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  description?: string
}

function Step({ children, className, title, description, ...props }: StepProps) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div>
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
Step.displayName = "Step"

// ============================================
// Exports
// ============================================
export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  Details,
  Summary,
  Content,
  DisclosureGroup,
  DisclosureItem,
  Tree,
  TreeItem,
  CollapsiblePanel,
  Stepper,
  Step,
  useStepper,
  useDisclosure,
  useDepth,
}
