import { NextRequest, NextResponse } from "next/server";
import { parseCatalogQueryParams } from "@/lib/query-params";
import { mockCatalogItems } from "@/lib/mock-data";
import type { CatalogItem, CatalogResponse, CatalogStatus, CatalogCategory } from "@/lib/types";

function searchItems(items: CatalogItem[], query: string | undefined): CatalogItem[] {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
  );
}

function filterByStatus(items: CatalogItem[], status: "all" | CatalogStatus): CatalogItem[] {
  if (status === "all") return items;
  return items.filter((item) => item.status === status);
}

function filterByCategory(items: CatalogItem[], category: "all" | CatalogCategory): CatalogItem[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}

function sortItems(items: CatalogItem[], sort: string): CatalogItem[] {
  const sorted = [...items];
  
  switch (sort) {
    case "oldest":
      sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      break;
    case "priceAsc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "newest":
    default:
      sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      break;
  }
  
  return sorted;
}

export async function GET(request: NextRequest) {
  try {
    // Simulate error with query param
    const failParam = request.nextUrl.searchParams.get("fail");
    if (failParam === "1") {
      return NextResponse.json(
        { error: "Simulated API error" },
        { status: 500 }
      );
    }
    
    const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
    const params = parseCatalogQueryParams(searchParams);
    
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const q = params.q;
    const status = params.status || "all";
    const category = params.category || "all";
    const sort = params.sort || "newest";
    
    // Apply filters and sorting
    let filtered = searchItems(mockCatalogItems, q);
    filtered = filterByStatus(filtered, status);
    filtered = filterByCategory(filtered, category);
    filtered = sortItems(filtered, sort);
    
    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    const response: CatalogResponse = {
      items: paginatedItems,
      page,
      pageSize,
      total,
      totalPages,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch catalog" },
      { status: 500 }
    );
  }
}

