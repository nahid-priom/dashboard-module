import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextUrl = params.next || "/dashboard";
  
  // If already authenticated, redirect
  if (await isAuthenticated()) {
    redirect(nextUrl);
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access your catalog dashboard
          </p>
        </div>
        <LoginForm nextUrl={nextUrl} />
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          This is a mock authentication system. Any credentials will work.
        </p>
      </div>
    </div>
  );
}

