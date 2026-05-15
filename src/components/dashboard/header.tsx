"use client";

import Link from "next/link";
import { BookOpen, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";

export function DashboardHeader({ email }: { email?: string }) {
  return (
    <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <span>Cognify</span>
          </Link>
        </div>
        <div className="hidden md:block" />

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          <UserMenu email={email} />
        </div>
      </div>
    </header>
  );
}
