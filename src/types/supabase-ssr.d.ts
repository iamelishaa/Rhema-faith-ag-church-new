declare module "@supabase/ssr" {
  import { SupabaseClient } from "@supabase/supabase-js";

  interface CookieOptions {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
  }

  export function createBrowserClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: {
      cookies: {
        get: (key: string) => string | undefined;
        set: (key: string, value: string, options: CookieOptions) => void;
        remove: (key: string, options: CookieOptions) => void;
      };
    }
  ): SupabaseClient;

  export function createServerClient(
    supabaseUrl: string,
    supabaseKey: string,
    options: {
      cookies: {
        get: (name: string) => string | undefined;
        set: (
          name: string,
          value: string,
          options: {
            path?: string;
            maxAge?: number;
            domain?: string;
            secure?: boolean;
            httpOnly?: boolean;
            sameSite?: "lax" | "strict" | "none";
          }
        ) => void;
        remove: (name: string, options: { path: string }) => void;
      };
    }
  ): SupabaseClient;
}
