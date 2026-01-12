"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/lib/debounce";
import { buildCatalogQueryString, parseCatalogQueryParams } from "@/lib/query-params";
import { Card } from "@/components/Card";
import type { CatalogQueryParams } from "@/lib/types";

interface CatalogControlsProps {
  initialParams?: Record<string, string | string[] | undefined>;
}

export function CatalogControls(_props: CatalogControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentParams = useMemo(() => {
    const params: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);
  
  const parsedParams = useMemo(() => parseCatalogQueryParams(currentParams), [currentParams]);
  
  const [searchQuery, setSearchQuery] = useState(parsedParams.q || "");
  
  // Sync searchQuery with URL params
  useEffect(() => {
    setSearchQuery(parsedParams.q || "");
  }, [parsedParams.q]);
  
  const updateUrl = useCallback((newParams: CatalogQueryParams) => {
    const queryString = buildCatalogQueryString(newParams);
    const newUrl = queryString ? `/dashboard/catalog?${queryString}` : "/dashboard/catalog";
    router.push(newUrl);
  }, [router]);
  
  const parsedParamsRef = useRef(parsedParams);
  parsedParamsRef.current = parsedParams;
  
  const debouncedUpdateSearch = useMemo(
    () => debounce((...args: unknown[]) => {
      const query = args[0] as string;
      updateUrl({
        ...parsedParamsRef.current,
        q: query || undefined,
        page: 1, // Reset to page 1 on search
      });
    }, 400) as (query: string) => void,
    [updateUrl]
  );
  
  useEffect(() => {
    const currentQuery = parsedParams.q || "";
    if (searchQuery !== currentQuery) {
      debouncedUpdateSearch(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, parsedParams.q]);
  
  const handleFilterChange = useCallback((key: keyof CatalogQueryParams, value: string | number) => {
    const newParams: CatalogQueryParams = {
      ...parsedParams,
      [key]: value,
      page: 1, // Reset to page 1 on filter change
    };
    updateUrl(newParams);
  }, [parsedParams, updateUrl]);
  
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" },
  ];
  
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "UI Kits", label: "UI Kits" },
    { value: "Templates", label: "Templates" },
    { value: "Landing Pages", label: "Landing Pages" },
    { value: "E-commerce", label: "E-commerce" },
  ];
  
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
  ];
  
  return (
    <Card className="p-3 sm:p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        {/* Search Input - Left Side */}
        <div className="flex-shrink-0 lg:flex-1 lg:max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Search catalog items"
            />
          </div>
        </div>
        
        {/* Filters - Right Side */}
        <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
          {/* Status Filter */}
          <div className="flex-shrink-0 min-w-[120px] relative">
            <select
              id="status"
              value={parsedParams.status || "all"}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer appearance-none"
              aria-label="Filter by status"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex-shrink-0 min-w-[140px] relative">
            <select
              id="category"
              value={parsedParams.category || "all"}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer appearance-none"
              aria-label="Filter by category"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Sort Filter */}
          <div className="flex-shrink-0 min-w-[140px] relative">
            <select
              id="sort"
              value={parsedParams.sort || "newest"}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full px-3 py-2 pr-8 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer appearance-none"
              aria-label="Sort items"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
