import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, phone, email, service,
      date, paymentMethod, clerkUserId,
      attachmentUrl,
    } = body;

    if (!name || !phone || !email || !service || !date || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        name, phone, email, service,
        date, paymentMethod,
        clerkUserId: clerkUserId ?? null,
        attachmentUrl: attachmentUrl ?? null,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings." }, { status: 500 });
  }
}
