"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export function CatalogEmpty() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const hasFilters = searchParams.toString().length > 0;
  
  const handleClearFilters = () => {
    router.push("/dashboard/catalog");
  };
  
  return (
    <Card className="p-12 text-center">
      <div className="space-y-4">
        <div className="text-6xl">📭</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          No items found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {hasFilters
            ? "Try adjusting your filters or search query."
            : "Your catalog is empty."}
        </p>
        {hasFilters && (
          <div className="pt-4">
            <Button variant="primary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

