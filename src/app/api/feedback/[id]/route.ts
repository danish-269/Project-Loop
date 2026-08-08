import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";


export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                { status: 401 }
            );
        }

        if (!currentUser.workspaceId) {
            return NextResponse.json(
                { success: false, message: "Workspace not found." },
                { status: 400 }
            );
        }

        const { id } = await params;

        const feedback = await prisma.feedback.findFirst({
            where: {
                id,
                workspaceId: currentUser.workspaceId,
            },
        });

        if (!feedback) {
            return NextResponse.json(
                { success: false, message: "Feedback not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            feedback,
        });
    } catch (error) {
        console.error("Get feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to load feedback.",
            },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                { status: 401 }
            );
        }

        // VIEWER cannot edit
        if (currentUser.role === "VIEWER") {
            return NextResponse.json(
                { success: false, message: "You don't have permission to edit feedback." },
                { status: 403 }
            );
        }

        if (!currentUser.workspaceId) {
            return NextResponse.json(
                { success: false, message: "Workspace not found." },
                { status: 400 }
            );
        }

        const { id } = await params;

        const body = await request.json();

        const { customer, message, source } = body;

        if (!message?.trim()) {
            return NextResponse.json(
                { success: false, message: "Feedback message is required." },
                { status: 400 }
            );
        }

        // Make sure feedback belongs to user's workspace
        const feedback = await prisma.feedback.findFirst({
            where: {
                id,
                workspaceId: currentUser.workspaceId,
            },
        });

        if (!feedback) {
            return NextResponse.json(
                { success: false, message: "Feedback not found." },
                { status: 404 }
            );
        }

        const updatedFeedback = await prisma.feedback.update({
            where: {
                id,
            },
            data: {
                customer,
                message,
                source,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Feedback updated successfully.",
            feedback: updatedFeedback,
        });
    } catch (error) {
        console.error("Update feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update feedback.",
            },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                { status: 401 }
            );
        }

        // VIEWER cannot delete
        if (currentUser.role === "VIEWER") {
            return NextResponse.json(
                {
                    success: false,
                    message: "You don't have permission to delete feedback.",
                },
                { status: 403 }
            );
        }

        if (!currentUser.workspaceId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Workspace not found.",
                },
                { status: 400 }
            );
        }

        const { id } = await params;

        // Make sure the feedback belongs to the user's workspace
        const feedback = await prisma.feedback.findFirst({
            where: {
                id,
                workspaceId: currentUser.workspaceId,
            },
        });

        if (!feedback) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback not found.",
                },
                { status: 404 }
            );
        }

        await prisma.feedback.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Feedback deleted successfully.",
        });
    } catch (error) {
        console.error("Delete feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete feedback.",
            },
            { status: 500 }
        );
    }
}