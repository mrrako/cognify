import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export const geminiProModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
export const geminiEmbeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
