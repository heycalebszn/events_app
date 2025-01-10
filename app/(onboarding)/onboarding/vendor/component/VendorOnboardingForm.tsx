'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

export default function VendorOnboardingForm() {
  const router = useRouter()
  const [vendorType, setVendorType] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoPreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted', { vendorType })
    // Redirect to payment setup page
    router.push('/payment-setup')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input id="businessName" placeholder="Your food business name" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="vendorType">Vendor Type</Label>
        <Select onValueChange={setVendorType} required>
          <SelectTrigger id="vendorType">
            <SelectValue placeholder="Select vendor type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="restaurant">Restaurant</SelectItem>
            <SelectItem value="foodTruck">Food Truck</SelectItem>
            <SelectItem value="caterer">Caterer</SelectItem>
            <SelectItem value="bakery">Bakery</SelectItem>
            <SelectItem value="beverageVendor">Beverage Vendor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cuisineType">Cuisine Type</Label>
        <Input id="cuisineType" placeholder="e.g., Italian, Mexican, Vegan" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea 
          id="description" 
          placeholder="Tell us about your food business and what makes your offerings special" 
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Business Logo</Label>
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            {logoPreview ? (
              <>
                <Image
                  src={logoPreview}
                  alt="Logo preview"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                  aria-label="Remove logo"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <Upload className="w-8 h-8" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('logo')?.click()}
              className="w-full mb-2"
            >
              {logo ? 'Change Logo' : 'Upload Logo'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Upload a square image, at least 200x200 pixels. Max file size: 5MB.
            </p>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Continue
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  )
}

