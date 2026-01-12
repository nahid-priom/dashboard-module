"use client";

import Image from "next/image";
import { memo } from "react";
import type { CatalogItem } from "@/lib/types";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";

interface CatalogGridProps {
  items: CatalogItem[];
}

function getStatusVariant(status: CatalogItem["status"]): "success" | "warning" | "danger" | "default" {
  switch (status) {
    case "active":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "danger";
    default:
      return "default";
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const CatalogGrid = memo(function CatalogGrid({ items }: CatalogGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.id} variant="hover" className="p-4">
          <div className="space-y-4">
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.category}
                </span>
                <Badge variant={getStatusVariant(item.status)}>
                  {item.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(item.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

