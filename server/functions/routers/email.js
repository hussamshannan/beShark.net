const express = require("express");
const nodemailer = require("nodemailer");
const EmailSchema = require("../models/email");
const authenticateToken = require("../auth/auth");

const router = express.Router();

// Helper: Check if email credentials are configured
const isEmailConfigured = () => {
  return process.env.EMAIL && process.env.APP_PASSWORD;
};

// Helper: Create transporter with timeout
const createTransporter = () => {
  if (!isEmailConfigured()) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000,
  });
};

// Helper: Send email with timeout wrapper
const sendEmailWithTimeout = (transporter, mailOptions, timeoutMs = 15000) => {
  return Promise.race([
    transporter.sendMail(mailOptions),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email timeout")), timeoutMs)
    ),
  ]);
};

router.post("/send", async (req, res) => {
  const { name, email, phone } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "جميع الحقول مطلوبة" });
  }

  // Always save to database first (most important)
  try {
    const schema = new EmailSchema({ name, email, phone });
    await schema.save();
    console.log("Contact saved to database:", email);
  } catch (dbError) {
    console.error("Database save failed:", dbError);
    return res.status(500).json({ error: "فشل في حفظ البيانات" });
  }

  // Check if email is configured
  const transporter = createTransporter();
  if (!transporter) {
    console.log("Email not configured, skipping email notifications");
    return res.status(200).json({
      message: "تم استلام طلبك بنجاح وسنتواصل معك قريباً",
      emailSent: false
    });
  }

  // Email options
  const adminMailOptions = {
    from: `"shark-plan" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: `طلب تواصل من  ${name}`,
    html: `
      <div dir="rtl" style="text-align: right; font-family: system-ui, Arial, sans-serif; font-size: 16px;">
        <p>لديك طلب تواصل جديد:</p>
        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>رقم الهاتف:</strong> ${phone}+</p>
      </div>
    `,
  };

  const clientMailOptions = {
    from: `"shark-plan" <${process.env.EMAIL}>`,
    to: email,
    subject: "تم استلام طلبك بنجاح -  شارك للاستشارات",
    html: `
      <div dir="rtl" style="text-align: right; font-family: system-ui, Arial, sans-serif; font-size: 16px;">
        <p>عزيزي <strong>${name}</strong>،</p>
        <p>شكرًا لتواصلك معنا من خلال <strong>منصة www.shark-plan.com</strong>.</p>
        <p>تم استلام طلبك بنجاح وسنقوم بالتواصل معك في أقرب وقت ممكن.</p>
        <p>إذا كان لديك أي استفسارات، لا تتردد في الرد على هذا البريد.</p>
        <br />
        <p>مع التحية،</p>
        <p><strong>شارك للاستشارات</strong></p>
      </div>
    `,
  };

  // Try to send emails (don't fail the request if emails fail)
  let emailsSent = false;
  try {
    await sendEmailWithTimeout(transporter, adminMailOptions);
    console.log("Admin email sent");

    await sendEmailWithTimeout(transporter, clientMailOptions);
    console.log("Client confirmation sent");

    emailsSent = true;
  } catch (emailError) {
    console.error("Email sending failed:", emailError.message);
    // Don't return error - data is already saved
  }

  res.status(200).json({
    message: "تم استلام طلبك بنجاح وسنتواصل معك قريباً",
    emailSent: emailsSent
  });
});
router.get("/get", authenticateToken, async (req, res) => {
  try {
    const emails = await EmailSchema.find({}, "name email phone note");
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ ➤ UPDATE NOTE BY ID
router.post("/note/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const updated = await EmailSchema.findByIdAndUpdate(
      id,
      { note },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Note saved", email: updated });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
});

// ✅ ➤ DELETE EMAIL BY ID
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await EmailSchema.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Failed to delete email" });
  }
});

module.exports = router;
