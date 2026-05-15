"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(text: string) {
  if (!text || text.length < 10) {
    throw new Error("Text is too short to generate a summary.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // or gpt-3.5-turbo
      messages: [
        {
          role: "system",
          content: `You are an expert educational AI assistant. Your goal is to help students understand complex lecture notes.
          Provide a concise, student-friendly summary of the provided text.
          Structure your response exactly as follows:
          
          # Summary
          [A concise 2-3 paragraph overview of the main topics]
          
          # Key Concepts
          [List 3-5 core concepts with a one-sentence simple explanation for each]
          
          # Important Points
          - [Bullet point 1]
          - [Bullet point 2]
          - [Bullet point 3]
          
          Use markdown formatting. Use bold text for emphasis. Simplify difficult jargon.`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error("AI Error:", error);
    throw new Error("Failed to generate AI summary.");
  }
}

export async function generateFlashcards(text: string) {
  if (!text || text.length < 10) return [];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an educational content creator. Create study flashcards from the provided text.
          Focus on:
          - Definitions of key terms
          - Important dates or numbers
          - Core concepts and their roles
          - Cause and effect relationships
          
          Return ONLY a JSON object with a key "flashcards" containing an array of objects.
          Each object must have exactly two keys: "question" and "answer".
          Keep questions and answers concise (under 20 words each) for better memorization.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const parsed = JSON.parse(response.choices[0].message.content || "{\"flashcards\": []}");
    return parsed.flashcards;
  } catch (error: any) {
    console.error("Flashcard AI Error:", error);
    return [];
  }
}

export async function generateQuiz(text: string, difficulty: "easy" | "medium" | "hard" = "medium") {
  if (!text || text.length < 10) return [];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert examiner. Create a multiple-choice quiz from the provided educational text.
          Difficulty Level: ${difficulty}
          
          Requirements:
          - Create 5 high-quality questions.
          - Each question must have exactly 4 options.
          - Identify the correct answer clearly.
          - Provide a brief explanation for the correct answer.
          
          Return ONLY a JSON object with a key "quiz" containing an array of objects.
          Each object must have: "question", "options" (array of 4 strings), "correctAnswer" (exact string from options), and "explanation".`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    return parsed.quiz;
  } catch (error: any) {
    console.error("Quiz AI Error:", error);
    return [];
  }
}

export async function generateEmbedding(text: string) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Embedding Error:", error);
    throw error;
  }
}

export function chunkText(text: string, size: number = 1000): string[] {
  const chunks: string[] = [];
  let index = 0;
  while (index < text.length) {
    chunks.push(text.slice(index, index + size));
    index += size - 100; // 100 char overlap
  }
  return chunks;
}
