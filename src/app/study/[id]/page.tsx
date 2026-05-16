"use client";

import { use, useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryView } from "@/components/study/summary-view";
import { FlashcardsView } from "@/components/study/flashcards-view";
import { QuizView } from "@/components/study/quiz-view";
import { FileText, Brain, GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { createClient } from "@/utils/supabase/client";
import { ChatAssistant } from "@/components/study/chat-assistant";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
        return;
      }
      fetchNote();
    }
  }, [user, authLoading, id]);

  async function fetchNote() {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
        toast.error("Failed to load: " + error.message);
        return;
      }
      setNote(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background dark">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !note) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Could not load note</h2>
        {error && <p className="text-muted-foreground text-sm max-w-md">{error}</p>}
        <Button asChild><Link href="/dashboard">Return to Dashboard</Link></Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark pb-24">
      <DashboardHeader email={user?.email || ""} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <p className="text-muted-foreground mt-1">
                Uploaded {new Date(note.created_at).toLocaleDateString()}
              </p>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/40 border border-white/5 p-1 rounded-xl h-12">
                <TabsTrigger value="summary" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileText className="w-4 h-4 mr-2" />
                  Summary
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Brain className="w-4 h-4 mr-2" />
                  Flashcards
                </TabsTrigger>
                <TabsTrigger value="quiz" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Quiz
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="mt-0">
                <SummaryView content={note.summary} />
              </TabsContent>
              
              <TabsContent value="flashcards" className="mt-0">
                <FlashcardsView flashcards={note.flashcards} />
              </TabsContent>

              <TabsContent value="quiz" className="mt-0">
                <QuizView questions={note.quiz} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      {/* Floating Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatAssistant noteId={note.id} />
      </div>
    </div>
  );
}
