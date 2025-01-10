'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock function to get user's country - replace with actual implementation
const getUserCountry = () => "Kenya"

export default function VendorPaymentSetupForm() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe' | ''>('')
  const [mpesaNumber, setMpesaNumber] = useState('')
  const [stripeAccount, setStripeAccount] = useState('')
  const [error, setError] = useState('')

  const userCountry = getUserCountry()
  const showMpesa = userCountry === "Kenya" || userCountry === "Ethiopia"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (paymentMethod === 'mpesa' && !mpesaNumber) {
      setError('Please enter your Mpesa number')
      return
    }

    if (paymentMethod === 'stripe' && !stripeAccount) {
      setError('Please enter your Stripe account details')
      return
    }

    // Here you would typically send the data to your backend
    console.log('Submitting payment details:', { paymentMethod, mpesaNumber, stripeAccount })

    // Redirect to dashboard
    router.push('/dashboard/vendors')
  }

  const handleSkip = () => {
    router.push('/dashboard/vendors')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select onValueChange={(value) => setPaymentMethod(value as 'mpesa' | 'stripe')} required>
          <SelectTrigger id="paymentMethod">
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {showMpesa && <SelectItem value="mpesa">Mpesa</SelectItem>}
            <SelectItem value="stripe">Stripe</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paymentMethod === 'mpesa' && (
        <div className="space-y-2">
          <Label htmlFor="mpesaNumber">Mpesa Number</Label>
          <Input 
            id="mpesaNumber" 
            value={mpesaNumber} 
            onChange={(e) => setMpesaNumber(e.target.value)}
            placeholder="Enter your Mpesa number"
            required
          />
        </div>
      )}

      {paymentMethod === 'stripe' && (
        <div className="space-y-2">
          <Label htmlFor="stripeAccount">Stripe Account</Label>
          <Input 
            id="stripeAccount" 
            value={stripeAccount} 
            onChange={(e) => setStripeAccount(e.target.value)}
            placeholder="Enter your Stripe account details"
            required
          />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full">
        Set Up Payment
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

      <div className="text-center">
        <Button type="button" variant="link" onClick={handleSkip}>
          Skip for now
        </Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          If you skip setting up a payment method, you won&apos;t be able to sell or apply for event vendor jobs until you complete this step.
        </AlertDescription>
      </Alert>
    </form>
  )
}

