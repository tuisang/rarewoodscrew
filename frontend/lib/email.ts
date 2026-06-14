const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "alex2000rui@gmail.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Booking Confirmation ──────────────────────────────────────────

interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  service: string;
  date: string;
  paymentMethod: string;
  bookingId: string;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const { clientName, clientEmail, service, date, paymentMethod, bookingId } = data;

  await sendEmail(clientEmail, "Booking Confirmed — Forge & Timber Atelier",
    bookingClientHtml({ clientName, service, date, paymentMethod, bookingId }));

  await sendEmail(ADMIN_EMAIL, `New Booking — ${clientName} (${service})`,
    bookingAdminHtml({ clientName, clientEmail, service, date, paymentMethod, bookingId }));
}

// ─── Order Confirmation ────────────────────────────────────────────

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  clientName: string;
  clientEmail: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  mpesaReceiptNumber?: string | null;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const { clientName, clientEmail, orderId, items, totalAmount, paymentMethod, mpesaReceiptNumber } = data;

  await sendEmail(clientEmail, "Order Confirmed — Forge & Timber Atelier",
    orderClientHtml({ clientName, orderId, items, totalAmount, paymentMethod, mpesaReceiptNumber }));

  await sendEmail(ADMIN_EMAIL, `New Shop Order — ${clientName} (KSh ${totalAmount.toLocaleString()})`,
    orderAdminHtml({ clientName, clientEmail, orderId, items, totalAmount, paymentMethod, mpesaReceiptNumber }));
}

// ─── Send Helper ───────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: `Forge & Timber Atelier <${FROM_EMAIL}>`, to: [to], subject, html }),
    });
    return await res.json();
  } catch (error) {
    console.error("Email send error:", error);
  }
}

// ─── Templates ────────────────────────────────────────────────────

const baseStyle = `background:#131313;font-family:Georgia,serif;margin:0;padding:0;`;
const headerHtml = (subtitle: string) => `
  <tr>
    <td style="background:#0e0e0e;border-top:3px solid #e8bf9b;padding:36px 40px;text-align:center;">
      <h1 style="margin:0;color:#e8bf9b;font-size:26px;letter-spacing:-0.02em;">Forge &amp; Timber</h1>
      <p style="margin:6px 0 0;color:#9c8e84;font-size:11px;letter-spacing:0.15em;font-family:monospace;">ATELIER &middot; NAIROBI</p>
      <p style="margin:12px 0 0;color:#ffb785;font-size:11px;letter-spacing:0.15em;font-family:monospace;">${subtitle}</p>
    </td>
  </tr>`;

const footerHtml = `
  <tr>
    <td style="background:#0e0e0e;padding:24px 40px;border-top:1px solid rgba(79,69,61,0.3);">
      <p style="color:#9c8e84;font-size:12px;margin:0 0 4px;">Forge &amp; Timber Atelier &middot; Nairobi, Kenya</p>
      <p style="color:#4f453d;font-size:11px;margin:0;">+254 726 461 196 &middot; alex2000rui@gmail.com</p>
    </td>
  </tr>`;

const ctaButton = (href: string, label: string) => `
  <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
    <tr><td style="background:#e8bf9b;">
      <a href="${href}" style="display:block;padding:14px 28px;color:#442b12;font-size:12px;font-weight:bold;text-decoration:none;letter-spacing:0.1em;font-family:monospace;">${label}</a>
    </td></tr>
  </table>`;

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(79,69,61,0.15);width:40%;">
      <p style="margin:0;color:#9c8e84;font-size:10px;letter-spacing:0.12em;font-family:monospace;">${label}</p>
    </td>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(79,69,61,0.15);">
      <p style="margin:0;color:#e5e2e1;font-size:13px;">${value}</p>
    </td>
  </tr>`;

const wrap = (body: string) => `
<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="${baseStyle}">
  <table width="100%" cellpadding="0" cellspacing="0" style="${baseStyle}padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${body}
        ${footerHtml}
      </table>
    </td></tr>
  </table>
</body></html>`;

// Booking - Client
function bookingClientHtml(d: { clientName: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("BOOKING CONFIRMED")}
    <tr><td style="background:#1c1b1b;padding:36px 40px;">
      <h2 style="color:#e5e2e1;font-size:22px;margin:0 0 16px;">Karibu, ${d.clientName}. Your consultation is secured.</h2>
      <p style="color:#d3c4b9;font-size:14px;line-height:1.7;margin:0 0 24px;">Our master artisans are looking forward to meeting you. Here are your booking details:</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:24px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      <p style="color:#d3c4b9;font-size:14px;line-height:1.7;margin:0;">We will reach out within 24 hours to confirm the exact time and location of your consultation.</p>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard`, "VIEW MY DASHBOARD &rarr;")}
    </td></tr>`);
}

// Booking - Admin
function bookingAdminHtml(d: { clientName: string; clientEmail: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("NEW BOOKING RECEIVED")}
    <tr><td style="background:#1c1b1b;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:20px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("CLIENT", d.clientName)}
        ${detailRow("EMAIL", d.clientEmail)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/admin`, "OPEN ADMIN PANEL &rarr;")}
    </td></tr>`);
}

// Order - Client
function orderClientHtml(d: { clientName: string; orderId: string; items: OrderItem[]; totalAmount: number; paymentMethod: string; mpesaReceiptNumber?: string | null }) {
  const itemRows = d.items.map(i => `
    <tr>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(79,69,61,0.15);color:#e5e2e1;font-size:13px;">${i.name}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(79,69,61,0.15);color:#9c8e84;font-size:13px;text-align:center;">${i.quantity}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(79,69,61,0.15);color:#e8bf9b;font-size:13px;text-align:right;font-weight:bold;">KSh ${(i.price * i.quantity).toLocaleString()}</td>
    </tr>`).join("");

  return wrap(`
    ${headerHtml("ORDER CONFIRMED")}
    <tr><td style="background:#1c1b1b;padding:36px 40px;">
      <h2 style="color:#e5e2e1;font-size:22px;margin:0 0 16px;">Asante, ${d.clientName}. Your order has been placed.</h2>
      <p style="color:#d3c4b9;font-size:14px;line-height:1.7;margin:0 0 24px;">Thank you for shopping at the Forge &amp; Timber Tool Atelier. Your order is being processed and we will arrange delivery shortly.</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:20px;">
        ${detailRow("ORDER ID", d.orderId.slice(-8).toUpperCase())}
        ${detailRow("PAYMENT", d.paymentMethod)}
        ${d.mpesaReceiptNumber ? detailRow("M-PESA RECEIPT", d.mpesaReceiptNumber) : ""}
      </table>

      <p style="color:#9c8e84;font-size:10px;letter-spacing:0.12em;font-family:monospace;margin:0 0 8px;">ITEMS ORDERED</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:20px;">
        <tr style="background:#0e0e0e;">
          <td style="padding:10px 20px;color:#9c8e84;font-size:10px;font-family:monospace;">ITEM</td>
          <td style="padding:10px 20px;color:#9c8e84;font-size:10px;font-family:monospace;text-align:center;">QTY</td>
          <td style="padding:10px 20px;color:#9c8e84;font-size:10px;font-family:monospace;text-align:right;">AMOUNT</td>
        </tr>
        ${itemRows}
        <tr style="background:#0e0e0e;">
          <td colspan="2" style="padding:14px 20px;color:#e5e2e1;font-size:14px;font-weight:bold;">Total</td>
          <td style="padding:14px 20px;color:#e8bf9b;font-size:16px;font-weight:bold;text-align:right;">KSh ${d.totalAmount.toLocaleString()}</td>
        </tr>
      </table>

      <p style="color:#d3c4b9;font-size:14px;line-height:1.7;margin:0;">Questions? Call us on <strong style="color:#e8bf9b;">+254 726 461 196</strong> or email <strong style="color:#e8bf9b;">alex2000rui@gmail.com</strong></p>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard`, "VIEW MY DASHBOARD &rarr;")}
    </td></tr>`);
}

// Order - Admin
function orderAdminHtml(d: { clientName: string; clientEmail: string; orderId: string; items: OrderItem[]; totalAmount: number; paymentMethod: string; mpesaReceiptNumber?: string | null }) {
  const itemRows = d.items.map(i => `
    <tr>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(79,69,61,0.15);color:#e5e2e1;font-size:13px;">${i.name} x${i.quantity}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(79,69,61,0.15);color:#e8bf9b;font-size:13px;text-align:right;font-weight:bold;">KSh ${(i.price * i.quantity).toLocaleString()}</td>
    </tr>`).join("");

  return wrap(`
    ${headerHtml("NEW SHOP ORDER")}
    <tr><td style="background:#1c1b1b;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:20px;">
        ${detailRow("ORDER ID", d.orderId.slice(-8).toUpperCase())}
        ${detailRow("CLIENT", d.clientName)}
        ${detailRow("EMAIL", d.clientEmail)}
        ${detailRow("PAYMENT", d.paymentMethod)}
        ${d.mpesaReceiptNumber ? detailRow("M-PESA RECEIPT", d.mpesaReceiptNumber) : ""}
        ${detailRow("TOTAL", "KSh " + d.totalAmount.toLocaleString())}
      </table>
      <p style="color:#9c8e84;font-size:10px;letter-spacing:0.12em;font-family:monospace;margin:0 0 8px;">ITEMS</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;border:1px solid #4f453d;margin-bottom:20px;">
        ${itemRows}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/admin`, "OPEN ADMIN PANEL &rarr;")}
    </td></tr>`);
}
