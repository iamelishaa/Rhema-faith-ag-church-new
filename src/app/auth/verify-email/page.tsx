"use client";

import { Suspense } from 'react';
import VerifyEmailClient from './VerifyEmailClient';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium">Loading verification...</p>
      </div>
    }>
      <VerifyEmailClient />
    </Suspense>
  );
}
