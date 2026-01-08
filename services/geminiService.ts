
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Devotional } from "../types.ts";

/**
 * Generates a daily Christian devotional using the Gemini model.
 */
export const getDailyDevotional = async (): Promise<Devotional> => {
  // Create a new GoogleGenAI instance right before the call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Genera un devocional cristiano para el día de hoy en español. El contenido debe ser inspirador, basado en la Biblia y estructurado con título, versículo, reflexión y oración.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          verse: { type: Type.STRING },
          reflection: { type: Type.STRING },
          prayer: { type: Type.STRING },
        },
        required: ["title", "verse", "reflection", "prayer"],
      },
    },
  });
  
  return JSON.parse(response.text.trim()) as Devotional;
};

// Fix for Assistant.tsx: Added streamChatResponse to handle spiritual assistant chat interactions using streaming
export const streamChatResponse = async (
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  onChunk: (chunk: string) => void
): Promise<void> => {
  // Create a new GoogleGenAI instance right before the call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContentStream({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
      systemInstruction: "Eres un Compañero Nazareno, un asistente espiritual cristiano. Brinda apoyo, oraciones y versículos bíblicos de manera amable y empática.",
    },
  });

  for await (const chunk of response) {
    // Use the .text property from GenerateContentResponse as specified in the Gemini API guidelines
    const text = (chunk as GenerateContentResponse).text;
    if (text) {
      onChunk(text);
    }
  }
};
