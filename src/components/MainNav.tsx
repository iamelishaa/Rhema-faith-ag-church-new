"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import churchLogo from "@/assets/logo.png";
import profileImage from "@/assets/profile.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Sermons", href: "/sermons" },
  { name: "Ministries", href: "/ministries" },
  { name: "Online", href: "/online" },
  { name: "Giving", href: "/giving" },
];

export function MainNav() {
  const pathname = usePathname();

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
                src={churchLogo}
                alt="Rhema Faith AG Church Logo"
                width={43}
                height={43}
                className="rounded-full border-1"
                priority
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
          <nav className="hidden md:flex items-center space-x-8">
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

            {/* Profile Avatar */}
            <div className="ml-4">
              <Link href="/profile" className="block">
                <Avatar
                  src={profileImage.src}
                  alt="User Profile"
                  className="h-6.5 w-6.5 hover:opacity-80 transition-opacity"
                />
                <span className="sr-only">Profile</span>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <Link href="/profile" className="block">
                <Avatar
                  src={profileImage.src}
                  alt="User Profile"
                  className="h-10 w-10 hover:opacity-80 transition-opacity"
                />
                <span className="sr-only">Profile</span>
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-muted font-medium"
                          : "hover:bg-muted/50"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
