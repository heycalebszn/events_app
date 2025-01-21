"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentStatusModalProps {
  isOpen: boolean
  onClose: () => void
  status: "success" | "failed"
}

export default function PaymentStatusModal({ isOpen, onClose, status }: PaymentStatusModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Payment Status</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6 text-black" />
          </Button>
        </div>

        {status === "success" && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <p className="mt-4 text-black">Payment successful!</p>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="mt-4 text-black">Payment failed. Please try again.</p>
          </div>
        )}

        <Button onClick={onClose} className="w-full mt-4">
          Close
        </Button>
      </div>
    </div>
  )
}

