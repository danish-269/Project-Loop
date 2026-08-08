import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { customer, source, message, workspaceId } = body;

        if (!message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback message is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!workspaceId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Workspace ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                id: workspaceId,
            },
        });

        if (!workspace) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Workspace not found.",
                },
                {
                    status: 404,
                }
            );
        }

        // Analyze feedback using AI
        const aiResponse = await fetch("http://localhost:3000/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                feedback: message,
            }),
        });

        const aiResult = await aiResponse.json();

        if (!aiResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "AI analysis failed.",
                },
                {
                    status: 500,
                }
            );
        }

        // Remove ```json ... ``` if present
        const cleaned = aiResult.result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const analysis = JSON.parse(cleaned);

        const feedback = await prisma.feedback.create({
            data: {
                customer,
                message,
                source,
                workspaceId: workspace.id,
                sentiment: analysis.sentiment.toUpperCase(),
                theme: analysis.theme,
                summary: analysis.summary,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Feedback saved successfully!",
            feedback,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const workspaceId = searchParams.get("workspaceId");

        if (!workspaceId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Workspace ID is required.",
                },
                { status: 400 }
            );
        }

        const feedbacks = await prisma.feedback.findMany({
            where: {
                workspaceId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            feedbacks,
        });
    } catch (error) {
        console.error("Feedback API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch feedback.",
            },
            { status: 500 }
        );
    }
}