import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, address, items, totalAmount, paymentMethod, clerkUserId } = body;

    if (!name || !email || !phone || !items || !totalAmount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        name,
        email,
        phone,
        address: address ?? null,
        items,
        totalAmount,
        paymentMethod,
        clerkUserId: clerkUserId ?? null,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order." }, { status: 500 });
  }
}