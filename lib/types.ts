export type CatalogStatus = "active" | "draft" | "archived";
export type CatalogCategory = "UI Kits" | "Templates" | "Landing Pages" | "E-commerce";

export interface CatalogItem {
  id: string;
  title: string;
  category: CatalogCategory;
  status: CatalogStatus;
  price: number;
  updatedAt: string; // ISO string
  thumbnailUrl: string;
}

export interface CatalogResponse {
  items: CatalogItem[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CatalogQueryParams {
  q?: string;
  status?: "all" | CatalogStatus;
  category?: "all" | CatalogCategory;
  page?: number;
  pageSize?: number;
  sort?: "newest" | "oldest" | "priceAsc" | "priceDesc";
}

