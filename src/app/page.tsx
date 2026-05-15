import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen dark">
      <Navbar />
      <main>
        <Hero />
        
        {/* Simple CTA Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to ace your exams?</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join thousands of students who are already using Cognify to save hours of study time every week.
            </p>
            <Button size="lg" className="rounded-full h-12 px-10 text-base" asChild>
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <span>Cognify</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2026 Cognify Inc. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
