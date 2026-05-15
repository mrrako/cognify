import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";
import { generateEmbedding } from "@/app/dashboard/ai-actions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, noteId } = await req.json();
    const supabase = await createClient();

    // 1. Get the last user message
    const lastMessage = messages[messages.length - 1].content;

    // 2. Generate embedding for the query
    const queryEmbedding = await generateEmbedding(lastMessage);

    // 3. Perform semantic search using the match_note_sections function
    const { data: chunks, error: searchError } = await supabase.rpc("match_note_sections", {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 5,
      p_note_id: noteId
    });

    if (searchError) throw searchError;

    // 4. Combine chunks into context
    const context = chunks?.map((c: any) => c.content).join("\n\n---\n\n") || "No relevant context found in notes.";

    // 5. Stream from OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are Cognify AI, a helpful study assistant. 
          Use the following SEMANTICALLY RELEVANT EXCERPTS from the student's notes to answer their question. 
          If the answer is not in the excerpts, use your general knowledge but clarify it wasn't found in the specific notes provided.
          Keep answers concise and helpful.
          
          NOTES CONTEXT:
          ${context}`
        },
        ...messages,
      ],
    });

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
