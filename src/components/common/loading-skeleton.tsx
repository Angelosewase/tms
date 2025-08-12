"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Skeleton */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Skeleton */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-40" />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="h-5 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-18" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="space-y-3 pt-4">
                <div className="flex gap-3">
                  <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="h-5 w-20" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}