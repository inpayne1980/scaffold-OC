import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Note: In a real app, ensure API_KEY is set. This demo assumes it's available.

const ai = new GoogleGenAI({ apiKey });

export const generateDashboardInsights = async (
  auditLogs: any[],
  stats: any
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    const prompt = `
      You are an AI analyst for a SaaS platform called Nexus.
      Analyze the following dashboard statistics and recent audit logs.
      Provide a brief, 2-sentence executive summary of the system's health and any anomalies.
      
      Stats: ${JSON.stringify(stats)}
      Recent Logs: ${JSON.stringify(auditLogs.slice(0, 5))}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Insights currently unavailable. Please check API configuration.";
  }
};

export const chatWithAssistant = async (history: string[], newMessage: string): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    // Using simple generation for this demo, usually ChatSession is better for history
    const prompt = `
      System: You are NexusBot, a helpful SaaS assistant. Keep answers short and professional.
      Conversation History:
      ${history.join('\n')}
      User: ${newMessage}
      NexusBot:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    
    return response.text || "I didn't catch that.";
  } catch (error) {
    console.error(error);
    return "I am having trouble connecting to the mainframe.";
  }
};
