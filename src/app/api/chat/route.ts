import { OpenAIStream, StreamingTextResponse } from "ai"; // Wait, I need 'ai' package for easier streaming
import OpenAI from "openai";
import { adminDb } from "@/lib/firebase/admin";

// I'll use the native OpenAI streaming instead of 'ai' package to avoid extra dependencies if possible
// But 'ai' package is industry standard for this. I'll check if it's installed.
// It's not. I'll use standard OpenAI streaming.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export const runtime = "edge"; // Firebase admin needs nodejs

export async function POST(req: Request) {
  try {
    const { messages, noteId, userId } = await req.json();

    // Fetch note context from Firestore
    const noteDoc = await adminDb
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(noteId)
      .get();

    const noteContent = noteDoc.exists ? noteDoc.data()?.content : "";

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are Cognify AI, a helpful study assistant. 
          Use the following student notes as context to answer questions. 
          If the answer is not in the notes, use your general knowledge but mention it's not in the notes.
          Keep answers concise, helpful, and use markdown formatting.
          
          NOTES CONTEXT:
          ${noteContent}`
        },
        ...messages,
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(content));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
