"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Medical Student",
    content: "Cognify saved me hours of note-taking. The AI summaries are surprisingly accurate and help me focus on high-yield topics.",
    avatar: "AJ"
  },
  {
    name: "Sarah Chen",
    role: "CS Major",
    content: "The flashcard generation is a game changer for my data structures class. I went from failing to top of my class.",
    avatar: "SC"
  },
  {
    name: "Michael Ross",
    role: "Law Student",
    content: "Summarizing 50-page legal briefs into key arguments in seconds? This is like magic. Highly recommended.",
    avatar: "MR"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by <span className="text-primary">Students</span></h2>
          <p className="text-muted-foreground text-lg">Join 10,000+ students already learning faster.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm relative group hover:bg-white/[0.04] transition-all"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-lg mb-8 leading-relaxed italic text-muted-foreground">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/20">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
