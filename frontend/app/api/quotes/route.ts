import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, service,
      woodSpecies, finish, metalFinish, dimensions,
      budget, timeline, description, attachmentUrl,
    } = body;

    if (!name || !email || !phone || !service || !budget || !timeline || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        name, email, phone, service,
        woodSpecies: woodSpecies ?? null,
        metalFinish: finish ?? metalFinish ?? null,
        dimensions: dimensions ?? null,
        budget, timeline, description,
        attachmentUrl: attachmentUrl ?? null,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, quote });
  } catch (error) {
    console.error("Quote creation error:", error);
    return NextResponse.json({ error: "Failed to submit quote." }, { status: 500 });
  }
}
