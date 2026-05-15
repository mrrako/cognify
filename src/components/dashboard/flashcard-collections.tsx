"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Play } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const collections: any[] = []; // Real data would be fetched here

export function FlashcardCollections() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Flashcard Decks
        </h2>
      </div>
      {collections.length === 0 ? (
        <Card className="bg-black/40 border-white/5 border-dashed border-2 py-8">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <Brain className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No decks yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((deck) => (
            <Card key={deck.id} className="bg-black/40 border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{deck.title}</CardTitle>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{deck.cards} Cards</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    <span>Mastery</span>
                    <span>{deck.progress}%</span>
                  </div>
                  <Progress value={deck.progress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
