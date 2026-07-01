import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SHORTCODE = process.env.MPESA_SHORTCODE ?? "174379";
const PASSKEY = process.env.MPESA_PASSKEY ?? "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET!;
const IS_PRODUCTION = process.env.MPESA_ENVIRONMENT === "production";
const MPESA_BASE = IS_PRODUCTION
  ? "https://api.safaricom.co.ke"
  : "https://sandbox.safaricom.co.ke";

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  const res = await fetch(`${MPESA_BASE}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("No access token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { checkoutRequestId, orderId, type } = await req.json();
    if (!checkoutRequestId) {
      return NextResponse.json({ error: "Missing checkoutRequestId" }, { status: 400 });
    }
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");
    const queryRes = await fetch(`${MPESA_BASE}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ BusinessShortCode: SHORTCODE, Password: password, Timestamp: timestamp, CheckoutRequestID: checkoutRequestId }),
    });
    const queryData = await queryRes.json();
    console.log("STK Query response:", JSON.stringify(queryData));
    const resultCode = queryData.ResultCode;
    if (resultCode === "0" || resultCode === 0) {
      if (type === "order" && orderId) {
        await prisma.order.updateMany({ where: { id: orderId }, data: { status: "paid" } });
      } else if (type === "booking" && orderId) {
        await prisma.booking.updateMany({ where: { id: orderId }, data: { status: "confirmed" } });
      }
      return NextResponse.json({ status: "paid", resultCode, queryData });
    }
    if (resultCode === "1032" || resultCode === 1032) {
      return NextResponse.json({ status: "cancelled", resultCode, queryData });
    }
    return NextResponse.json({ status: "pending", resultCode, queryData });
  } catch (error) {
    console.error("STK Query error:", error);
    return NextResponse.json({ error: "Query failed", details: String(error) }, { status: 500 });
  }
}