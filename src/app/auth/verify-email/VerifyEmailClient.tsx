"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function VerifyEmailClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  useEffect(() => {
    const verifyEmail = async () => {
      const supabase = createClient();
      
      try {
        if (token_hash && type === "signup") {
          const { error } = await supabase.auth.verifyOtp({
            type: 'email',
            token_hash,
          });

          if (error) throw error;
          
          setSuccess(true);
        }
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : "An error occurred while verifying your email"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token_hash, type]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
        <p className="mt-4 text-lg font-medium">Verifying your email...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-6">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Back to Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Email Verified!
          </h2>
          <p className="text-gray-600">
            Your email has been successfully verified. You can now sign in to your account.
          </p>
          <div className="mt-6">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Invalid verification link</AlertTitle>
          <AlertDescription>
            The verification link is invalid or has expired.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
