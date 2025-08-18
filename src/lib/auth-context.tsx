"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "./supabase/client";
import { UserProfile, AuthContextType } from "./types/supabase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const createUserProfile = useCallback(
    async (userData: {
      id: string;
      email?: string;
      user_metadata?: { full_name?: string; avatar_url?: string };
    }) => {
      try {
        const now = new Date().toISOString();
        const newProfile = {
          id: userData.id,
          email: userData.email || `${userData.id}@user.com`,
          full_name:
            userData.user_metadata?.full_name ||
            userData.email?.split("@")[0] ||
            "New User",
          role: "user",
          avatar_url: userData.user_metadata?.avatar_url || null,
          created_at: now,
          updated_at: now,
        };

        // Check if profiles table exists
        const { data: tableCheck, error: tableError } = await supabase
          .rpc("table_exists", { table_name: "profiles" })
          .single();

        if (tableError || !tableCheck) {
          throw new Error("Profiles table does not exist");
        }

        // Try to insert the profile
        const { data: insertedProfile, error: insertError } = await supabase
          .from("profiles")
          .insert(newProfile)
          .select()
          .single();

        if (insertError) {
          if (insertError.code === "23505") {
            // Unique violation
            const { data: existingProfile, error: fetchError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", userData.id)
              .single();

            if (fetchError) throw fetchError;
            return existingProfile;
          }
          throw insertError;
        }

        return insertedProfile;
      } catch (error) {
        console.error("Error in profile creation:", error);
        throw error;
      }
    },
    [supabase]
  );

  const handleUserSession = useCallback(
    async (userData: {
      id: string;
      email?: string;
      user_metadata?: { full_name?: string; avatar_url?: string };
    }) => {
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.id)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            // No rows returned
            const newProfile = await createUserProfile(userData);
            setUser(newProfile);
            return newProfile;
          }
          throw error;
        }

        setUser(profile);
        return profile;
      } catch (error) {
        console.error("Error handling user session:", error);
        return null;
      }
    },
    [createUserProfile, supabase]
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          await handleUserSession(session.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await handleUserSession(session.user);
      } else {
        setUser(null);
      }
    });

    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, [handleUserSession, supabase.auth]);

  const signIn = async (email: string, password: string): Promise<{ success: boolean }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      return { success: true };
    } catch (error) {
      console.error('Error in signIn:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ success: boolean }> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      return { success: true };
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.push("/auth/signin");
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  // Calculate isAdmin based on user's role
  const isAdmin = context.user?.role === 'admin';
  
  // Return all context values plus the calculated isAdmin
  return {
    ...context,
    isAdmin,
  };
};
