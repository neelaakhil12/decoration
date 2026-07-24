import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { getAdminUser, saveResetToken } from "@/lib/adminAuthStore";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const targetEmail = (email || process.env.ADMIN_EMAIL || "prmohan.hyd@gmail.com").toLowerCase().trim();

    // Generate secure reset token valid for 1 hour
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 3600000; // 1 hour

    // Store reset token in Database
    await saveResetToken(targetEmail, token, expiresAt);

    // Get origin URL for building the reset link
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
    const resetUrl = `${protocol}://${host}/adminlogin/reset-password?token=${token}&email=${encodeURIComponent(targetEmail)}`;

    // Setup Nodemailer SMTP transport
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER || "prmohan.hyd@gmail.com";
    const smtpPass = process.env.SMTP_PASSWORD || "edbydlyidzbnrmky";
    const smtpFrom = process.env.SMTP_FROM || `"Decor Dazzlers Admin" <${smtpUser}>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpFrom,
      to: targetEmail,
      subject: "🔒 Decor Dazzlers Admin - Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #D4AF37;">
            <h2 style="color: #4A154B; margin: 0;">Decor Dazzlers</h2>
            <p style="color: #D4AF37; font-size: 14px; font-weight: bold; margin: 4px 0 0 0;">Admin Control Center</p>
          </div>
          
          <div style="padding: 24px 0; color: #333333; line-height: 1.6;">
            <p>Hello Admin,</p>
            <p>A request was received to reset the password for your Admin Panel account (<strong>${targetEmail}</strong>).</p>
            <p>Click the button below to set a new password for your account:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" target="_blank" style="background-color: #4A154B; color: #ffffff; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                🔑 Reset My Password
              </a>
            </div>
            
            <p style="font-size: 12px; color: #666666;">Or copy and paste this link into your browser:</p>
            <p style="font-size: 11px; word-break: break-all; color: #D4AF37;">${resetUrl}</p>
            
            <p style="font-size: 12px; color: #888888; margin-top: 20px;">
              ⏱️ <em>Note: This password reset link will expire in 60 minutes. If you did not request this reset, you can safely ignore this email.</em>
            </p>
          </div>
          
          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #eeeeee; color: #999999; font-size: 11px;">
            Decor Dazzlers Admin Security System • Automated Mailer
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: `Password reset link sent successfully to ${targetEmail}`,
    });
  } catch (err) {
    console.error("Forgot password SMTP error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to send reset email via SMTP" },
      { status: 500 }
    );
  }
}
