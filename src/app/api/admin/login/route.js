import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/adminAuthStore";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const adminUser = await getAdminUser(email);

    // Verify password against stored password in DB
    if (adminUser && adminUser.password === password) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        email: adminUser.email,
      });
    }

    // Also check for fallback admin credentials check if user enters standard admin emails before first password change
    if (
      (email === "admin@decordazzlers.com" || email === "prmohan.hyd@gmail.com" || email === "admin@gmail.com") &&
      password === (adminUser?.password || "admin")
    ) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        email,
      });
    }

    return NextResponse.json(
      { error: "Invalid admin email or password" },
      { status: 401 }
    );
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json(
      { error: "Internal server error during login" },
      { status: 500 }
    );
  }
}
