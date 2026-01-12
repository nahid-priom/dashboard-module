import type { CatalogQueryParams } from "./types";
import type { CatalogCategory, CatalogStatus } from "./types";

type QueryValue = string | string[] | undefined;

function parseString(value: QueryValue, defaultValue?: string): string | undefined {
  if (value === undefined) return defaultValue;
  if (Array.isArray(value)) return value[0] || defaultValue;
  return value || defaultValue;
}

function parseNumber(value: QueryValue, defaultValue?: number): number | undefined {
  const str = parseString(value);
  if (str === undefined) return defaultValue;
  const num = parseInt(str, 10);
  return isNaN(num) ? defaultValue : num;
}

function parseStatus(value: QueryValue): "all" | CatalogStatus {
  const str = parseString(value, "all");
  if (str === "all" || str === "active" || str === "draft" || str === "archived") {
    return str;
  }
  return "all";
}

function parseCategory(value: QueryValue): "all" | CatalogCategory {
  const str = parseString(value, "all");
  const validCategories: CatalogCategory[] = ["UI Kits", "Templates", "Landing Pages", "E-commerce"];
  if (str === "all" || validCategories.includes(str as CatalogCategory)) {
    return str as "all" | CatalogCategory;
  }
  return "all";
}

function parseSort(value: QueryValue): "newest" | "oldest" | "priceAsc" | "priceDesc" {
  const str = parseString(value, "newest");
  if (str === "newest" || str === "oldest" || str === "priceAsc" || str === "priceDesc") {
    return str;
  }
  return "newest";
}

export function parseCatalogQueryParams(searchParams: Record<string, QueryValue>): CatalogQueryParams {
  return {
    q: parseString(searchParams.q),
    status: parseStatus(searchParams.status),
    category: parseCategory(searchParams.category),
    page: parseNumber(searchParams.page, 1),
    pageSize: parseNumber(searchParams.pageSize, 10),
    sort: parseSort(searchParams.sort),
  };
}

export function buildCatalogQueryString(params: CatalogQueryParams): string {
  const urlParams = new URLSearchParams();
  
  if (params.q) {
    urlParams.set("q", params.q);
  }
  if (params.status && params.status !== "all") {
    urlParams.set("status", params.status);
  }
  if (params.category && params.category !== "all") {
    urlParams.set("category", params.category);
  }
  if (params.page && params.page !== 1) {
    urlParams.set("page", params.page.toString());
  }
  if (params.pageSize && params.pageSize !== 10) {
    urlParams.set("pageSize", params.pageSize.toString());
  }
  if (params.sort && params.sort !== "newest") {
    urlParams.set("sort", params.sort);
  }
  
  return urlParams.toString();
}

