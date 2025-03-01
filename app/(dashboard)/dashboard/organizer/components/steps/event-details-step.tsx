"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import type { FormProps, EventFormData } from "../create-event-form"
import Image from "next/image"

export function EventDetailsStep({ form }: FormProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = form

  const [posterImage, setPosterImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>([])

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPosterImage(imageUrl)
      setValue("posterImage", imageUrl)
    }
  }

  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0 && additionalImages.length < 3) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      const updatedImages = [...additionalImages, ...newImages].slice(0, 3)
      setAdditionalImages(updatedImages)
      setValue("additionalImages", updatedImages)
    }
  }

  const removePosterImage = () => {
    setPosterImage(null)
    setValue("posterImage", null)
  }

  const removeAdditionalImage = (index: number) => {
    const newImages = additionalImages.filter((_, i) => i !== index)
    setAdditionalImages(newImages)
    setValue("additionalImages", newImages)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Event Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Event Category</Label>
        <Select onValueChange={(value: EventFormData["category"]) => setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Event Type and Pricing side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Event Type</Label>
          <RadioGroup onValueChange={(value: EventFormData["eventType"]) => setValue("eventType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online">Online</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="in-person" />
              <Label htmlFor="in-person">In-person</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Event Pricing</Label>
          <RadioGroup onValueChange={(value: EventFormData["pricingType"]) => setValue("pricingType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Free Event</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="paid" />
              <Label htmlFor="paid">Paid Event</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Event Poster Image</Label>
          <div className="flex items-center space-x-4">
            {posterImage ? (
              <div className="relative w-full max-w-xs">
                <div className="relative aspect-square w-full">
                  <Image
                    src={posterImage}
                    alt="Event poster"
                    className="rounded-md object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removePosterImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="w-full max-w-xs aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                <Input type="file" className="hidden" onChange={handlePosterUpload} accept="image/*" />
                <ImagePlus className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Upload poster image</span>
              </label>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Additional Event Images (Up to 3)</Label>
          <div className="flex flex-wrap gap-4">
            {additionalImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  src={image}
                  alt={`Event image ${index + 1}`}
                  className="rounded-md object-cover"
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6"
                  onClick={() => removeAdditionalImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {additionalImages.length < 3 && (
              <label className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer">
                <Input
                  type="file"
                  className="hidden"
                  onChange={handleAdditionalImageUpload}
                  accept="image/*"
                />
                <ImagePlus className="h-6 w-6 text-gray-400" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}