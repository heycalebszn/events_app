"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const purchaseData = [
  { month: "Jan", amount: 400 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 600 },
  { month: "Apr", amount: 800 },
  { month: "May", amount: 500 },
  { month: "Jun", amount: 700 },
]

const recentPurchases = [
  { id: 1, event: "Tech Conference 2023", date: "2023-06-15", amount: 150 },
  { id: 2, event: "Music Festival", date: "2023-05-20", amount: 80 },
  { id: 3, event: "Art Exhibition", date: "2023-04-10", amount: 25 },
]

export default function PurchaseReport() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Purchase Report</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Your ticket purchase history over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Amount Spent",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="amount" fill="var(--color-amount)" name="Amount Spent" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
            <CardDescription>Your most recent ticket purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPurchases.map((purchase) => (
                <div key={purchase.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-medium">{purchase.event}</h3>
                    <p className="text-sm text-muted-foreground">{purchase.date}</p>
                  </div>
                  <span className="font-bold">${purchase.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Purchase Statistics</CardTitle>
          <CardDescription>Overview of your ticket purchasing behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Total Spent</h3>
              <p className="text-2xl font-bold">$3,300</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Tickets Purchased</h3>
              <p className="text-2xl font-bold">15</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-medium text-primary">Average Price</h3>
              <p className="text-2xl font-bold">$220</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

