import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 border-r border-white/5 p-6 space-y-8 hidden md:block">
        <Skeleton className="h-8 w-32" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-white/5 px-8 flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        
        <main className="container mx-auto px-4 py-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-[200px] w-full rounded-2xl" />
            </div>
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-[180px] w-full rounded-xl" />
                <Skeleton className="h-[180px] w-full rounded-xl" />
              </div>
            </div>
            <Skeleton className="h-[300px] w-full rounded-2xl" />
          </div>
        </main>
      </div>
    </div>
  );
}
