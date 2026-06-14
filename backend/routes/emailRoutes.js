// routes/emailRoutes.js
// Express routes wired to Nodemailer cPanel SMTP email service
// Mount in your main app.js with: app.use('/api/email', emailRoutes)

import express from "express";
import {
  sendQuoteConfirmation,
  sendOrderConfirmation,
  sendContactNotification,
} from "../services/emailService.js";

const router = express.Router();

// ─── POST /api/email/quote ────────────────────────────────────────────────────
// Called after a quote is saved to DB. Send confirmation to customer + admin.
router.post("/quote", async (req, res) => {
  const { customerName, customerEmail, projectDetails, quoteId } = req.body;

  if (!customerName || !customerEmail || !projectDetails || !quoteId) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await sendQuoteConfirmation({ customerName, customerEmail, projectDetails, quoteId });
    res.json({ success: true, message: "Quote confirmation emails sent." });
  } catch (error) {
    console.error("Quote email error:", error.message);
    res.status(500).json({ error: "Failed to send quote confirmation." });
  }
});

// ─── POST /api/email/order ────────────────────────────────────────────────────
// Called from your M-Pesa STK Push callback after payment confirmation.
router.post("/order", async (req, res) => {
  const { customerName, customerEmail, orderId, items, total, mpesaCode } = req.body;

  if (!customerName || !customerEmail || !orderId || !items || !total || !mpesaCode) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    await sendOrderConfirmation({ customerName, customerEmail, orderId, items, total, mpesaCode });
    res.json({ success: true, message: "Order confirmation emails sent." });
  } catch (error) {
    console.error("Order email error:", error.message);
    res.status(500).json({ error: "Failed to send order confirmation." });
  }
});

// ─── POST /api/email/contact ──────────────────────────────────────────────────
// Called from the contact form on the frontend.
router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    await sendContactNotification({ name, email, phone, message });
    res.json({ success: true, message: "Message received. Auto-reply sent." });
  } catch (error) {
    console.error("Contact email error:", error.message);
    res.status(500).json({ error: "Failed to send contact notification." });
  }
});

export default router;