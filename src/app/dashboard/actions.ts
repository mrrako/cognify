"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { generateSummary, generateFlashcards, generateQuiz, chunkText, generateEmbedding } from "./ai-actions";

export async function uploadPDF(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file uploaded" };
    if (file.type !== "application/pdf") return { success: false, error: "Only PDFs are allowed" };

    const supabase = await createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) return { success: false, error: "Auth error: " + authError.message };
    if (!user) return { success: false, error: "You must be logged in to upload" };

    // Step 1: Parse PDF
    let text: string;
    try {
      // Polyfill DOMMatrix for serverless environments (Vercel)
      if (typeof globalThis.DOMMatrix === "undefined") {
        (globalThis as any).DOMMatrix = class DOMMatrix {
          m11=1;m12=0;m13=0;m14=0;m21=0;m22=1;m23=0;m24=0;
          m31=0;m32=0;m33=1;m34=0;m41=0;m42=0;m43=0;m44=1;
          a=1;b=0;c=0;d=1;e=0;f=0;is2D=true;isIdentity=true;
          constructor(...args: any[]) {}
          transformPoint() { return {}; }
          multiply() { return new (globalThis as any).DOMMatrix(); }
          inverse() { return new (globalThis as any).DOMMatrix(); }
          scale() { return new (globalThis as any).DOMMatrix(); }
          translate() { return new (globalThis as any).DOMMatrix(); }
          rotate() { return new (globalThis as any).DOMMatrix(); }
        };
      }
      if (typeof globalThis.Path2D === "undefined") {
        (globalThis as any).Path2D = class Path2D {
          constructor(...args: any[]) {}
          addPath() {} moveTo() {} lineTo() {} closePath() {}
          rect() {} arc() {} bezierCurveTo() {} quadraticCurveTo() {}
        };
      }

      const { PDFParse } = await import("pdf-parse");
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const parser = new PDFParse({ data: buffer });
      const pdfData = await parser.getText();
      text = pdfData.text;
      await parser.destroy();
    } catch (pdfError: any) {
      console.error("PDF Parse error:", pdfError);
      return { success: false, error: "PDF parsing failed: " + pdfError.message };
    }

    if (!text || text.length < 10) {
      return { success: false, error: "Could not extract text from this PDF. It may be scanned or image-based." };
    }

    // Step 2: Generate AI Content
    let aiSummary, aiFlashcards, aiQuiz;
    try {
      [aiSummary, aiFlashcards, aiQuiz] = await Promise.all([
        generateSummary(text),
        generateFlashcards(text),
        generateQuiz(text)
      ]);
    } catch (aiError: any) {
      console.error("AI generation error:", aiError);
      return { success: false, error: "AI processing failed: " + aiError.message };
    }

    // Step 3: Store Note Metadata
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .insert({
        user_id: user.id,
        title: file.name,
        summary: aiSummary,
        flashcards: aiFlashcards,
        quiz: aiQuiz,
      })
      .select()
      .single();

    if (noteError) {
      console.error("Supabase insert error:", noteError);
      return { success: false, error: "Database error: " + noteError.message };
    }

    // Step 4: Process Vector Search (Chunking & Embeddings)
    try {
      const chunks = await chunkText(text);
      
      const sectionPromises = chunks.map(async (chunk) => {
        const embedding = await generateEmbedding(chunk);
        return {
          note_id: note.id,
          content: chunk,
          embedding: embedding,
        };
      });

      const sections = await Promise.all(sectionPromises);

      const { error: sectionError } = await supabase
        .from("note_sections")
        .insert(sections);

      if (sectionError) {
        console.error("Section insert error:", sectionError);
        // Don't fail the whole upload if embeddings fail
      }
    } catch (embError: any) {
      console.error("Embedding error:", embError);
      // Don't fail the whole upload if embeddings fail
    }

    revalidatePath("/dashboard");
    return { success: true, id: note.id };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}
