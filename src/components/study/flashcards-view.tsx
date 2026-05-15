"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCw, Keyboard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsViewProps {
  flashcards?: Flashcard[];
}

export function FlashcardsView({ flashcards = [] }: FlashcardsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const safeCards = flashcards.length > 0 ? flashcards : [
    { question: "No flashcards generated yet.", answer: "Upload a PDF to generate study cards." }
  ];

  const nextCard = useCallback(() => {
    setDirection(1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % safeCards.length);
    }, 50);
  }, [safeCards.length]);

  const prevCard = useCallback(() => {
    setDirection(-1);
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + safeCards.length) % safeCards.length);
    }, 50);
  }, [safeCards.length]);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextCard();
      if (e.key === "ArrowLeft") prevCard();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggleFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, toggleFlip]);

  const progress = ((currentIndex + 1) / safeCards.length) * 100;

  return (
    <div className="flex flex-col items-center gap-10 py-12 max-w-2xl mx-auto w-full">
      {/* Progress & Info */}
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Your Progress</p>
            <p className="text-xl font-bold">Card {currentIndex + 1} of {safeCards.length}</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
            <Keyboard className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Use Arrows to navigate, Space to flip</span>
          </div>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Card Container */}
      <div className="w-full aspect-[16/10] perspective-2000 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction * 50, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -direction * 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full"
          >
            <motion.div
              className="relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              onClick={toggleFlip}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 bg-black/40 border border-white/10 rounded-[3rem] text-center shadow-2xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-6">Question</span>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight max-w-md">
                  {safeCards[currentIndex].question}
                </h3>
                <div className="mt-12 text-muted-foreground text-xs flex items-center gap-2 font-bold uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                  <RotateCw className="w-4 h-4" />
                  Click to reveal answer
                </div>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-12 bg-primary/10 border-2 border-primary/20 rounded-[3rem] text-center shadow-2xl overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1),transparent)]" />
                <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-6">Answer</span>
                <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-md text-foreground">
                  {safeCards[currentIndex].answer}
                </p>
                <div className="mt-12 text-primary/60 text-xs flex items-center gap-2 font-bold uppercase tracking-widest">
                  <RotateCw className="w-4 h-4" />
                  Click to flip back
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full w-14 h-14 border-white/10 hover:bg-white/5" 
          onClick={prevCard}
          disabled={safeCards.length <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <div className="px-6 py-2 rounded-full bg-white/5 border border-white/5 text-sm font-bold tracking-tighter">
          {currentIndex + 1} / {safeCards.length}
        </div>

        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full w-14 h-14 border-white/10 hover:bg-white/5" 
          onClick={nextCard}
          disabled={safeCards.length <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
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
