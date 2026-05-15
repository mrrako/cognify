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
import { motion } from "framer-motion";

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
    <aside className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-3xl hidden md:flex flex-col sticky top-0 h-screen z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 font-bold text-2xl group">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="tracking-tight">Cognify</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8">
        <div className="space-y-2">
          <p className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">
            Study Hub
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden",
                  isActive 
                    ? "text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary z-[-1]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn(
                  "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-primary/70"
                )} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="space-y-2 px-4 pt-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-sm font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-all group border border-primary/20">
            <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            New Upload
          </button>
        </div>
      </nav>

      <div className="p-6 border-t border-white/5">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group",
            pathname === "/dashboard/settings" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          )}
        >
          <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
