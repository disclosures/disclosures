"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { ExternalLink, Download, MoreHorizontal } from "lucide-react"

interface OrderData {
  id: string
  customer: string
  date: string
  status: "completed" | "processing" | "pending"
  total: string
  items: {
    name: string
    quantity: number
    price: string
  }[]
  shipping: {
    address: string
    method: string
    tracking?: string
  }
}

const orders: OrderData[] = [
  {
    id: "ORD-001",
    customer: "Alice Johnson",
    date: "2024-01-15",
    status: "completed",
    total: "$284.00",
    items: [
      { name: "Wireless Keyboard", quantity: 1, price: "$89.00" },
      { name: "USB-C Hub", quantity: 2, price: "$65.00" },
      { name: "Mouse Pad XL", quantity: 1, price: "$65.00" },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Express Shipping",
      tracking: "1Z999AA10123456784",
    },
  },
  {
    id: "ORD-002",
    customer: "Bob Smith",
    date: "2024-01-14",
    status: "processing",
    total: "$156.50",
    items: [
      { name: "Mechanical Keyboard", quantity: 1, price: "$129.00" },
      { name: "Keycap Set", quantity: 1, price: "$27.50" },
    ],
    shipping: {
      address: "456 Oak Ave, Los Angeles, CA 90001",
      method: "Standard Shipping",
    },
  },
  {
    id: "ORD-003",
    customer: "Carol Davis",
    date: "2024-01-13",
    status: "pending",
    total: "$89.99",
    items: [
      { name: "Webcam HD", quantity: 1, price: "$89.99" },
    ],
    shipping: {
      address: "789 Pine Rd, Chicago, IL 60601",
      method: "Free Shipping",
    },
  },
]

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
}

function OrderRow({ order }: { order: OrderData }) {
  return (
    <Details className="border-0 border-b border-border rounded-none last:border-b-0">
      <Summary showIndicator className="px-0 py-4 hover:bg-transparent">
        <div className="grid grid-cols-5 gap-4 items-center w-full text-sm">
          <span className="font-medium text-foreground">{order.id}</span>
          <span className="text-foreground">{order.customer}</span>
          <span className="text-muted-foreground">{order.date}</span>
          <span>
            <Badge variant="secondary" className={statusColors[order.status]}>
              {order.status}
            </Badge>
          </span>
          <span className="font-medium text-foreground">{order.total}</span>
        </div>
      </Summary>
      <Content className="pb-4 px-0">
        <div className="grid gap-4 md:grid-cols-2 p-4 rounded-lg bg-muted/30 border border-border">
          {/* Order Items */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Order Items</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-foreground">{item.price}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-border flex justify-between font-medium text-sm">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{order.total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Shipping Details</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Address:</span>
                <p className="text-foreground">{order.shipping.address}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="text-foreground">{order.shipping.method}</span>
              </div>
              {order.shipping.tracking && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tracking:</span>
                  <span className="font-mono text-xs text-foreground">{order.shipping.tracking}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Invoice
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </Content>
    </Details>
  )
}

export function DataTableDemo() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-mono text-xs">
          Expandable Rows
        </Badge>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Data Table</h2>
        <p className="text-muted-foreground">
          Display tabular data with expandable rows for additional details. Perfect for orders, 
          transactions, or any data that benefits from a summary/detail view.
        </p>
      </div>

      <Section>
        <SectionHeader>
          <SectionTitle>Recent Orders</SectionTitle>
          <SectionDescription>
            Click any row to expand and see order details, shipping information, and available actions.
          </SectionDescription>
        </SectionHeader>
        <SectionContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Date</span>
            <span>Status</span>
            <span>Total</span>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {orders.map((order) => (
              <div key={order.id} className="px-4">
                <OrderRow order={order} />
              </div>
            ))}
          </div>
        </SectionContent>
      </Section>

      {/* Benefits */}
      <div className="p-4 rounded-lg border border-border bg-card">
        <h3 className="font-medium text-foreground mb-3">Why Expandable Rows?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Show key information in the row, details on demand</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Maintain scanability while providing depth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Reduce navigation by keeping context in place</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Works well with both mouse and keyboard navigation</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
