import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wylohxuonxcsjyrhhxnc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5bG9oeHVvbnhjc2p5cmhoeG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3OTE3MjYsImV4cCI6MjEwMDM2NzcyNn0.uBXJPjvg5UM3H0FMsF_3zmnlepKX729KPoeLAvGq4v8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
