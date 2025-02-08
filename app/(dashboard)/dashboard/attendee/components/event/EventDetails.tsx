"use client"

import { useRouter } from "next/navigation"
import { getEventById } from "@/lib/data/mockData"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircleMore,
  Minus,
  Plus,
  Ticket,
  Twitter,
  Instagram,
  Linkedin,
  Calendar,
} from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import type { Event, Tickets, Vendor, KeynoteSpeaker } from "@/types/event"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    function calculateTimeLeft(): TimeLeft | null {
      const difference = +targetDate - +new Date()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return null
    }

    function updateTimeLeft() {
      setTimeLeft(calculateTimeLeft())
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return null
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-gray-900 p-2 sm:p-4 rounded-lg">
          <div className="text-xl sm:text-3xl font-bold text-white">{value}</div>
          <div className="text-xs uppercase text-gray-400">{unit}</div>
        </div>
      ))}
    </div>
  )
}

export default function EventDetails({ eventId }: { eventId: string }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tickets, setTickets] = useState<Tickets[]>([])
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "paystack" | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true)
        const eventData = await getEventById(Number(eventId))
        if (eventData) {
          setEvent(eventData)
          setTickets(eventData.tickets)
        } else {
          setError("Event not found")
        }
      } catch {
        setError("Failed to fetch event data")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

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
    toast({
      title: "Tickets Purchased Successfully!",
      description: "Your tickets have been booked. Check your email for confirmation.",
      action: <ToastAction altText="View Tickets">View Tickets</ToastAction>,
    })
  }

  if (loading) {
    return <EventDetailsSkeleton />
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!event) {
    return <div className="flex justify-center items-center h-screen">Event not found</div>
  }

  const now = new Date()
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)
  const isMultiDayEvent = startDate.toDateString() !== endDate.toDateString()
  const eventStatus = now < startDate ? "upcoming" : now > endDate ? "ended" : "ongoing"

  const getCurrentEventDay = () => {
    if (now >= startDate && now <= endDate) {
      return now
    }
    return startDate
  }

  const formatEventTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-6">
        <Button variant="outline" onClick={() => router.push("/dashboard/attendee/events")} className="mb-4">
          ← Back to Events
        </Button>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,1.5fr] gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={400}
              height={400}
              className="w-full aspect-square object-cover"
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Hosted By</h3>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={event.host.image} alt={event.host.name} />
                <AvatarFallback>{event.host.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{event.host.name}</h4>
                <p className="text-sm text-gray-600">{event.host.role}</p>
                <a href="mailto:info@eventspalour.com" className="flex items-center gap-2 text-sm text-[#0A0A0A] mt-2">
                  <Mail className="w-4 h-4 animate-pulse" />
                  info@eventspalour.com
                </a>
              </div>
            </div>
          </Card>

          {/* Share Event Card */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Share Event</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="icon">
                <MessageCircleMore className="w-5 h-5 hover:text-[#0A0A0A] transition-colors" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-5 h-5 hover:text-[#0A0A0A] transition-colors" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-5 h-5 hover:text-[#0A0A0A] transition-colors" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-5 h-5 hover:text-[#0A0A0A] transition-colors" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="w-5 h-5 hover:text-[#0A0A0A] transition-colors" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{event.title}</h1>

            <div className="mt-6 grid grid-cols-[auto,1fr] gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">
                  {getCurrentEventDay().toLocaleString("default", { month: "short" }).toUpperCase()}
                </div>
                <div className="text-2xl sm:text-3xl font-bold">{getCurrentEventDay().getDate()}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{`${formatEventTime(startDate)} - ${formatEventTime(endDate)}`}</span>
                </div>
                {isMultiDayEvent && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {eventStatus === "upcoming"
                ? "Event Starts In"
                : eventStatus === "ongoing"
                  ? "Event Ends In"
                  : "Event Has Ended"}
            </h3>
            {eventStatus !== "ended" ? (
              <CountdownTimer targetDate={eventStatus === "upcoming" ? startDate : endDate} />
            ) : (
              <div className="text-center space-y-4">
                <p className="text-lg">This event has ended</p>
                <Button onClick={() => router.push("/dashboard/attendee/events")}>Browse other events</Button>
              </div>
            )}
          </Card>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">About Event</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
            <p className="text-gray-600 italic mt-6 font-bold font-sans">We can&apos;t wait to see you at the event!</p>
          </div>

          <Separator />

          {event.foodVendors && event.foodVendors.length > 0 && (
            <>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Food Vendors</h2>
                <div className="grid gap-6">
                  {event.foodVendors.map((vendor) => (
                    <VendorCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {event.keynoteSpeakers && event.keynoteSpeakers.length > 0 && (
            <>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Keynote Speakers</h2>
                <div className="grid gap-6">
                  {event.keynoteSpeakers.map((speaker) => (
                    <SpeakerCard key={speaker.id} speaker={speaker} />
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {eventStatus !== "ended" && (
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
                    {eventStatus === "upcoming" ? "Get Tickets" : "Enter Event"}
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
          )}
        </div>
      </div>
    </div>
  )
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
      <Avatar className="w-16 h-16">
        <AvatarImage src={vendor.image} alt={vendor.name} />
        <AvatarFallback>{vendor.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{vendor.name}</h3>
        <p className="text-sm text-gray-600">{vendor.bio}</p>
        <a href={`mailto:${vendor.email}`} className="text-sm text-[#0A0A0A] hover:underline">
          {vendor.email}
        </a>
      </div>
      <Button variant="ghost" size="sm" className="flex items-center mt-2 sm:mt-0">
        Pre-order
        <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Button>
    </div>
  )
}

function SpeakerCard({ speaker }: { speaker: KeynoteSpeaker }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src={speaker.image} alt={speaker.name} />
        <AvatarFallback>{speaker.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-semibold">{speaker.name}</h3>
        <p className="text-sm text-gray-600">{speaker.bio}</p>
        <a href={`mailto:${speaker.email}`} className="text-sm text-[#0A0A0A] hover:underline">
          {speaker.email}
        </a>
      </div>
    </div>
  )
}

function EventDetailsSkeleton() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,1.5fr] gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <Skeleton className="w-full aspect-square" />
          </Card>

          <Card className="p-6">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Skeleton className="h-6 w-1/2 mb-4" />
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-full" />
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div>
            <Skeleton className="h-10 w-3/4 mb-6" />
            <div className="grid grid-cols-[auto,1fr] gap-6">
              <div className="text-center">
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-8 w-8 mx-auto" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-8 w-1/3" />
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-lg border">
                <div>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                </div>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-1/4" />
            </div>

            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

