"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
};

export function ProtectedRoute({ 
  children, 
  requireAdmin = false, 
  redirectTo = "/" 
}: ProtectedRouteProps) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Redirect if not authenticated or if admin access is required but user is not admin
      if (!user || (requireAdmin && !isAdmin)) {
        router.push(redirectTo);
      }
    }
  }, [user, isLoading, isAdmin, requireAdmin, router, redirectTo]);

  // Show loading state while checking authentication
  if (isLoading || !user || (requireAdmin && !isAdmin)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
