import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, phone, email, service, date, paymentMethod } = body;

    if (!name || !phone || !email || !service || !date || !paymentMethod) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        service,
        date,
        paymentMethod,
        clerkUserId: userId ?? null,
        status: "pending",
      },
    });

    // Send confirmation emails
    try {
      await sendBookingConfirmationEmail({
        clientName: name,
        clientEmail: email,
        service,
        date,
        paymentMethod,
        bookingId: booking.id,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    const bookings = await prisma.booking.findMany({
      where: userId ? { clerkUserId: userId } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json({ bookings: [] });
  }
}
