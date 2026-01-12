import Link from "next/link";
import { Button } from "@/components/Button";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Search & Filter",
    description: "Powerful search and filtering capabilities to find exactly what you need.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Organize",
    description: "Manage your catalog with categories, status, and custom sorting options.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive",
    description: "Access your dashboard from any device with a modern, responsive interface.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto w-full text-center space-y-12">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-gray-900 dark:text-white tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Catalog Dashboard
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Modern catalog management system with powerful search, filtering, and organization tools.
            </p>
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button variant="primary" size="lg" className="shadow-sm hover:shadow-md transition-all duration-200">
                Get Started
              </Button>
            </Link>
            <Link href="/dashboard/catalog">
              <Button variant="ghost" size="lg">
                View Catalog
              </Button>
            </Link>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
