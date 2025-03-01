"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2, Tag, Ticket, Calendar, Clock, MapPin, Users } from "lucide-react"
import { EventDetailsStep } from "./steps/event-details-step"
import { DateTimeStep } from "./steps/date-time-step"
import { LocationStep } from "./steps/location-step"
import { SpeakersStep } from "./steps/speaker-step"
import { ScheduleStep } from "./steps/schedule-step"
import { TicketsStep } from "./steps/tickets-step"

const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  category: z.enum(["tech", "business", "entertainment", "education", "other"]),
  eventType: z.enum(["online", "in-person"]),
  pricingType: z.enum(["free", "paid"]),
  posterImage: z.string().nullable(),
  additionalImages: z.array(z.string()).max(3, "You can upload up to 3 additional images"),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  onlineEventType: z.enum(["googleMeet", "customLink"]).optional(),
  meetLink: z.string().url().optional(),
  streamLink: z.string().url().optional(),
  hasSpeakers: z.boolean(),
  speakers: z
    .array(
      z.object({
        name: z.string(),
        bio: z.string(),
      }),
    )
    .optional(),
  schedule: z.array(
    z.object({
      time: z.string(),
      activity: z.string(),
    }),
  ),
  tickets: z.array(
    z.object({
      name: z.string(),
      price: z.number().min(0),
      quantity: z.number().min(1),
    }),
  ),
  currency: z.enum(["KES", "USD"]),
})

export type EventFormData = z.infer<typeof eventSchema>

// Fix: Define a separate interface for the form prop to avoid circular reference
export interface FormProps {
  form: ReturnType<typeof useForm<EventFormData>>
}

const steps = [
  { id: 1, title: "Event Details", icon: Tag, component: EventDetailsStep },
  { id: 2, title: "Date and Time", icon: Calendar, component: DateTimeStep },
  { id: 3, title: "Location", icon: MapPin, component: LocationStep },
  { id: 4, title: "Speakers", icon: Users, component: SpeakersStep },
  { id: 5, title: "Schedule", icon: Clock, component: ScheduleStep },
  { id: 6, title: "Tickets", icon: Ticket, component: TicketsStep },
]

export default function CreateEventForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const totalSteps = steps.length
  const currentStep = steps.find((s) => s.id === step)

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      hasSpeakers: false,
      speakers: [],
      schedule: [{ time: "", activity: "" }],
      tickets: [{ name: "General Admission", price: 0, quantity: 100 }],
      currency: "KES",
      posterImage: null,
      additionalImages: [],
    },
  })

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    setIsLoading(true)
    // Here you would typically send the data to your API
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API call
    setIsLoading(false)
    router.push("/dashboard/organizer/manage-events")
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Create Event</h2>
      </div>
      <Progress value={(step / totalSteps) * 100} className="w-full" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              {currentStep && <currentStep.icon className="h-5 w-5" />}
              <CardTitle>{currentStep?.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>{currentStep && <currentStep.component form={form} />}</CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>
            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  "Create Event"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}