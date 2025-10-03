import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error: "Database not configured",
          details:
            "Please add DATABASE_URL to your environment variables in Project Settings",
        },
        { status: 500 },
      );
    }

    const { prisma } = await import("@/lib/prisma");

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (password !== user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { message: "Login successful", userId: user.id, email: user.email },
      { status: 200 },
    );
  } catch (error) {
    console.error("[v0] Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
