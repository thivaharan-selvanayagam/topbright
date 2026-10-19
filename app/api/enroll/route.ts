import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, grade, medium, mode, place } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Student name and WhatsApp contact number are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #0d0114; color: #ffffff; padding: 32px; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #8a00c2;">
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px;">
          <span style="color: #f0822b; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">New Admission Application</span>
          <h2 style="margin: 8px 0 0 0; color: #ffffff; font-size: 24px;">TopBright ICT Academy</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 10px 0; color: #94a3b8; width: 40%;">Student Name:</td>
            <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 10px 0; color: #94a3b8;">Grade:</td>
            <td style="padding: 10px 0; color: #d880ff; font-weight: bold;">${grade}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 10px 0; color: #94a3b8;">Medium:</td>
            <td style="padding: 10px 0; color: #ffffff;">${medium}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 10px 0; color: #94a3b8;">Preferred Mode:</td>
            <td style="padding: 10px 0; color: #f0822b; font-weight: bold;">${mode}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 10px 0; color: #94a3b8;">Town / School:</td>
            <td style="padding: 10px 0; color: #ffffff;">${place || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">WhatsApp Number:</td>
            <td style="padding: 10px 0; color: #27c93f; font-weight: bold; font-size: 15px;">
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #27c93f; text-decoration: none;">${phone} &rarr;</a>
            </td>
          </tr>
        </table>

        <div style="font-size: 11px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
          Submitted via TopBright ICT Academy Website on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })}.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"TopBright Enrollment" <${process.env.EMAIL_USER}>`,
      to: "vvyshu06@gmail.com",
      replyTo: process.env.EMAIL_USER,
      subject: `🎓 New Enrollment: ${name} (${grade} - ${mode})`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send enrollment email." },
      { status: 500 }
    );
  }
}