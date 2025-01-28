import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function EventDetailsSkeleton() {
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
