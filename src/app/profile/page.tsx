"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimpleAlert } from "@/components/ui/simple-alert";
import { CheckCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [fullName, setFullName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin?callbackUrl=/profile");
      return;
    }
    
    setFullName(user.full_name || "");
    setEmail(user.email || "");
    setAvatarUrl(user.avatar_url || "");
  }, [user, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    setIsLoading(true);
    setMessage(null);

    try {
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString() 
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      setMessage({ type: "success", text: "Profile picture updated!" });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to upload avatar",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const userInitial = user.full_name 
    ? user.full_name.charAt(0).toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        {message && (
          <SimpleAlert
            variant={message.type === 'success' ? 'success' : 'destructive'}
            message={message.text}
            className="mb-6"
          />
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <Avatar className="h-32 w-32">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={fullName || 'User'} />
                    ) : (
                      <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
                    )}
                  </Avatar>
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-sm font-medium">Change</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={isLoading}
                      />
                    </label>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold">{fullName}</h2>
                  <p className="text-gray-600">{email}</p>
                  {isAdmin && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Contact support to change your email address.
                    </p>
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1">{fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1">{email}</p>
                  </div>
                  <div className="pt-2">
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
