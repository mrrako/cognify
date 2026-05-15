"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, RotateCcw, Timer, Trophy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizViewProps {
  questions?: QuizQuestion[];
}

export function QuizView({ questions = [] }: QuizViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  const safeQuestions = questions.length > 0 ? questions : [
    {
      question: "No quiz data found.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: "Please upload a PDF to generate a quiz."
    }
  ];

  const handleNext = useCallback(() => {
    if (currentStep < safeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setTimeLeft(30);
    } else {
      setShowResult(true);
    }
  }, [currentStep, safeQuestions.length]);

  // Timer logic
  useEffect(() => {
    if (showResult || isSubmitted) return;

    if (timeLeft === 0) {
      setIsSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, isSubmitted]);

  const handleOptionSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);
    if (selectedOption === safeQuestions[currentStep].correctAnswer) {
      setScore(score + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
  };

  if (showResult) {
    const percentage = Math.round((score / safeQuestions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 max-w-md mx-auto"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-4xl font-bold mb-2">Quiz Finished!</h3>
        <p className="text-muted-foreground mb-8">Great job on completing the assessment.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-10">
          <Card className="bg-white/5 border-white/10 p-6">
            <p className="text-3xl font-bold text-primary">{score}</p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Correct</p>
          </Card>
          <Card className="bg-white/5 border-white/10 p-6">
            <p className="text-3xl font-bold text-primary">{percentage}%</p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Score</p>
          </Card>
        </div>

        <Button onClick={resetQuiz} size="lg" className="rounded-full px-10 glow">
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Quiz Again
        </Button>
      </motion.div>
    );
  }

  const currentQuestion = safeQuestions[currentStep];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header Info */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Question {currentStep + 1} / {safeQuestions.length}</span>
            <h4 className="text-lg font-bold">Assessment in progress</h4>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${timeLeft < 10 ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-muted-foreground'}`}>
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold">{timeLeft}s</span>
          </div>
        </div>
        <Progress value={((currentStep + 1) / safeQuestions.length) * 100} className="h-1.5" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">
            {currentQuestion.question}
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, i) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedOption;
              
              let style = "border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10";
              if (isSubmitted) {
                if (isCorrect) style = "border-green-500 bg-green-500/10 text-green-500";
                else if (isSelected) style = "border-red-500 bg-red-500/10 text-red-500";
                else style = "opacity-50 border-white/5";
              } else if (isSelected) {
                style = "border-primary bg-primary/10 text-primary";
              }

              return (
                <button
                  key={i}
                  disabled={isSubmitted}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-6 rounded-[1.5rem] border-2 text-left transition-all duration-200 flex items-center justify-between group ${style}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-white/5 border-white/10'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="font-medium text-lg">{option}</span>
                  </div>
                  {isSubmitted && isCorrect && <Check className="w-6 h-6" />}
                  {isSubmitted && isSelected && !isCorrect && <X className="w-6 h-6" />}
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-[1.5rem] border ${selectedOption === currentQuestion.correctAnswer ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}
            >
              <div className="flex gap-3">
                <AlertCircle className={`w-5 h-5 shrink-0 ${selectedOption === currentQuestion.correctAnswer ? 'text-green-500' : 'text-red-500'}`} />
                <div className="space-y-1">
                  <p className="font-bold text-sm uppercase tracking-widest">
                    {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentQuestion.explanation || "No explanation provided for this question."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-end">
        {!isSubmitted ? (
          <Button 
            disabled={selectedOption === null} 
            onClick={handleSubmit}
            size="lg"
            className="rounded-full px-12 h-14 text-lg glow"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} size="lg" className="rounded-full px-12 h-14 text-lg">
            {currentStep < safeQuestions.length - 1 ? "Next Question" : "See Results"}
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
