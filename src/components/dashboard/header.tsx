"use client";

import Link from "next/link";
import { BookOpen, Bell, Menu, LayoutDashboard, FileText, Brain, GraduationCap, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FileText, label: "My Notes", href: "/dashboard/notes" },
  { icon: Brain, label: "Flashcards", href: "/dashboard/flashcards" },
  { icon: GraduationCap, label: "Quizzes", href: "/dashboard/quizzes" },
  { icon: History, label: "History", href: "/dashboard/history" },
];

export function DashboardHeader({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="bg-black/90 border-white/5 w-64 p-0">
                <SheetHeader className="p-6 text-left border-b border-white/5">
                  <SheetTitle className="flex items-center gap-2 font-bold text-xl">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <span>Cognify</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="p-4 space-y-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                        pathname === item.href 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 mt-4 border-t border-white/5">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center gap-2 font-bold text-lg md:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <span>Cognify</span>
          </Link>
        </div>

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
