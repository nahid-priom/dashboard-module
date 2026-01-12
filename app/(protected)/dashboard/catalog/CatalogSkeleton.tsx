"use client";

import { Skeleton } from "@/components/Skeleton";
import { Card } from "@/components/Card";

export function CatalogSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton variant="rectangular" width={48} height={48} className="rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
            <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={100} />
          </div>
        ))}
      </div>
    </Card>
  );
}

