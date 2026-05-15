"use client";

import { motion } from "framer-motion";
import { Zap, Brain, FileText, Sparkles, Shield, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Upload your PDFs and get results in seconds. Our AI is optimized for speed.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    icon: Brain,
    title: "Neural Summaries",
    description: "Deep learning models extract the core concepts from your lecture notes accurately.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    icon: FileText,
    title: "Smart Flashcards",
    description: "Automatically generated cards focused on the most exam-relevant information.",
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  },
  {
    icon: Sparkles,
    title: "AI Chat Assistant",
    description: "Ask questions about your notes and get instant, context-aware explanations.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your documents are encrypted and never shared. Your data is your own.",
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  {
    icon: Cpu,
    title: "Custom Quizzes",
    description: "Generate practice exams that mimic your real test format and difficulty.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10"
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Everything you need to <span className="text-primary">master</span> your courses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Powerful AI tools designed specifically for students and educators.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-primary/50 transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
