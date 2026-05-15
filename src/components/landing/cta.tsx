"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/30 via-primary/5 to-transparent border border-primary/20 text-center overflow-hidden"
      >
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -mr-48 -mt-48 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full -ml-48 -mb-48 animate-pulse" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-8">
            <Sparkles className="w-3 h-3" />
            <span>Start your journey today</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to <span className="text-primary text-gradient">elevate</span> your learning?
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
            Stop wasting hours on manual notes. Let Cognify handle the heavy lifting so you can focus on mastering the material.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full h-14 px-10 text-lg glow w-full sm:w-auto" asChild>
              <Link href="/dashboard">
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground sm:ml-4">
              No credit card required.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
