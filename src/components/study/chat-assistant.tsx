"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatAssistant({ noteId }: { noteId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Cognify AI. Ask me anything about your notes!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          noteId,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: assistantMessage }];
        });
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="w-16 h-16 rounded-full shadow-2xl glow p-0 flex items-center justify-center bg-primary"
            >
              <MessageSquare className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "64px" : "600px",
              width: isMinimized ? "300px" : "400px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
              isMinimized ? "h-16" : "h-[600px] w-full max-w-[calc(100vw-3rem)] sm:w-[400px]"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className={cn(isMinimized && "hidden")}>
                  <h3 className="font-bold text-sm">Cognify Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 text-muted-foreground"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 text-muted-foreground hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex",
                          m.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div className={cn(
                          "flex gap-3 max-w-[85%]",
                          m.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}>
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1",
                            m.role === "user" ? "bg-primary/20 text-primary" : "bg-white/10 text-white"
                          )}>
                            {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={cn(
                            "p-3 rounded-2xl text-sm leading-relaxed",
                            m.role === "user" 
                              ? "bg-primary text-primary-foreground rounded-tr-none" 
                              : "bg-white/5 text-foreground rounded-tl-none border border-white/5"
                          )}>
                            {m.content}
                            {isLoading && i === messages.length - 1 && m.role === "assistant" && m.content === "" && (
                              <div className="flex gap-1 mt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 bg-black/40 border-t border-white/5">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="bg-white/5 border-white/10 rounded-xl h-10 text-sm"
                    />
                    <Button 
                      onClick={handleSend} 
                      disabled={isLoading || !input.trim()} 
                      size="icon"
                      className="rounded-xl w-10 h-10 shrink-0 glow"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
