import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function GET() {
    return NextResponse.json({
        message: "GET API is working 🚀",
    });
}

export async function POST(request: Request) {

    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {

        return NextResponse.json(
            {
                success: false,
                message: "All fields are required."
            },
            {
                status: 400
            }
        );

    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return NextResponse.json(
            {
                success: false,
                message: "Email already exists.",
            },
            {
                status: 409,
            }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const workspace = await prisma.workspace.create({
        data: {
            name: `${name}'s Workspace`,
            description: "Default workspace",
        },
    });

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            workspaceId: workspace.id,
        },
    });

    return NextResponse.json({
        success: true,
        message: "User registered successfully!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        workspace: {
            id: workspace.id,
            name: workspace.name,
        },
    });

}