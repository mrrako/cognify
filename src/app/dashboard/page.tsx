"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { FileUpload } from "@/components/dashboard/file-upload";
import { QuizHistory } from "@/components/dashboard/quiz-history";
import { FlashcardCollections } from "@/components/dashboard/flashcard-collections";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, ChevronRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DashboardSkeleton } from "@/components/dashboard/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }

    if (user) {
      fetchNotes();
    }
  }, [user, authLoading, router]);

  async function fetchNotes() {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return <DashboardSkeleton />;
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background dark">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <DashboardHeader email={user.email || ""} />
        
        <main className="container mx-auto px-4 py-8 pb-20">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h1 className="text-4xl font-bold tracking-tight mb-2">
                    Welcome back, <span className="text-primary">{user.email?.split('@')[0]}</span>
                  </h1>
                  <p className="text-muted-foreground text-lg">Your AI study companion is ready.</p>
                </motion.div>

                <FileUpload />
              </div>

              <div className="lg:col-span-1">
                <QuizHistory />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    Uploaded Notes
                  </h2>
                  <Button variant="ghost" size="sm">View all</Button>
                </div>

                {notes.length === 0 ? (
                  <Card className="bg-black/40 border-white/5 border-dashed border-2 py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-1">No notes yet</h3>
                      <p className="text-muted-foreground text-sm max-w-xs">
                        Upload your first PDF to see it here and start learning with AI.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notes.map((note, i) => (
                      <motion.div
                        key={note.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link href={`/study/${note.id}`}>
                          <Card className="hover:border-primary/50 transition-all cursor-pointer group bg-black/40 border-white/5 relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <CardHeader className="pb-3">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6" />
                              </div>
                              <CardTitle className="text-xl group-hover:text-primary transition-colors truncate">{note.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-2 font-medium">
                                <span>{new Date(note.created_at).toLocaleDateString()}</span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center text-sm font-bold text-primary uppercase tracking-widest">
                                Open Study View
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <FlashcardCollections />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
