import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { mockCatalogItems } from "@/lib/mock-data";

async function getDashboardStats() {
  const total = mockCatalogItems.length;
  const active = mockCatalogItems.filter((item) => item.status === "active").length;
  const draft = mockCatalogItems.filter((item) => item.status === "draft").length;
  const archived = mockCatalogItems.filter((item) => item.status === "archived").length;
  
  const categories = mockCatalogItems.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  const totalRevenue = mockCatalogItems
    .filter((item) => item.status === "active")
    .reduce((sum, item) => sum + item.price, 0);
  
  return {
    total,
    active,
    draft,
    archived,
    categories,
    totalRevenue,
  };
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Overview of your catalog management
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link href="/dashboard/catalog">
            <Button variant="primary" size="md">View Catalog</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 p-2.5 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <span className="text-xl">📦</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">
                {stats.active}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 p-2.5 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <span className="text-xl">✅</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Draft</p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">
                {stats.draft}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 p-2.5 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-xl">📝</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 p-2.5 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <span className="text-xl">💰</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Items by Category
          </h2>
          <div className="space-y-2.5">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{count}</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link href="/dashboard/catalog?status=active">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                View Active Items
              </Button>
            </Link>
            <Link href="/dashboard/catalog?status=draft">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                View Draft Items
              </Button>
            </Link>
            <Link href="/dashboard/catalog?sort=priceAsc">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Browse by Price (Low to High)
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

