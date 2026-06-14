import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json({ order });
}
