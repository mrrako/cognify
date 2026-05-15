"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  GraduationCap, 
  Settings, 
  History,
  BookOpen,
  PlusCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FileText, label: "My Notes", href: "/dashboard/notes" },
  { icon: Brain, label: "Flashcards", href: "/dashboard/flashcards" },
  { icon: GraduationCap, label: "Quizzes", href: "/dashboard/quizzes" },
  { icon: History, label: "History", href: "/dashboard/history" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl hidden md:flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <span>Cognify</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <div className="pb-4">
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Menu
          </p>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Actions
          </p>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-primary hover:bg-primary/10 transition-all group">
            <PlusCircle className="w-4 h-4" />
            New Upload
          </button>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-white/5">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
