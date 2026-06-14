import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reviews });
}

export async function PATCH(req: NextRequest) {
  const { id, approved } = await req.json();
  const review = await prisma.review.update({
    where: { id },
    data: { approved },
  });
  return NextResponse.json({ review });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
