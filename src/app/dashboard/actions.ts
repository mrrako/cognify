"use server";

import { createClient } from "@/utils/supabase/server";
import { PDFParse as pdf } from "pdf-parse";
import { revalidatePath } from "next/cache";
import { generateSummary, generateFlashcards, generateQuiz, chunkText, generateEmbedding } from "./ai-actions";

export async function uploadPDF(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");
  if (file.type !== "application/pdf") throw new Error("Only PDFs are allowed");

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parser = new pdf({ data: buffer });
    const pdfData = await parser.getText();
    const text = pdfData.text;
    await parser.destroy();

    // 1. Generate AI Content
    const [aiSummary, aiFlashcards, aiQuiz] = await Promise.all([
      generateSummary(text),
      generateFlashcards(text),
      generateQuiz(text)
    ]);

    // 2. Store Note Metadata
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

    if (noteError) throw noteError;

    // 3. Process Vector Search (Chunking & Embeddings)
    const chunks = await chunkText(text);
    
    // Process chunks in batches for efficiency
    const sectionPromises = chunks.map(async (chunk) => {
      const embedding = await generateEmbedding(chunk);
      return {
        note_id: note.id,
        content: chunk,
        embedding: embedding,
      };
    });

    const sections = await Promise.all(sectionPromises);

    // 4. Store Chunks in note_sections
    const { error: sectionError } = await supabase
      .from("note_sections")
      .insert(sections);

    if (sectionError) throw sectionError;

    revalidatePath("/dashboard");
    return { success: true, id: note.id };
  } catch (error: any) {
    console.error("Upload error:", error);
    throw new Error(error.message);
  }
}
