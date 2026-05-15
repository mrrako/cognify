"use client";

import { useState } from "react";
import { loginWithEmail, signupWithEmail } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { BookOpen, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background p-4">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <span>Cognify</span>
        </Link>

        <Card className="bg-black/40 border-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {mode === "login" 
                ? "Enter your credentials to access your dashboard" 
                : "Join Cognify and start learning smarter today"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => {
              setIsPending(true);
              if (mode === "login") await loginWithEmail(formData);
              else await signupWithEmail(formData);
              setIsPending(false);
            }} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="bg-white/5 border-white/10"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 rounded-xl glow" 
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                  </>
                ) : (
                  mode === "login" ? "Login" : "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <button 
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {mode === "login" 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Login"}
            </button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
