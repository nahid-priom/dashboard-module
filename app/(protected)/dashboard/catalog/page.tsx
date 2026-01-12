import { Suspense } from "react";
import { CatalogView } from "./CatalogView";
import { CatalogControls } from "./CatalogControls";
import { CatalogSkeleton } from "./CatalogSkeleton";
import { parseCatalogQueryParams } from "@/lib/query-params";
import type { CatalogResponse } from "@/lib/types";

async function fetchCatalogData(searchParams: Record<string, string | string[] | undefined>): Promise<CatalogResponse> {
  const params = parseCatalogQueryParams(searchParams);
  const queryString = new URLSearchParams();
  
  if (params.q) queryString.set("q", params.q);
  if (params.status && params.status !== "all") queryString.set("status", params.status);
  if (params.category && params.category !== "all") queryString.set("category", params.category);
  if (params.page && params.page !== 1) queryString.set("page", params.page.toString());
  if (params.pageSize && params.pageSize !== 10) queryString.set("pageSize", params.pageSize.toString());
  if (params.sort && params.sort !== "newest") queryString.set("sort", params.sort);
  
  // Use the mock data directly instead of fetch for SSR
  // In production, you'd use internal API call or database query
  const { mockCatalogItems } = await import("@/lib/mock-data");
  
  // Apply filters (same logic as API route)
  let filtered = [...mockCatalogItems];
  if (params.q) {
    const lowerQuery = params.q.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }
  if (params.status && params.status !== "all") {
    filtered = filtered.filter((item) => item.status === params.status);
  }
  if (params.category && params.category !== "all") {
    filtered = filtered.filter((item) => item.category === params.category);
  }
  if (params.sort) {
    switch (params.sort) {
      case "oldest":
        filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
      case "priceAsc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
    }
  }
  
  const page = params.page || 1;
  const pageSize = params.pageSize || 10;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filtered.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    page,
    pageSize,
    total,
    totalPages,
  };
}

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Catalog</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage and browse your catalog items
        </p>
      </div>
      
      <Suspense
        key={JSON.stringify(params)}
        fallback={<CatalogSkeleton />}
      >
        <CatalogContent searchParams={params} />
      </Suspense>
    </div>
  );
}

async function CatalogContent({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  try {
    const initialData = await fetchCatalogData(searchParams);
    return (
      <>
        <CatalogControls initialParams={searchParams} />
        <CatalogView initialData={initialData} />
      </>
    );
  } catch (error) {
    return (
      <>
        <CatalogControls initialParams={searchParams} />
        <div className="mt-6">
          <CatalogError />
        </div>
      </>
    );
  }
}


function CatalogError() {
  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
        Error Loading Catalog
      </h3>
      <p className="text-red-600 dark:text-red-400 mb-4">
        Failed to load catalog data. Please try again.
      </p>
    </div>
  );
}

