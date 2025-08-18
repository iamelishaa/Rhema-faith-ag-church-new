"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Sermons", href: "/sermons" },
  { name: "Ministries", href: "/ministries" },
  { name: "Giving", href: "/donate" },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo on the left */}
          <Link
            href="/"
            className="flex items-center space-x-3 transition-opacity"
          >
            <div className="flex-shrink-0">
              <Image
                src={IMAGES.logo}
                alt="Rhema Faith AG Church Logo"
                width={43}
                height={43}
                className="h-10 w-auto"
                priority
                unoptimized={process.env.NODE_ENV === "production"}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-Black-800">
                Rhema Faith
              </span>
              <span className="text-sm font-medium text-gray-600">
                AG Church
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Authentication */}
            <div className="flex items-center">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <UserAvatar />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/signin" className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <SheetClose key={`close-${item.href}`} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center py-3 px-4 rounded-lg transition-colors",
                          pathname === item.href
                            ? "bg-muted font-medium"
                            : "hover:bg-muted/50"
                        )}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                  
                  {/* Mobile Authentication */}
                  <div className="border-t border-border mt-4 pt-4">
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Link
                            href="/profile"
                            className="flex items-center py-3 px-4 rounded-lg hover:bg-muted/50"
                          >
                            <User className="mr-3 h-5 w-5" />
                            Profile
                          </Link>
                        </SheetClose>
                        {user.role === 'admin' && (
                          <SheetClose asChild>
                            <Link
                              href="/admin"
                              className="flex items-center py-3 px-4 rounded-lg hover:bg-muted/50"
                            >
                              <User className="mr-3 h-5 w-5" />
                              Admin Dashboard
                            </Link>
                          </SheetClose>
                        )}
                        <button
                          onClick={() => {
                            handleSignOut();
                            setOpen(false);
                          }}
                          className="w-full flex items-center py-3 px-4 rounded-lg hover:bg-muted/50 text-left"
                        >
                          <LogIn className="mr-3 h-5 w-5" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href="/auth/signin"
                          className="flex items-center py-3 px-4 rounded-lg hover:bg-muted/50"
                        >
                          <LogIn className="mr-3 h-5 w-5" />
                          Sign In
                        </Link>
                      </SheetClose>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            
            {/* Show user avatar on mobile when logged in */}
            {user && (
              <div className="ml-2">
                <UserAvatar />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
