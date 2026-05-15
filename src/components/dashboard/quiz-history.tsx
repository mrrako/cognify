"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowUpRight, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const quizHistory: any[] = [];

export function QuizHistory() {
  return (
    <Card className="bg-black/40 border-white/5 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Quiz History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quizHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <History className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">No recent quizzes</p>
            </div>
          ) : (
            quizHistory.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10">
                <div className="flex flex-col">
                  <span className="font-medium">{quiz.title}</span>
                  <span className="text-xs text-muted-foreground">{quiz.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <p className="text-sm font-bold text-primary">{quiz.score}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{quiz.status}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
