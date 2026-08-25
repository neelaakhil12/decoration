import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const timestamp = new Date().toISOString();
  try {
    // 1. Perform a lightweight ping query on Supabase to keep the project active
    const { data, error } = await supabase
      .from("services")
      .select("id")
      .limit(1);

    if (error) {
      console.warn("Keep-alive Supabase query warning:", error.message);
      return NextResponse.json({
        success: true,
        status: "pinged_with_warning",
        timestamp,
        warning: error.message,
        message: "Keep-alive ping reached Supabase server",
      });
    }

    return NextResponse.json({
      success: true,
      status: "active",
      timestamp,
      message: "Supabase database is active and awake!",
      rowCount: data ? data.length : 0,
    });
  } catch (err) {
    console.error("Keep-alive error:", err);
    return NextResponse.json(
      {
        success: false,
        timestamp,
        error: err.message || "Failed to execute keep-alive query",
      },
      { status: 500 }
    );
  }
}
