"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function AuthButton() {
  const { user, loading } = useAuth();

  if (loading) return <div className="w-20 h-8 bg-white/5 animate-pulse rounded-full" />;

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground hidden lg:inline">Hey, {user.email}!</span>
      <Button size="sm" className="rounded-full px-6" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </div>
  ) : (
    <Button size="sm" className="rounded-full px-6" asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
