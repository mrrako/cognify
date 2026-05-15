"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";

export function FlashcardsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = [
    { q: "What is the primary function of Mitochondria?", a: "To produce energy in the form of ATP through cellular respiration." },
    { q: "What distinguishes Eukaryotic cells from Prokaryotic cells?", a: "Presence of a membrane-bound nucleus and organelles." },
    { q: "What is the role of the Golgi Apparatus?", a: "Modifying, sorting, and packaging proteins for secretion." },
  ];

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="w-full max-w-lg aspect-[4/3] perspective-1000">
        <motion.div
          className="relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 bg-black/40 border border-white/10 rounded-[2rem] text-center shadow-xl">
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Question</span>
            <h3 className="text-2xl font-bold leading-tight">{flashcards[currentIndex].q}</h3>
            <div className="mt-8 text-muted-foreground text-sm flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Click to flip
            </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 bg-primary/10 border border-primary/20 rounded-[2rem] text-center shadow-xl"
            style={{ transform: "rotateY(180deg)" }}
          >
            <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Answer</span>
            <p className="text-xl font-medium leading-relaxed">{flashcards[currentIndex].a}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="outline" size="icon" className="rounded-full" onClick={prevCard}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium">
          {currentIndex + 1} / {flashcards.length}
        </span>
        <Button variant="outline" size="icon" className="rounded-full" onClick={nextCard}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
