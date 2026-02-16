"use client"

import { useState } from "react"
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  Stepper,
  Step,
  useStepper,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

function StepperNavigation() {
  const { currentStep, totalSteps, nextStep, prevStep, canGoNext, canGoPrev } = useStepper()

  return (
    <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={!canGoPrev}
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </span>
      {canGoNext ? (
        <Button onClick={nextStep}>
          Continue
        </Button>
      ) : (
        <Button>
          <Check className="h-4 w-4 mr-2" />
          Complete
        </Button>
      )}
    </div>
  )
}

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          {"<Stepper /> <Step />"}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Stepper</h2>
        <p className="text-muted-foreground">
          Progressive forms and wizards that guide users through multi-step processes. 
          Only the current step is shown, reducing cognitive load.
        </p>
      </div>

      {/* Interactive Stepper */}
      <Section>
        <SectionHeader>
          <SectionTitle>Account Setup Wizard</SectionTitle>
          <SectionDescription>
            A multi-step form that progressively reveals each section. Click the step indicators 
            to jump between steps.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Stepper step={currentStep} onStepChange={setCurrentStep}>
            <Step title="Personal Information" description="Tell us about yourself">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <StepperNavigation />
            </Step>

            <Step title="Account Security" description="Protect your account">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a strong password" />
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters with a number and special character
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>
              </div>
              <StepperNavigation />
            </Step>

            <Step title="Preferences" description="Customize your experience">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Communication Preferences</Label>
                  <div className="space-y-2">
                    {["Product updates", "Weekly newsletter", "Marketing emails"].map((option) => (
                      <label key={option} className="flex items-center gap-3 text-sm cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>UTC-8 Pacific Time</option>
                    <option>UTC-5 Eastern Time</option>
                    <option>UTC+0 London</option>
                    <option>UTC+1 Paris</option>
                  </select>
                </div>
              </div>
              <StepperNavigation />
            </Step>

            <Step title="Review & Confirm" description="Verify your information">
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground font-medium">John Doe</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground font-medium">john@example.com</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Password</span>
                    <span className="text-foreground font-medium">••••••••</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Notifications</span>
                    <span className="text-foreground font-medium">3 enabled</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  By completing this setup, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
              <StepperNavigation />
            </Step>
          </Stepper>
        </SectionContent>
      </Section>

      {/* Benefits */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-medium text-foreground mb-2">Reduced Overwhelm</h4>
          <p className="text-sm text-muted-foreground">
            Users only see one step at a time, making complex processes feel manageable.
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-medium text-foreground mb-2">Clear Progress</h4>
          <p className="text-sm text-muted-foreground">
            Visual indicators show completion status and remaining steps at a glance.
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-medium text-foreground mb-2">Flexible Navigation</h4>
          <p className="text-sm text-muted-foreground">
            Users can jump to any step, go back to correct errors, or skip ahead.
          </p>
        </div>
      </div>
    </div>
  )
}
