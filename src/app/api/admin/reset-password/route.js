import { NextResponse } from "next/server";
import { getAdminUser, updateAdminPassword } from "@/lib/adminAuthStore";

export async function POST(req) {
  try {
    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { error: "Email, token, and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { error: "Password must be at least 4 characters long" },
        { status: 400 }
      );
    }

    const adminUser = await getAdminUser(email);

    if (!adminUser || !adminUser.resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired password reset request" },
        { status: 400 }
      );
    }

    if (adminUser.resetToken !== token) {
      return NextResponse.json(
        { error: "Invalid reset token provided" },
        { status: 400 }
      );
    }

    if (adminUser.resetTokenExpires && Date.now() > new Date(adminUser.resetTokenExpires).getTime()) {
      return NextResponse.json(
        { error: "Password reset link has expired. Please request a new link." },
        { status: 400 }
      );
    }

    // Save new password into database
    await updateAdminPassword(email, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully in database! You can now log in.",
    });
  } catch (err) {
    console.error("Reset password API error:", err);
    return NextResponse.json(
      { error: "Failed to reset password in database" },
      { status: 500 }
    );
  }
}
