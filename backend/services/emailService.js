// services/emailService.js
// Nodemailer email service using Safaricom Cloud cPanel SMTP
// Compatible with tuistech.co.ke hosted on Safaricom Cloud

import nodemailer from "nodemailer";

// ─── Transporter Config ──────────────────────────────────────────────────────
// These values come from your cPanel credentials.
// Add them to your .env file — never hardcode them.

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // e.g. mail.tuistech.co.ke
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,                       // true for port 465 (SSL), false for 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,     // e.g. info@tuistech.co.ke
    pass: process.env.SMTP_PASS,     // your cPanel email account password
  },
});

// ─── Verify Connection on Startup ────────────────────────────────────────────
export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email service connected via cPanel SMTP");
  } catch (error) {
    console.error("❌ Email service connection failed:", error.message);
  }
};

// ─── Generic Send Function ───────────────────────────────────────────────────
/**
 * Send an email
 * @param {Object} options
 * @param {string|string[]} options.to       - Recipient(s)
 * @param {string} options.subject           - Email subject
 * @param {string} [options.text]            - Plain text body
 * @param {string} [options.html]            - HTML body (preferred)
 * @param {string} [options.replyTo]         - Reply-to address
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  const mailOptions = {
    from: `"Forge & Timber Atelier" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent: ${info.messageId}`);
  return info;
};

// ─── Pre-built Email Templates ───────────────────────────────────────────────

/**
 * Send a quote request confirmation to the customer
 * and a notification to the business owner.
 */
export const sendQuoteConfirmation = async ({
  customerName,
  customerEmail,
  projectDetails,
  quoteId,
}) => {
  // 1. Email to customer
  await sendEmail({
    to: customerEmail,
    subject: `We've received your quote request – Forge & Timber Atelier`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #2c2c2c;">
        <h2 style="color: #7c5c3a;">Thank you, ${customerName}</h2>
        <p>We've received your quote request and will get back to you within <strong>1–2 business days</strong>.</p>
        <p><strong>Reference:</strong> #${quoteId}</p>
        <hr style="border: 1px solid #e5e5e5;" />
        <h3>Your Project Details</h3>
        <p style="white-space: pre-line;">${projectDetails}</p>
        <hr style="border: 1px solid #e5e5e5;" />
        <p>Questions? Reply to this email or call us at <strong>+254726461196</strong>.</p>
        <p style="color: #7c5c3a; font-weight: bold;">Forge & Timber Atelier</p>
        <p style="font-size: 12px; color: #999;">Embakasi, Nairobi · tuistech.co.ke</p>
      </div>
    `,
  });

  // 2. Notification to business owner
  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Quote Request #${quoteId} from ${customerName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Quote ID:</strong> #${quoteId}</p>
        <h3>Project Details</h3>
        <p style="white-space: pre-line;">${projectDetails}</p>
      </div>
    `,
    replyTo: customerEmail,
  });
};

/**
 * Send an order confirmation after successful M-Pesa payment.
 */
export const sendOrderConfirmation = async ({
  customerName,
  customerEmail,
  orderId,
  items,
  total,
  mpesaCode,
}) => {
  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">KES ${item.price.toLocaleString()}</td>
      </tr>
    `
    )
    .join("");

  await sendEmail({
    to: customerEmail,
    subject: `Order Confirmed #${orderId} – Forge & Timber Atelier`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #2c2c2c;">
        <h2 style="color: #7c5c3a;">Order Confirmed!</h2>
        <p>Hi ${customerName}, your payment was received successfully.</p>
        <p><strong>M-Pesa Code:</strong> ${mpesaCode}</p>
        <p><strong>Order ID:</strong> #${orderId}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <thead>
            <tr style="background: #f5f0eb;">
              <th style="padding: 8px; text-align: left;">Item</th>
              <th style="padding: 8px; text-align: center;">Qty</th>
              <th style="padding: 8px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 8px; font-weight: bold;">Total</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">KES ${total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
        <p>We'll contact you shortly to arrange delivery or pickup.</p>
        <p style="color: #7c5c3a; font-weight: bold;">Forge & Timber Atelier</p>
        <p style="font-size: 12px; color: #999;">Embakasi, Nairobi · tuistech.co.ke · +254726461196</p>
      </div>
    `,
  });

  // Notify admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Order #${orderId} – KES ${total.toLocaleString()} received`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Order ID:</strong> #${orderId}</p>
        <p><strong>M-Pesa Code:</strong> ${mpesaCode}</p>
        <p><strong>Total:</strong> KES ${total.toLocaleString()}</p>
      </div>
    `,
    replyTo: customerEmail,
  });
};

/**
 * Send a contact/enquiry notification.
 */
export const sendContactNotification = async ({
  name,
  email,
  phone,
  message,
}) => {
  await sendEmail({
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Message from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <h3>Message</h3>
        <p style="white-space: pre-line;">${message}</p>
      </div>
    `,
    replyTo: email,
  });

  // Auto-reply to sender
  await sendEmail({
    to: email,
    subject: `We got your message – Forge & Timber Atelier`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; color: #2c2c2c;">
        <h2 style="color: #7c5c3a;">Thanks for reaching out, ${name}!</h2>
        <p>We've received your message and will respond within <strong>24 hours</strong>.</p>
        <p>In the meantime, you can reach us directly at <strong>+254726461196</strong>.</p>
        <p style="color: #7c5c3a; font-weight: bold;">Forge & Timber Atelier</p>
        <p style="font-size: 12px; color: #999;">Embakasi, Nairobi · tuistech.co.ke</p>
      </div>
    `,
  });
};