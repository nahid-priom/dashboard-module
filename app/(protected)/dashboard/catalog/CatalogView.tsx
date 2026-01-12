"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { CatalogResponse } from "@/lib/types";
import { CatalogTable } from "./CatalogTable";
import { CatalogGrid } from "./CatalogGrid";
import { CatalogPagination } from "./CatalogPagination";
import { CatalogSkeleton } from "./CatalogSkeleton";
import { CatalogEmpty } from "./CatalogEmpty";

interface CatalogViewProps {
  initialData: CatalogResponse;
}

export function CatalogView({ initialData }: CatalogViewProps) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<CatalogResponse>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialParamsRef = useRef<string | null>(null);
  
  // Store initial search params to avoid fetching on mount
  if (initialParamsRef.current === null) {
    initialParamsRef.current = searchParams.toString();
  }
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const queryString = searchParams.toString();
      const response = await fetch(`/api/catalog?${queryString}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch catalog");
      }
      
      const newData: CatalogResponse = await response.json();
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);
  
  useEffect(() => {
    // Only fetch if searchParams changed from initial mount
    const currentParams = searchParams.toString();
    if (currentParams !== initialParamsRef.current) {
      fetchData();
    }
  }, [searchParams, fetchData]);
  
  if (error) {
    return (
      <div className="mt-6 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          Error Loading Catalog
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (isLoading) {
    return <CatalogSkeleton />;
  }
  
  if (data.items.length === 0) {
    return <CatalogEmpty />;
  }
  
  return (
    <div className="space-y-4">
      {/* Desktop table view */}
      <div className="hidden lg:block">
        <CatalogTable items={data.items} />
      </div>
      
      {/* Mobile grid view */}
      <div className="lg:hidden">
        <CatalogGrid items={data.items} />
      </div>
      
      <CatalogPagination
        page={data.page}
        totalPages={data.totalPages}
        total={data.total}
        pageSize={data.pageSize}
      />
    </div>
  );
}

