"use server";

import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import pdf from "pdf-parse";
import { revalidatePath } from "next/cache";
import { generateSummary, generateFlashcards } from "./ai-actions";

export async function uploadPDF(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");
  if (file.type !== "application/pdf") throw new Error("Only PDFs are allowed");

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  
  if (!session) throw new Error("Unauthorized");

  try {
    const decodedToken = await adminAuth.verifyIdToken(session);
    const userId = decodedToken.uid;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // 3. Generate AI Content Automatically
    const [aiSummary, aiFlashcards] = await Promise.all([
      generateSummary(text),
      generateFlashcards(text)
    ]);

    // 4. Store in Firestore
    const noteRef = await adminDb.collection("users").doc(userId).collection("notes").add({
      title: file.name,
      content: text,
      summary: aiSummary,
      flashcards: aiFlashcards,
      pageCount: pdfData.numpages,
      createdAt: new Date(),
    });

    revalidatePath("/dashboard");
    return { success: true, id: noteRef.id };
  } catch (error: any) {
    console.error("Upload error:", error);
    throw new Error(error.message);
  }
}
