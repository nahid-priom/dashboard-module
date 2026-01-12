"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/Button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useState } from "react";

export function DashboardNav() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setIsLoggingOut(false);
    }
  }
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-white">
              Catalog Dashboard
            </Link>
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Mock User</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-label="Logout"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

