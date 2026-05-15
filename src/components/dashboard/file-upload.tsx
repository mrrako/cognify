"use client";

import { useState } from "react";
import { Upload, File, X, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

import { uploadPDF } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

export function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploading" | "extracting" | "success">("idle");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setStatus("uploading");
    
    // Simulate upload progress
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p <= 90) setProgress(p);
      if (p === 90) {
        clearInterval(interval);
        setStatus("extracting");
      }
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      const result = await uploadPDF(formData);
      
      if (result.success) {
        setProgress(100);
        setStatus("success");
        setIsUploading(false);
      }
    } catch (error: any) {
      alert("Error uploading: " + error.message);
      setIsUploading(false);
      setStatus("idle");
      setFile(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      handleUpload(droppedFile);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative group cursor-pointer"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-12 rounded-2xl border-2 border-dashed border-white/10 bg-black/40 hover:border-primary/50 transition-all flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload your notes</h3>
                <p className="text-muted-foreground mb-6 max-w-xs text-sm">
                  Drag and drop your PDF lecture notes here. We'll automatically summarize them for you.
                </p>
                <label className="cursor-pointer">
                  <Button variant="secondary" className="rounded-full px-8 pointer-events-none">
                    Select File
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                  />
                </label>
              </motion.div>
            ) : status === "uploading" || status === "extracting" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-sm"
              >
                <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-center uppercase tracking-widest text-xs text-primary">
                  {status === "uploading" ? "Uploading PDF..." : "Extracting Knowledge..."}
                </h3>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-[10px] text-muted-foreground text-center font-bold">{progress}% completed</p>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Knowledge Extracted!</h3>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-6">
                  <File className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium truncate max-w-[200px]">{file?.name}</span>
                </div>
                <Button className="rounded-full px-8 glow" onClick={() => router.refresh()}>
                  Go to Dashboard
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
