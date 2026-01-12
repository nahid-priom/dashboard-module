import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { DashboardNav } from "./DashboardNav";
import { DashboardSidebar } from "./DashboardSidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/login?next=/dashboard");
  }
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <DashboardNav />
        <div className="flex">
          <DashboardSidebar />
          <main>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

