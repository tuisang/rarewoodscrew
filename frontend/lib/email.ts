import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.zoho.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

const FROM_EMAIL = process.env.SMTP_USER ?? "info@tuistech.co.ke";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "info@tuistech.co.ke";

async function sendEmail(to: string, subject: string, html: string) {
  try {
    console.log(`📧 Sending email to ${to} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} as ${process.env.SMTP_USER}`);
    const info = await transporter.sendMail({
  from: `"Rarewoods Crew" <${FROM_EMAIL}>`,
  replyTo: ADMIN_EMAIL,
  to,
  subject,
  html,
});
    console.log(`✅ Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Email send error:", error);
  }
}

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
  await sendEmail(clientEmail, "Booking Confirmed – Rarewoods Crew",
    bookingClientHtml({ clientName, service, date, paymentMethod, bookingId }));
  await sendEmail(ADMIN_EMAIL, `New Booking – ${clientName} (${service})`,
    bookingAdminHtml({ clientName, clientEmail, service, date, paymentMethod, bookingId }));
}

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
  await sendEmail(clientEmail, "Order Confirmed – Rarewoods Crew",
    orderClientHtml({ clientName, orderId, items, totalAmount, paymentMethod, mpesaReceiptNumber }));
  await sendEmail(ADMIN_EMAIL, `New Shop Order – ${clientName} (KSh ${totalAmount.toLocaleString()})`,
    orderAdminHtml({ clientName, clientEmail, orderId, items, totalAmount, paymentMethod, mpesaReceiptNumber }));
}

const baseStyle = `background:#fef8f1;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;`;
const headerHtml = (subtitle: string) => `
  <tr>
    <td style="background:#ffffff;border-top:3px solid #994700;padding:36px 40px;text-align:center;">
      <h1 style="margin:0;color:#994700;font-size:26px;">Rarewoods Crew</h1>
      <p style="margin:6px 0 0;color:#8c7263;font-size:11px;font-family:monospace;">CRAFTSMAN STUDIO &middot; NAIROBI</p>
      <p style="margin:12px 0 0;color:#ff7a00;font-size:11px;font-family:monospace;">${subtitle}</p>
    </td>
  </tr>`;

const footerHtml = `
  <tr>
    <td style="background:#ffffff;padding:24px 40px;border-top:1px solid rgba(224,192,175,0.3);">
      <p style="color:#8c7263;font-size:12px;margin:0 0 4px;">Rarewoods Crew &middot; Nairobi, Kenya</p>
      <p style="color:#e0c0af;font-size:11px;margin:0;">+254 726 461 196 &middot; info@tuistech.co.ke</p>
    </td>
  </tr>`;

const ctaButton = (href: string, label: string) => `
  <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
    <tr><td style="background:#994700;">
      <a href="${href}" style="display:block;padding:14px 28px;color:#ffffff;font-size:12px;font-weight:bold;text-decoration:none;font-family:monospace;">${label}</a>
    </td></tr>
  </table>`;

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(224,192,175,0.15);width:40%;">
      <p style="margin:0;color:#8c7263;font-size:10px;font-family:monospace;">${label}</p>
    </td>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(224,192,175,0.15);">
      <p style="margin:0;color:#1d1b17;font-size:13px;">${value}</p>
    </td>
  </tr>`;

const wrap = (body: string) => `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
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

function bookingClientHtml(d: { clientName: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("BOOKING CONFIRMED")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <h2 style="color:#1d1b17;font-size:22px;margin:0 0 16px;">Karibu, ${d.clientName}. Your consultation is secured.</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:24px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://rarewoodscrew.tuistech.co.ke"}/dashboard`, "VIEW MY DASHBOARD &rarr;")}
    </td></tr>`);
}

function bookingAdminHtml(d: { clientName: string; clientEmail: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("NEW BOOKING RECEIVED")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("CLIENT", d.clientName)}
        ${detailRow("EMAIL", d.clientEmail)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://rarewoodscrew.tuistech.co.ke"}/admin`, "OPEN ADMIN PANEL &rarr;")}
    </td></tr>`);
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactFormEmail(data: ContactFormData) {
  const { name, email, phone, message } = data;
  await sendEmail(ADMIN_EMAIL, `New Contact Form Message – ${name}`,
    contactAdminHtml({ name, email, phone, message }));
}

function contactAdminHtml(d: { name: string; email: string; phone?: string; message: string }) {
  return wrap(`
    ${headerHtml("NEW CONTACT MESSAGE")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("NAME", d.name)}
        ${detailRow("EMAIL", d.email)}
        ${detailRow("PHONE", d.phone || "Not provided")}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        <tr><td style="padding:16px 20px;color:#1d1b17;white-space:pre-wrap;">${d.message}</td></tr>
      </table>
      ${ctaButton(`mailto:${d.email}`, "REPLY TO " + d.name.toUpperCase())}
    </td></tr>`);
}

function orderClientHtml(d: { clientName: string; orderId: string; items: OrderItem[]; totalAmount: number; paymentMethod: string; mpesaReceiptNumber?: string | null }) {
  const itemRows = d.items.map(i => `
    <tr>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(224,192,175,0.15);color:#1d1b17;">${i.name}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(224,192,175,0.15);color:#8c7263;text-align:center;">${i.quantity}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(224,192,175,0.15);color:#994700;text-align:right;">KSh ${(i.price * i.quantity).toLocaleString()}</td>
    </tr>`).join("");
  return wrap(`
    ${headerHtml("ORDER CONFIRMED")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <h2 style="color:#1d1b17;font-size:22px;margin:0 0 16px;">Asante, ${d.clientName}. Your order has been placed.</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("ORDER ID", d.orderId.slice(-8).toUpperCase())}
        ${detailRow("PAYMENT", d.paymentMethod)}
        ${d.mpesaReceiptNumber ? detailRow("M-PESA RECEIPT", d.mpesaReceiptNumber) : ""}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${itemRows}
        <tr><td colspan="2" style="padding:14px 20px;color:#994700;font-size:16px;font-weight:bold;text-align:right;">KSh ${d.totalAmount.toLocaleString()}</td></tr>
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://rarewoodscrew.tuistech.co.ke"}/dashboard`, "VIEW MY DASHBOARD &rarr;")}
    </td></tr>`);
}

function orderAdminHtml(d: { clientName: string; clientEmail: string; orderId: string; items: OrderItem[]; totalAmount: number; paymentMethod: string; mpesaReceiptNumber?: string | null }) {
  const itemRows = d.items.map(i => `
    <tr>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(224,192,175,0.15);color:#1d1b17;">${i.name} x${i.quantity}</td>
      <td style="padding:10px 20px;border-bottom:1px solid rgba(224,192,175,0.15);color:#994700;text-align:right;">KSh ${(i.price * i.quantity).toLocaleString()}</td>
    </tr>`).join("");
  return wrap(`
    ${headerHtml("NEW SHOP ORDER")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("ORDER ID", d.orderId.slice(-8).toUpperCase())}
        ${detailRow("CLIENT", d.clientName)}
        ${detailRow("EMAIL", d.clientEmail)}
        ${detailRow("PAYMENT", d.paymentMethod)}
        ${detailRow("TOTAL", "KSh " + d.totalAmount.toLocaleString())}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${itemRows}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://rarewoodscrew.tuistech.co.ke"}/admin`, "OPEN ADMIN PANEL &rarr;")}
    </td></tr>`);
}