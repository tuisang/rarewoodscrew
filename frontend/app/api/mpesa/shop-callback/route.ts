import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

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

      // Update order status
      await prisma.order.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: {
          status: "paid",
          mpesaReceiptNumber: mpesaReceiptNumber ?? null,
        },
      });

      // Fetch order details for email
      const orders = await prisma.order.findMany({
        where: { mpesaCheckoutId: checkoutRequestId },
      });

      if (orders.length > 0) {
        const order = orders[0];
        try {
          await sendOrderConfirmationEmail({
            clientName: order.name,
            clientEmail: order.email,
            orderId: order.id,
            items: order.items as { name: string; quantity: number; price: number }[],
            totalAmount: order.totalAmount,
            paymentMethod: "M-Pesa",
            mpesaReceiptNumber: mpesaReceiptNumber ?? null,
          });
          console.log(`✅ Order confirmation email sent to ${order.email}`);
        } catch (emailError) {
          console.error("Email error:", emailError);
        }
      }

      console.log(`✅ Shop payment confirmed: ${mpesaReceiptNumber} — KSh ${amount}`);
    } else {
      await prisma.order.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: { status: "pending" },
      });
      console.log(`❌ Shop payment failed. ResultCode: ${resultCode}`);
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("Shop M-Pesa callback error:", error);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
