"use client";

import { Suspense } from 'react';
import SignInForm from './SignInForm';

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Loading sign in form...</p>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
