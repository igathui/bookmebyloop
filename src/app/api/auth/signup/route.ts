import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("[v0] Signup API route called");

    if (!process.env.DATABASE_URL) {
      console.error("[v0] DATABASE_URL is not configured");
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

    const body = await request.json();
    console.log("[v0] Request body received:", {
      ...body,
      password: "[REDACTED]",
      confirmPassword: "[REDACTED]",
    });

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber,
    } = body;

    if (!email || !password) {
      console.log("[v0] Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      console.log("[v0] Passwords do not match");
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );
    }

    console.log("[v0] Checking for existing user");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("[v0] User already exists");
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    console.log("[v0] Creating user in database");
    const user = await prisma.user.create({
      data: {
        email,
        password, // Storing plain text password
        firstName: firstName || null,
        lastName: lastName || null,
        phoneNumber: phoneNumber || null,
      },
    });

    console.log("[v0] User created successfully with ID:", user.id);
    return NextResponse.json(
      { message: "User created successfully", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("[v0] Signup error:", error);
    console.error(
      "[v0] Error message:",
      error instanceof Error ? error.message : "Unknown error",
    );
    console.error(
      "[v0] Error stack:",
      error instanceof Error ? error.stack : "No stack trace",
    );
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
