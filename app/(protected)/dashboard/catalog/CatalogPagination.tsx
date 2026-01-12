"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { buildCatalogQueryString, parseCatalogQueryParams } from "@/lib/query-params";
import type { CatalogQueryParams } from "@/lib/types";

interface CatalogPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
}

export function CatalogPagination({ page, totalPages, total, pageSize }: CatalogPaginationProps) {
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
  
  const updateUrl = useCallback((newParams: CatalogQueryParams) => {
    const queryString = buildCatalogQueryString(newParams);
    const newUrl = queryString ? `/dashboard/catalog?${queryString}` : "/dashboard/catalog";
    router.push(newUrl);
  }, [router]);
  
  const handlePageChange = useCallback((newPage: number) => {
    updateUrl({
      ...parsedParams,
      page: newPage,
    });
  }, [parsedParams, updateUrl]);
  
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    updateUrl({
      ...parsedParams,
      pageSize: newPageSize,
      page: 1, // Reset to page 1 when changing page size
    });
  }, [parsedParams, updateUrl]);
  
  const pageSizeOptions = [
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
  ];
  
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{total}</span> items
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-32">
          <Select
            id="pageSize"
            value={pageSize.toString()}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value, 10))}
            options={pageSizeOptions}
            aria-label="Items per page"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            Previous
          </Button>
          
          <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {page} of {totalPages}
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

