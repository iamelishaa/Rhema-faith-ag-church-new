export type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url?: string | null;
  role?: UserRole; // Make role optional with a default value
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}
