"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { FormProps, EventFormData } from "../create-event-form"
import { Video, Link } from "lucide-react"

export function LocationStep({ form }: FormProps) {
  const { register, watch, setValue } = form
  const eventType = watch("eventType")
  const [isGoogleMeetIntegrated, setIsGoogleMeetIntegrated] = useState(false)
  const [customLinkType, setCustomLinkType] = useState<"meetingLink" | "streamLink" | null>(null)

  const handleGoogleMeetIntegration = () => {
    setIsGoogleMeetIntegrated(true)
    // In a real application, this would trigger the Google Meet API integration
    setValue("meetLink", "https://meet.google.com/abc-defg-hij")
  }

  return (
    <div className="space-y-6">
      {eventType === "in-person" ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="location">Venue Name</Label>
            <Input id="location" {...register("location")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" {...register("country")} />
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <Label>Online Event Setup</Label>
          <RadioGroup onValueChange={(value) => setValue("onlineEventType", value as EventFormData["onlineEventType"])}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="googleMeet" id="googleMeet" />
              <Label htmlFor="googleMeet">Google Meet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customLink" id="customLink" />
              <Label htmlFor="customLink">Custom Link</Label>
            </div>
          </RadioGroup>

          {watch("onlineEventType") === "googleMeet" && (
            <div className="space-y-2">
              {isGoogleMeetIntegrated ? (
                <div className="flex items-center space-x-2">
                  <Input value={watch("meetLink")} readOnly />
                  <Button type="button" variant="outline" onClick={() => setIsGoogleMeetIntegrated(false)}>
                    Change
                  </Button>
                </div>
              ) : (
                <Button type="button" onClick={handleGoogleMeetIntegration}>
                  Create Google Meet Link
                </Button>
              )}
            </div>
          )}

          {watch("onlineEventType") === "customLink" && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="customLinkType"
                  checked={customLinkType === "meetingLink"}
                  onCheckedChange={() => setCustomLinkType("meetingLink")}
                />
                <Label htmlFor="customLinkType">Meeting Link</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="customStreamType"
                  checked={customLinkType === "streamLink"}
                  onCheckedChange={() => setCustomLinkType("streamLink")}
                />
                <Label htmlFor="customStreamType">Live Stream Link</Label>
              </div>
              {customLinkType && (
                <div className="space-y-2">
                  <Label htmlFor="customLink">
                    {customLinkType === "meetingLink" ? "Meeting Link" : "Live Stream Link"}
                  </Label>
                  <div className="flex items-center space-x-2">
                    {customLinkType === "meetingLink" ? <Video className="h-5 w-5" /> : <Link className="h-5 w-5" />}
                    <Input
                      id="customLink"
                      placeholder={
                        customLinkType === "meetingLink"
                          ? "https://zoom.us/j/123456789"
                          : "https://youtube.com/live/your-stream-id"
                      }
                      {...register(customLinkType === "meetingLink" ? "meetLink" : "streamLink")}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

