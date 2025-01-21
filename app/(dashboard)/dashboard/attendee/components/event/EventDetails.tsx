"use client"

import Image from "next/image"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, Mail, MapPin, MessageCircleMore, Minus, Plus, Ticket, Twitter, Instagram, Linkedin } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface TicketType {
  id: number
  name: string
  price: number
  quantity: number
}

interface Host {
  name: string
  image: string
  role: string
}

interface VendorType {
  id: number
  name: string
  bio: string
  image: string
}

export default function EventDetails() {
  const [tickets, setTickets] = useState<TicketType[]>([
    { id: 1, name: "Early Bird", price: 3000, quantity: 0 },
    { id: 2, name: "Regular", price: 5000, quantity: 0 },
    { id: 3, name: "VIP", price: 10000, quantity: 0 },
  ])

  const host: Host = {
    name: "Event Palour",
    image: "/images/logo.png",
    role: "Event Organizer",
  }

  const vendors: VendorType[] = [
    {
      id: 1,
      name: "Gourmet Delights",
      bio: "Exquisite catering for corporate events",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 2,
      name: "Sweet Sensations",
      bio: "Artisanal desserts and pastries",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ]

  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "paystack" | null>(null)
  const { toast } = useToast()

  const updateTicketQuantity = (id: number, increment: boolean) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, quantity: increment ? ticket.quantity + 1 : Math.max(0, ticket.quantity - 1) }
          : ticket,
      ),
    )
  }

  const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)

  const handleCheckout = () => {
    // Here you would typically handle the actual payment process
    // For this example, we'll just show a success toast
    toast({
      title: "Tickets Purchased Successfully!",
      description: "Your tickets have been booked. Check your email for confirmation.",
      action: <ToastAction altText="View Tickets">View Tickets</ToastAction>,
    })
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,1.5fr] gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <Image
              src="/images/logo.jpg"
              alt="Nairobi VC Dinner Night"
              width={400}
              height={400}
              className="w-full aspect-square object-cover"
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Hosted By</h3>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={host.image} alt={host.name} />
                <AvatarFallback>{host.name[0]}</AvatarFallback>
              </Avatar>
              <div>
              <h4 className="font-semibold">{host.name}</h4>
                <p className="text-sm text-gray-600">{host.role}</p>
                <a href="mailto:info@cloudplexo.com" className="flex items-center gap-2 text-sm text-[#0A0A0A] mt-2">
                  <Mail className="w-4 h-4 animate-pulse" />
                  info@eventspalour.com
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Share Event</h3>
            <div className="flex gap-4">
              
              <Button variant="outline" size="icon">
               < MessageCircleMore className="w-5 h-5 hover:text-[#0A0A0A] transition-colors
             
" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Twitter className="w-5 h-5 hover:text-[#0A0A0A] transition-colors
" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-5 h-5 hover:text-[#0A0A0A] transition-colors
" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-5 h-5 hover:text-[#0A0A0A] transition-colors
" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="w-5 h-5 hover:text-[#0A0A0A] transition-colors
" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Nairobi VC Dinner Night</h1>

            <div className="mt-6 grid grid-cols-[auto,1fr] gap-6">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">JAN</div>
                <div className="text-3xl font-bold">31</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg">5:00 PM - 6:00 PM</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Nairobi, Nairobi County</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About Event</h2>
            <p className="text-gray-600 leading-relaxed">
              Join us for the Nairobi VC Dinner Night, an exclusive gathering of visionary key tech stakeholders, VCs,
              Investors, Funders, & and Ecosystem enablers. This event is designed to foster meaningful connections,
              spark collaborations, and unlock opportunities to drive innovation and growth within Africa&apos;s
              entrepreneurial landscape.
            </p>

            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">Why Attend?</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Connect with leading VCs, Investors, Key Stakeholders, Funders, Ecosystem builders and Enablers.
                </li>
                <li>Explore strategic partnerships opportunities.</li>
                <li>Engage in insightful discussions over a curated dining experience.</li>
              </ul>
            </div>

            <p className="font-semibold">Limited seats available. RSVP now to secure your spot!</p>
            <p>Excited to see you soon!!!</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Food Vendors</h2>
            <div className="grid gap-6">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="flex items-center gap-4 group">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={vendor.image} alt={vendor.name} />
                    <AvatarFallback>{vendor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.bio}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Pre-order
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Ticket className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Select Tickets</h2>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-4 rounded-lg border">
                  <div>
                    <h3 className="font-semibold">{ticket.name}</h3>
                    <p className="text-lg">KES {ticket.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateTicketQuantity(ticket.id, false)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{ticket.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateTicketQuantity(ticket.id, true)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">KES {totalAmount.toLocaleString()}</span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full text-lg" size="lg" disabled={totalAmount === 0}>
                  Proceed to Checkout
                </Button>
              </SheetTrigger>
              <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                  <SheetTitle>Checkout</SheetTitle>
                  <SheetDescription>
                    Complete your purchase for {tickets.reduce((sum, t) => sum + t.quantity, 0)} tickets
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      onValueChange={(value) => setPaymentMethod(value as "mpesa" | "paystack")}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex items-center gap-2">
                          <Image src="/images/mpesa.png" alt="M-Pesa" width={24} height={24} />
                          M-Pesa
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                        <RadioGroupItem value="paystack" id="paystack" />
                        <Label htmlFor="paystack" className="flex items-center gap-2">
                          <Image src="/images/paystack.png" alt="Paystack" width={24} height={24} />
                          Paystack (Card)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit" className="w-full" disabled={!paymentMethod} onClick={handleCheckout}>
                    Pay KES {totalAmount.toLocaleString()}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}

