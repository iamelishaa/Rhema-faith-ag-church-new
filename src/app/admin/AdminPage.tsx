"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { UserProfile, UserRole } from "@/lib/types/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SimpleAlert } from "@/components/ui/simple-alert";
import { Loader2, Search, UserPlus } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";


export default function AdminDashboard() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("user");
  const [isInviting, setIsInviting] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/auth/signin");
          return;
        }

        // Check if user is admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!profile || profile.role !== "admin") {
          router.push("/");
          return;
        }

        // Fetch all users
        const { data: users, error: usersError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (usersError) throw usersError;

        // Convert to typed UserProfile array
        const typedUsers: UserProfile[] = [];
        if (users) {
          for (const user of users) {
            typedUsers.push({
              id: user.id,
              email: user.email,
              full_name: user.full_name,
              avatar_url: user.avatar_url || null,
              role: (user.role === 'admin' ? 'admin' : 'user') as UserRole,
              created_at: user.created_at,
              updated_at: user.updated_at
            });
          }
        }

        setUsers(typedUsers);
        setFilteredUsers(typedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [router, supabase]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchLower) ||
        (user.full_name?.toLowerCase().includes(searchLower) ?? false)
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      // Update local state
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      ) as UserProfile[];

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (err) {
      console.error("Error updating user role:", err);
      setError("Failed to update user role. Please try again.");
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setIsInviting(true);
    setError(null);

    try {
      // In a real app, you would send an invitation email here
      const { data, error } = await supabase.auth.admin.createUser({
        email: inviteEmail,
        password: generateTemporaryPassword(),
        email_confirm: true,
        user_metadata: { role: inviteRole },
      });

      if (error) throw error;

      // Add the new user to the profiles table
      const newUser: UserProfile = {
        id: data.user.id,
        email: inviteEmail,
        full_name: inviteEmail.split("@")[0],
        role: inviteRole,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .insert(newUser);

      if (profileError) throw profileError;

      // Update local state
      const updatedUsers = [newUser, ...users];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setInviteEmail("");
    } catch (err) {
      console.error("Error inviting user:", err);
      setError(
        err instanceof Error ? err.message : "Failed to invite user. Please try again."
      );
    } finally {
      setIsInviting(false);
    }
  };

  const generateTemporaryPassword = (): string => {
    return Math.random().toString(36).slice(-10) + "A1!";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users and application settings
            </p>
          </div>

          {error && (
            <SimpleAlert 
              variant="destructive"
              message={error}
              className="mb-6"
            />
          )}

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Invite New User</CardTitle>
                <CardDescription>
                  Send an invitation to a new user to join the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInviteUser} className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={inviteRole}
                        onValueChange={(value: string) => setInviteRole(value as UserRole)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" disabled={isInviting}>
                        {isInviting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Invite User
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions
                    </CardDescription>
                  </div>
                  <div className="w-full md:w-64">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                  {user.avatar_url ? (
                                    <Image
                                      src={user.avatar_url}
                                      alt={user.full_name || 'User'}
                                      width={32}
                                      height={32}
                                      className="h-8 w-8 object-cover"
                                      unoptimized={user.avatar_url?.startsWith('data:')}
                                    />
                                  ) : (
                                    <span className="text-sm">
                                      {(user.full_name || user.email[0]).toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                <span>{user.full_name || 'No name'}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Select
                                value={user.role || 'user'}
                                onValueChange={(value: string) => 
                                  handleRoleChange(user.id, value as UserRole)
                                }
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              {new Date(user.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  // Implement user actions (edit, delete, etc.)
                                }}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
