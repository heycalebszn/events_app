import type { Metadata } from "next"
import PurchaseReport from "../components/analytics/purchase-report"

export const metadata: Metadata = {
  title: "Purchase Report | Attendee Analytics",
  description: "View your ticket purchase history and spending analysis",
}

export default function PurchaseReportPage() {
  return <PurchaseReport />
}

