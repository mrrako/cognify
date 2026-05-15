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
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Generate 5-8 high-quality flashcards for the provided educational text.
          Return the result as a JSON array of objects with 'question' and 'answer' keys.
          Focus on facts, definitions, and concepts likely to appear in an exam.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.flashcards || [];
  } catch (error: any) {
    console.error("Flashcard AI Error:", error);
    return [];
  }
}
