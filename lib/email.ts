// lib/email.ts
import nodemailer from "nodemailer"


export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: 'softwaredeveloper@wdwltd.com',
        pass: 'ntncafaxqcaysdap',
      },
    });

    await transporter.sendMail({
      from: `"Tae tae Foundation" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })

    console.log(`📨 Email sent to ${to}`)
  } catch (error) {
    console.error("❌ Error sending email:", error)
    throw error
  }
}
