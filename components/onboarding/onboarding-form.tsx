"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ImagePlus, Building2, Loader2, Tag, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const steps = [
  {
    id: 1,
    title: "Organization Details",
    icon: Building2,
    description: "Tell us about your organization",
  },
  {
    id: 2,
    title: "Customize Your Profile",
    icon: ImagePlus,
    description: "Add your branding",
  },
  {
    id: 3,
    title: "Select Category",
    icon: Tag,
    description: "Select your primary event category",
  },
]

const categories = [
  { id: "tech", name: "Technology", description: "Tech conferences, hackathons, workshops" },
  { id: "entertainment", name: "Entertainment", description: "Concerts, performances, shows" },
  { id: "business", name: "Business", description: "Networking, conferences, seminars" },
  { id: "education", name: "Education", description: "Workshops, courses, training" },
  { id: "sports", name: "Sports", description: "Tournaments, matches, competitions" },
  { id: "food", name: "Food & Drink", description: "Tastings, culinary events, food festivals" },
  { id: "charity", name: "Charity & Causes", description: "Fundraisers, volunteer events" },
  { id: "other", name: "Other", description: "Any other type of events" },
]

const entertainmentSubcategories = [
  { id: "musician", name: "Musician/Band" },
  { id: "dj", name: "DJ" },
  { id: "actor", name: "Actor/Actress" },
  { id: "podcaster", name: "Podcaster" },
  { id: "comedian", name: "Comedian" },
  { id: "other", name: "Other Entertainment" },
]

const OnboardingFlow = () => {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const router = useRouter()
  const totalSteps = steps.length
  const currentStep = steps.find((s) => s.id === step)

  const handleComplete = async () => {
    if (step === totalSteps) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard/organizer")
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="w-full relative">
      <Progress value={(step / totalSteps) * 100} className="mb-8 h-2" />

      <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            {currentStep && <currentStep.icon className="h-5 w-5" />}
            <CardTitle className="text-xl">{currentStep?.title}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">{currentStep?.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" placeholder="Enter organization name" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your organization"
                  className="min-h-[120px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" placeholder="https://your-website.com" className="h-11" />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                <Label htmlFor="logo" className="mt-4 block font-medium cursor-pointer">
                  Upload Logo
                  <span className="block text-sm text-muted-foreground mt-1">Drag and drop or click to upload</span>
                </Label>
                <Input id="logo" type="file" className="hidden" accept="image/*" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="text-base">What type of events will you be organizing?</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  This helps us customize your dashboard with relevant features for your event type.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                        </div>
                        {selectedCategory === category.id && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedCategory === "entertainment" && (
                <div className="mt-6">
                  <Label className="text-base">What type of entertainment events?</Label>
                  <RadioGroup
                    value={selectedSubcategory}
                    onValueChange={setSelectedSubcategory}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3"
                  >
                    {entertainmentSubcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={subcategory.id} id={subcategory.id} />
                        <Label htmlFor={subcategory.id} className="cursor-pointer">
                          {subcategory.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1 || isLoading}
            size="lg"
          >
            Previous
          </Button>
          <Button
            onClick={handleComplete}
            disabled={
              isLoading ||
              (step === 3 && !selectedCategory) ||
              (step === 3 && selectedCategory === "entertainment" && !selectedSubcategory)
            }
            size="lg"
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up...
              </>
            ) : step === totalSteps ? (
              "Complete Setup"
            ) : (
              "Next Step"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OnboardingFlow

