const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("hello");
    console.log("Flash works!");
  } catch (e) {
    console.error("Flash failed:", e.message);
  }
}

run();
