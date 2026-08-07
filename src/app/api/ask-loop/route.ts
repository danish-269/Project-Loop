import { prisma } from "@/lib/prisma";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
    try {
        const { question } = await req.json();

        const feedbacks = await prisma.feedback.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 100,
        });

        const feedbackText = feedbacks
            .map(
                (f) => `
Customer: ${f.customer ?? "Anonymous"}
Feedback: ${f.message}
Sentiment: ${f.sentiment ?? "Pending"}
Theme: ${f.theme ?? "Unknown"}
Summary: ${f.summary ?? "No summary"}
`
            )
            .join("\n--------------------\n");

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4.1-mini",

            max_tokens: 300,      // <-- ADD THIS
            temperature: 0.3,     // <-- Optional but recommended

            messages: [
                {
                    role: "system",
                    content: `
You are LOOP AI, an AI assistant for a Customer Feedback Intelligence Platform.

Answer ONLY using the feedback provided.
If the information is not available, say that it is not present in the available feedback.
Keep answers concise and business-focused.
      `,
                },
                {
                    role: "user",
                    content: `
Customer Feedback:

${feedbackText}

Question:
${question}
      `,
                },
            ],
        });

        return NextResponse.json({
            answer: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                answer: "Sorry, I couldn't analyze the feedback right now.",
            },
            { status: 500 }
        );
    }
}