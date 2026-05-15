"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

interface SummaryViewProps {
  content?: string;
}

export function SummaryView({ content = "" }: SummaryViewProps) {
  if (!content) {
    return (
      <Card className="bg-black/40 border-white/5 border-dashed border-2 py-12">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No summary yet</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            The AI is still processing this document. Check back in a few seconds.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
          <Sparkles className="w-4 h-4" />
          AI Generated Insight
        </div>
        <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <Card className="bg-black/40 border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors" />
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            Comprehensive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-primary prose-li:text-muted-foreground pt-4 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  );
}
