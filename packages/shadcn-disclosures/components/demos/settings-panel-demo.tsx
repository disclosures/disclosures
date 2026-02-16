"use client"

import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
  CollapsiblePanel,
} from "@/components/ui/disclosure"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SettingsPanelDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          {"<CollapsiblePanel />"}
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings Panel</h2>
        <p className="text-muted-foreground">
          Collapsible panels perfect for settings interfaces, dashboards, and admin panels. 
          Group related options together while keeping the interface clean.
        </p>
      </div>

      {/* Settings Panel */}
      <Section>
        <SectionHeader>
          <SectionTitle>Application Settings</SectionTitle>
          <SectionDescription>
            Manage your application preferences. Expand each section to see available options.
          </SectionDescription>
        </SectionHeader>
        <SectionContent className="p-0">
          <CollapsiblePanel 
            title="Notifications" 
            badge={<Badge variant="secondary" className="text-xs">3 enabled</Badge>}
            defaultOpen
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive emails for important updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive push notifications on your device</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-xs text-muted-foreground">Receive text messages for critical alerts</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-xs text-muted-foreground">Get a weekly summary of activity</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Privacy & Security">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Alerts</Label>
                  <p className="text-xs text-muted-foreground">Get notified of new login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-xs text-muted-foreground">Make your profile visible to others</p>
                </div>
                <Switch />
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm">
                  View Login History
                </Button>
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Display & Appearance">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">Light</Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">Dark</Button>
                  <Button variant="secondary" size="sm" className="flex-1">System</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact Mode</Label>
                  <p className="text-xs text-muted-foreground">Reduce spacing and padding</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reduce Motion</Label>
                  <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch />
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Data & Storage">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Storage Used</span>
                  <span className="text-foreground font-medium">2.4 GB of 5 GB</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[48%] bg-primary rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-sync</Label>
                  <p className="text-xs text-muted-foreground">Automatically sync data across devices</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">Export Data</Button>
                <Button variant="destructive" size="sm">Clear Cache</Button>
              </div>
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Connected Accounts">
            <div className="space-y-3">
              {[
                { name: "Google", status: "Connected", email: "user@gmail.com" },
                { name: "GitHub", status: "Connected", email: "username" },
                { name: "Slack", status: "Not connected", email: null },
              ].map((account) => (
                <div key={account.name} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{account.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {account.email || "Click to connect"}
                    </p>
                  </div>
                  <Button
                    variant={account.status === "Connected" ? "outline" : "secondary"}
                    size="sm"
                  >
                    {account.status === "Connected" ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </CollapsiblePanel>

          <CollapsiblePanel title="Advanced">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" value="sk-••••••••••••••••" readOnly className="font-mono text-sm" />
                  <Button variant="outline" size="sm">Copy</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Developer Mode</Label>
                  <p className="text-xs text-muted-foreground">Enable advanced debugging tools</p>
                </div>
                <Switch />
              </div>
              <div className="pt-2 border-t border-border mt-4">
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </CollapsiblePanel>
        </SectionContent>
      </Section>
    </div>
  )
}
