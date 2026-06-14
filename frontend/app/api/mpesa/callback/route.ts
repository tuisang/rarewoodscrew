import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Body } = body;

    const resultCode = Body?.stkCallback?.ResultCode;
    const checkoutRequestId = Body?.stkCallback?.CheckoutRequestID;
    const metadata = Body?.stkCallback?.CallbackMetadata?.Item ?? [];

    if (!checkoutRequestId) {
      return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
    }

    if (resultCode === 0) {
      const mpesaReceiptNumber = metadata.find(
        (i: { Name: string }) => i.Name === "MpesaReceiptNumber"
      )?.Value;
      const amount = metadata.find(
        (i: { Name: string }) => i.Name === "Amount"
      )?.Value;

      await prisma.booking.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: {
          status: "confirmed",
          mpesaReceiptNumber: mpesaReceiptNumber ?? null,
          paidAmount: amount ? String(amount) : null,
        },
      });
      console.log(`✅ Booking payment confirmed: ${mpesaReceiptNumber}`);
    } else {
      await prisma.booking.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: { status: "pending" },
      });
      console.log(`❌ Booking payment failed. ResultCode: ${resultCode}`);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
