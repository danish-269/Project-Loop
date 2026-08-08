import OpenAI from "openai";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Project LOOP",
  },
});

export async function POST(request: Request) {
  try {
    const {
      customer,
      email,
      message,
      rating,
      category,
    } = await request.json();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Feedback is required.",
        },
        { status: 400 }
      );
    }

    // =========================
    // AI ANALYSIS
    // =========================

    const completion = await client.chat.completions.create({
      model: "nvidia/nemotron-nano-9b-v2:free",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `You are an AI Customer Feedback Analyst.

Return ONLY valid JSON in this format:

{
  "sentiment": "Positive|Neutral|Negative",
  "theme": "One short theme",
  "summary": "One sentence summary"
}`,
        },
        {
          role: "user",
          content: `Customer: ${customer}
Email: ${email}
Rating: ${rating}/5
Category: ${category}

Feedback:
${message}`,
        },
      ],
    });

    const result = completion.choices[0].message.content ?? "";

    console.log("AI Response:", result);

    // =========================
    // EXTRACT JSON FROM AI RESPONSE
    // =========================

    const json = result.match(/\{[\s\S]*\}/);

    if (!json) {
      return NextResponse.json(
        {
          success: false,
          message: "AI did not return JSON.",
          raw: result,
        },
        { status: 500 }
      );
    }

    let ai;

    try {
      ai = JSON.parse(json[0]);
    } catch {
      console.log("Raw AI response:", result);

      return NextResponse.json(
        {
          success: false,
          message: "AI returned invalid JSON.",
          response: result,
        },
        { status: 500 }
      );
    }

    console.log("AI Analysis:", ai);

    // =========================
    // GET WORKSPACE
    // =========================

    const workspace = await prisma.workspace.findFirst();

    if (!workspace) {
      return NextResponse.json(
        {
          success: false,
          message: "No workspace found.",
        },
        { status: 400 }
      );
    }

    console.log("Workspace:", workspace);
    console.log("Workspace ID:", workspace.id);

    // =========================
    // SAVE FEEDBACK
    // =========================

    const feedback = await prisma.feedback.create({
      data: {
        customer,
        message,
        source: "MANUAL",
        sentiment: ai.sentiment?.toUpperCase(),
        theme: ai.theme,
        summary: ai.summary,
        workspaceId: workspace.id,
      },
    });

    console.log("Feedback created:", feedback.id);

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json({
      success: true,
      result: ai,
      feedbackId: feedback.id,
    });
  } catch (error: any) {
    console.error("OpenRouter Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "AI analysis failed.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}