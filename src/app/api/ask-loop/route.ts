import { prisma } from "@/lib/prisma";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Project LOOP",
    },
});

export async function POST(req: Request) {
    try {
        const { question, userId, workspaceId } = await req.json();

        // Validate request
        if (!question?.trim()) {
            return NextResponse.json(
                {
                    answer: "Please enter a question.",
                },
                { status: 400 }
            );
        }

        if (!userId || !workspaceId) {
            return NextResponse.json(
                {
                    answer: "User information is missing. Please log in again.",
                },
                { status: 401 }
            );
        }

        // Verify that the user actually belongs to this workspace
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                role: true,
                workspaceId: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    answer: "User not found. Please log in again.",
                },
                { status: 401 }
            );
        }

        if (!user.workspaceId) {
            return NextResponse.json(
                {
                    answer: "Your account is not assigned to a workspace.",
                },
                { status: 400 }
            );
        }

        if (user.workspaceId !== workspaceId) {
            return NextResponse.json(
                {
                    answer: "You do not have access to this workspace.",
                },
                { status: 403 }
            );
        }

        // Get feedback ONLY from the user's workspace
        const feedbacks = await prisma.feedback.findMany({
            where: {
                workspaceId: user.workspaceId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 100,
            select: {
                customer: true,
                message: true,
                sentiment: true,
                theme: true,
                summary: true,
                rating: true,
            },
        });

        if (feedbacks.length === 0) {
            return NextResponse.json({
                answer:
                    "There is no customer feedback available in your workspace yet.",
            });
        }

        const feedbackText = feedbacks
            .map(
                (f) => `
Customer: ${f.customer ?? "Anonymous"}
Rating: ${f.rating ?? "Not provided"}/5
Feedback: ${f.message}
Sentiment: ${f.sentiment ?? "Pending"}
Theme: ${f.theme ?? "Unknown"}
Summary: ${f.summary ?? "No summary"}
`
            )
            .join("\n--------------------\n");

        const completion = await client.chat.completions.create({
            model: "openai/gpt-4.1-mini",
            max_tokens: 300,
            temperature: 0.3,

            messages: [
                {
                    role: "system",
                    content: `
You are LOOP AI, an AI assistant for a Customer Feedback Intelligence Platform.

You must answer ONLY using the customer feedback provided below.

Rules:
- Do not invent information.
- Do not use outside knowledge.
- If the requested information is not available, clearly say that it is not present in the available feedback.
- Keep answers concise and business-focused.
- Use the actual sentiment, theme, rating and feedback when relevant.
- When giving counts or percentages, calculate them from the provided feedback.
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

        const answer =
            completion.choices[0]?.message?.content ||
            "I couldn't generate an answer from the available feedback.";

        return NextResponse.json({
            success: true,
            answer,
        });
    } catch (error: any) {
        console.error("Ask LOOP Error:", error);

        return NextResponse.json(
            {
                success: false,
                answer: "Sorry, I couldn't analyze the feedback right now.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}