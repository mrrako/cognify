"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const quizHistory = [
  { id: 1, title: "Cell Biology Quiz", score: "9/10", date: "May 12, 2026", status: "Perfect" },
  { id: 2, title: "Economic Principles", score: "7/10", date: "May 10, 2026", status: "Good" },
  { id: 3, title: "Organic Chem Basics", score: "5/10", date: "May 08, 2026", status: "Average" },
];

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
          {quizHistory.map((quiz) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
