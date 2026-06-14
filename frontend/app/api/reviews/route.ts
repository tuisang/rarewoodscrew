import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// GET - public, returns approved reviews only
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json({ reviews: [] });
  }
}

// POST - requires auth to submit a review
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { authorName, authorEmail, rating, title, body: reviewBody, service } = body;

    if (!authorName || !rating || !title || !reviewBody) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        clerkUserId: userId ?? null,
        authorName,
        authorEmail: authorEmail ?? null,
        rating,
        title,
        body: reviewBody,
        service: service ?? null,
        approved: false,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}
