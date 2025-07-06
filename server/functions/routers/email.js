const express = require("express");
const nodemailer = require("nodemailer");
const EmailSchema = require("../model/email"); // adjust path as needed

const router = express.Router();

router.post("/send", async (req, res) => {
  const { name, email, phone, request } = req.body;

  // Setup mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  // Email to admin
  const adminMailOptions = {
    from: `"jadwa-study" <${process.env.EMAIL}>`,
    to: process.env.EMAIL,
    subject: `${request} ${name}`,
    html: `
      <div dir="rtl" style="text-align: right; font-family: Arial, sans-serif; font-size: 16px;">
        <p>لديك طلب تواصل جديد:</p>
        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>رقم الهاتف:</strong> +${phone}</p>
      </div>
    `,
  };

  // Confirmation email to client
  const clientMailOptions = {
    from: `"jadwa-study" <${process.env.EMAIL}>`,
    to: email,
    subject: "تم استلام طلبك بنجاح - جدوى للدراسة",
    html: `
      <div dir="rtl" style="text-align: right; font-family: Arial, sans-serif; font-size: 16px;">
        <p>عزيزي <strong>${name}</strong>،</p>
        <p>شكرًا لتواصلك معنا في <strong>منصة جدوى للدراسة</strong>.</p>
        <p>تم استلام طلبك بنجاح وسنقوم بالتواصل معك في أقرب وقت ممكن.</p>
        <p>إذا كان لديك أي استفسارات، لا تتردد في الرد على هذا البريد.</p>
        <br />
        <p>مع التحية،</p>
        <p><strong>فريق جدوى للدراسة</strong></p>
      </div>
    `,
  };

  try {
    await EmailSchema.create({ name, email, phone });

    // Send admin email
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log("Admin email sent:", adminInfo.messageId);

    // Send client confirmation email
    const clientInfo = await transporter.sendMail(clientMailOptions);
    console.log("Client confirmation sent:", clientInfo.messageId);

    res.status(200).json({ message: "تم إرسال البريد وتخزين البيانات بنجاح" });
  } catch (error) {
    console.error("Sending or saving failed:", error);
    res.status(500).json({ error: "فشل في إرسال البريد أو حفظ البيانات" });
  }
});

module.exports = router;
