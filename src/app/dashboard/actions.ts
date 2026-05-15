"use server";

import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import pdf from "pdf-parse";
import { revalidatePath } from "next/cache";

export async function uploadPDF(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");
  if (file.type !== "application/pdf") throw new Error("Only PDFs are allowed");

  // Get user session from cookie (simplified for hackathon)
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  
  if (!session) throw new Error("Unauthorized");

  try {
    const decodedToken = await adminAuth.verifyIdToken(session);
    const userId = decodedToken.uid;

    // 1. Convert file to Buffer for processing
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extract Text
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // 3. Store in Firestore (instead of full storage for this demo, 
    // we'll store the text and metadata directly for AI processing later)
    // In a real app, you'd upload to Firebase Storage here as well.
    const noteRef = await adminDb.collection("users").doc(userId).collection("notes").add({
      title: file.name,
      content: text,
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
