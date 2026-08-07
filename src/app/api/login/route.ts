import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            {
                success: false,
                message: "Email and password are required.",
            },
            {
                status: 400,
            }
        );
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid email or password.",
            },
            {
                status: 401,
            }
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid email or password.",
            },
            {
                status: 401,
            }
        );
    }

    return NextResponse.json({
        success: true,
        message: "Login successful!",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            workspaceId: user.workspaceId,
        },
    });

}