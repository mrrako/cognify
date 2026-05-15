"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryView } from "@/components/study/summary-view";
import { FlashcardsView } from "@/components/study/flashcards-view";
import { QuizView } from "@/components/study/quiz-view";
import { FileText, Brain, GraduationCap, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudyPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background dark">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumbs / Back */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Introduction to Biology</h1>
            <p className="text-muted-foreground mt-1">Uploaded 2 hours ago • 12 pages</p>
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
              <SummaryView />
            </TabsContent>
            
            <TabsContent value="flashcards" className="mt-0">
              <FlashcardsView />
            </TabsContent>

            <TabsContent value="quiz" className="mt-0">
              <QuizView />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
