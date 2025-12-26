
import { GoogleGenAI } from "@google/genai";

/**
 * Dies ist ein Beispiel für eine Vercel Serverless Function (/api/chat).
 * Sie empfängt Chat-Nachrichten, ruft Gemini auf und streamt die Antwort zurück.
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { messages } = await req.json();
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return new Response('API Key not configured', { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: `
          Du bist der Berater von "Kirschs Gartenbau" (Kuppenheim).
          TEAM: Elia, Philipp, Jonas, Luca.
          KONZEPT: Junges Team, Gartenpflege auf SPENDENBASIS für Erfahrung.
          STIL: Seriös, fachkundig, lokal verwurzelt.
          WICHTIG: Keine Festpreise. Verweise für Termine auf das Formular.
        `,
        temperature: 0.7,
      }
    });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of responseStream) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Proxy Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
