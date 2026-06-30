import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SHORTCODE = process.env.MPESA_SHORTCODE ?? "174379";
const PASSKEY = process.env.MPESA_PASSKEY ?? "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const CALLBACK_URL = process.env.MPESA_SHOP_CALLBACK_URL
  ?? process.env.MPESA_CALLBACK_URL?.replace("/api/mpesa/callback", "/api/mpesa/shop-callback")
  ?? "https://rarewoodscrew.tuistech.co.ke/api/mpesa/shop-callback";
const IS_PRODUCTION = process.env.MPESA_ENVIRONMENT === "production";
const MPESA_BASE = IS_PRODUCTION
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(`${MPESA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!data.access_token) throw new Error(`No access token: ${text}`);
    return data.access_token;
  } catch {
    throw new Error(`Token parse failed: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phone, orderId, amount } = await req.json();

    if (!phone || !orderId || !amount) {
      return NextResponse.json({ error: "Phone, orderId and amount are required." }, { status: 400 });
    }

    const formattedPhone = phone.replace(/^0/, "254").replace(/^\+/, "").replace(/\s/g, "");
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");
    const payableAmount = IS_PRODUCTION ? amount : 1;

    const stkRes = await fetch(`${MPESA_BASE}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: payableAmount,
        PartyA: formattedPhone,
        PartyB: SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: CALLBACK_URL,
        AccountReference: "BlackSteelShop",
        TransactionDesc: "Shop Order",
      }),
    });

    const stkText = await stkRes.text();
    let stkData;
    try {
      stkData = JSON.parse(stkText);
    } catch {
      console.error("STK response not JSON:", stkText);
      return NextResponse.json({ error: "Invalid response from M-Pesa.", raw: stkText }, { status: 502 });
    }

    if (stkData.ResponseCode !== "0") {
      return NextResponse.json(
        { error: stkData.ResponseDescription ?? "STK push failed.", mpesaResponse: stkData },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: "awaiting_payment", mpesaCheckoutId: stkData.CheckoutRequestID },
    });

    return NextResponse.json({
      success: true,
      checkoutRequestId: stkData.CheckoutRequestID,
      message: "STK push sent. Check your phone.",
    });
  } catch (error) {
    console.error("Shop STK push error:", error);
    return NextResponse.json({
      error: "Failed to initiate payment.",
      details: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}