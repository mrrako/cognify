"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function QuizView() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const quiz = [
    {
      q: "Which organelle is known as the 'powerhouse of the cell'?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"],
      correct: 2
    },
    {
      q: "What is the main component of the plant cell wall?",
      options: ["Starch", "Cellulose", "Protein", "Lipid"],
      correct: 1
    }
  ];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === quiz[currentStep].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < quiz.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="text-center py-12">
        <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
        <p className="text-xl text-muted-foreground mb-8">
          Your score: <span className="text-primary font-bold">{score} / {quiz.length}</span>
        </p>
        <Button onClick={resetQuiz} className="rounded-full px-8">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">Question {currentStep + 1} of {quiz.length}</span>
          <span className="text-sm font-bold text-primary">{Math.round(((currentStep + 1) / quiz.length) * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / quiz.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold mb-8">{quiz[currentStep].q}</h2>
          
          <div className="space-y-4">
            {quiz[currentStep].options.map((option, i) => {
              const isCorrect = i === quiz[currentStep].correct;
              const isSelected = i === selectedOption;
              
              let variant = "border-white/5 bg-white/[0.02]";
              if (isSubmitted) {
                if (isCorrect) variant = "border-green-500/50 bg-green-500/10 text-green-500";
                else if (isSelected) variant = "border-red-500/50 bg-red-500/10 text-red-500";
              } else if (isSelected) {
                variant = "border-primary bg-primary/10";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  className={`w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between ${variant}`}
                >
                  <span className="font-medium">{option}</span>
                  {isSubmitted && isCorrect && <Check className="w-5 h-5" />}
                  {isSubmitted && isSelected && !isCorrect && <X className="w-5 h-5" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-end">
        {!isSubmitted ? (
          <Button 
            disabled={selectedOption === null} 
            onClick={handleSubmit}
            className="rounded-full px-8"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="rounded-full px-8">
            {currentStep < quiz.length - 1 ? "Next Question" : "See Results"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
