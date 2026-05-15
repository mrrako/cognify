"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    desc: "Drop your PDF lecture notes or textbook chapters into the dashboard.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Wand2,
    title: "Process",
    desc: "Our AI analyzes the content, identifying key themes and complex topics.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: GraduationCap,
    title: "Learn",
    desc: "Study with interactive summaries, flashcards, and quizzes tailored to you.",
    color: "from-orange-500 to-red-500"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How it <span className="text-primary">Works</span></h2>
          <p className="text-muted-foreground text-lg">Three simple steps to smarter studying.</p>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-0.5 mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
