"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { AuthProvider } from "@/lib/auth-context";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <AuthProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </NextThemesProvider>
    </AuthProvider>
  );
}
