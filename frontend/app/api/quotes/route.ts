import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ADMIN_USER_ID = "user_3ERVagEbBBtQoneJM1iKtwcw17C";

async function isAdmin() {
  const { userId } = await auth();
  return userId === ADMIN_USER_ID;
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ quotes });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status, adminNotes } = await req.json();
  const quote = await prisma.quote.update({
    where: { id },
    data: { ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) },
  });
  return NextResponse.json({ quote });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, phone, service,
      woodSpecies, metalFinish, dimensions,
      budget, timeline, description, attachmentUrl,
    } = body;

    if (!name || !email || !phone || !service || !budget || !timeline || !description) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const quote = await prisma.quote.create({
      data: {
        name, email, phone, service,
        woodSpecies: woodSpecies ?? null,
        metalFinish: metalFinish ?? null,
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
