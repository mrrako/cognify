import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const geminiProModel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const geminiEmbeddingModel = genAI.getGenerativeModel({ model: "embedding-001" });
