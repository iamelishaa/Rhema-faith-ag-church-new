"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from './supabase/client';
import { UserProfile, AuthContextType } from './types/supabase';
import router from 'next/router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          await handleUserSession(session.user);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await handleUserSession(session.user);
        } else {
          setUser(null);
        }
      }
    );

    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase.auth]);

  const handleUserSession = async (userData: any) => {
    try {
      // Get or create user profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single();

      if (error) {
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          await createUserProfile(userData);
        } else {
          console.error('Error fetching profile:', error);
        }
      } else if (profile) {
        setUser(profile);
      }
    } catch (error) {
      console.error('Error handling user session:', error);
    }
  };

  const createUserProfile = async (userData: any) => {
    try {
      console.log('Creating new profile for user:', userData.id);
      
      // Get the current timestamp
      const now = new Date().toISOString();
      
      // Create a minimal profile with required fields
      const newProfile = {
        id: userData.id,
        email: userData.email || `${userData.id}@user.com`,
        full_name: userData.user_metadata?.full_name || userData.email?.split('@')[0] || 'New User',
        role: 'user',
        avatar_url: userData.user_metadata?.avatar_url || null,
        created_at: now,
        updated_at: now
      };
      
      console.log('Profile data to be inserted:', JSON.stringify(newProfile, null, 2));

      // First, check if the profiles table exists and is accessible
      const { data: tableCheck, error: tableError } = await supabase
        .rpc('table_exists', { table_name: 'profiles' })
        .single();
        
      if (tableError || !tableCheck) {
        console.error('Profiles table check failed or table does not exist:', tableError);
        throw new Error('Profiles table does not exist');
      }
      
      // Try to insert the profile
      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();
        
      if (insertError) {
        // If there's a unique violation, try to fetch the existing profile
        if (insertError.code === '23505') { // Unique violation
          console.log('Profile already exists, fetching existing profile...');
          const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userData.id)
            .single();
            
          if (fetchError) {
            throw fetchError;
          }
          
          console.log('Using existing profile:', existingProfile);
          setUser(existingProfile);
          return;
        }
        throw insertError;
      }
      
      console.log('Successfully created profile:', insertedProfile);
      setUser(insertedProfile);
      
    } catch (error: any) {
      console.error('Error in profile creation process:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        timestamp: new Date().toISOString()
      });
      
      // Log additional Supabase error details if available
      if (error.context) {
        console.error('Supabase error context:', error.context);
      }
      
      // Try to get the table structure for debugging
      try {
        const { data: tableInfo, error: tableInfoError } = await supabase
          .from('information_schema.columns')
          .select('*')
          .eq('table_name', 'profiles');
          
        if (tableInfoError) {
          console.error('Failed to get table info:', tableInfoError);
        } else {
          console.log('Profiles table structure:', tableInfo);
        }
      } catch (infoError) {
        console.error('Error getting table info:', infoError);
      }
      
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Re-throw to allow error handling in the component
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    
    if (data.user) {
      // Create profile in the database with proper typing
      const newUser: UserProfile = {
        id: data.user.id,
        email,
        full_name: fullName,
        role: 'user', // Default role
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { error: profileError } = await supabase.from('profiles').insert(newUser);
      if (profileError) {
        console.error('Error creating user profile:', profileError);
        throw profileError;
      }
    }
    
    router.push('/auth/verify-email');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
