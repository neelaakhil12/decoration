import { supabase } from "./supabase";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "admin_users.json");
const SECRET_KEY = process.env.SMTP_PASSWORD || "decordazzlers_secure_secret_auth_2026";

export function generateResetToken(email, expiresAt = Date.now() + 3600000) {
  const cleanEmail = (email || "").toLowerCase().trim();
  const data = `${cleanEmail}:${expiresAt}`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
  return `${expiresAt}.${hmac}`;
}

export function verifyResetToken(email, token) {
  if (!token) return { valid: false, error: "Missing reset token" };
  const cleanEmail = (email || "").toLowerCase().trim();

  // If token is an HMAC token (format: timestamp.hmac)
  if (token.includes(".")) {
    const parts = token.split(".");
    const expiresAt = parseInt(parts[0], 10);
    const hmac = parts[1];

    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false, error: "Password reset link has expired. Please request a new one." };
    }

    const data = `${cleanEmail}:${expiresAt}`;
    const expectedHmac = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
    if (hmac === expectedHmac) {
      return { valid: true };
    }
    return { valid: false, error: "Invalid reset token signature" };
  }

  // Fallback for hex tokens from previous links (allow tokens with length >= 16)
  if (token.length >= 16) {
    return { valid: true };
  }

  return { valid: false, error: "Invalid reset token" };
}

// Default initial admin credentials if database/file is empty
const DEFAULT_ADMIN = {
  email: "prmohan.hyd@gmail.com",
  password: "admin", // Initial default password
  resetToken: null,
  resetTokenExpires: null,
  updatedAt: new Date().toISOString(),
};

function ensureLocalFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([DEFAULT_ADMIN], null, 2), "utf8");
    }
  } catch (err) {
    console.error("Local admin store file initialization error:", err);
  }
}

function readLocalUsers() {
  ensureLocalFile();
  try {
    const content = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading local admin users:", err);
    return [DEFAULT_ADMIN];
  }
}

function writeLocalUsers(users) {
  ensureLocalFile();
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing local admin users:", err);
  }
}

export async function getAdminUser(targetEmail) {
  const emailToFind = (targetEmail || process.env.ADMIN_EMAIL || "prmohan.hyd@gmail.com").toLowerCase();

  // 1. Try fetching from Supabase DB `admin_users` table
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", emailToFind)
      .maybeSingle();

    if (!error && data) {
      return {
        email: data.email,
        password: data.password,
        resetToken: data.reset_token || null,
        resetTokenExpires: data.reset_token_expires || null,
      };
    }

    // If row doesn't exist in Supabase DB yet, insert default admin record
    if (!error && !data) {
      const localUsers = readLocalUsers();
      const existingLocal = localUsers.find((u) => u.email.toLowerCase() === emailToFind);
      const initialPassword = existingLocal?.password || DEFAULT_ADMIN.password;

      await supabase.from("admin_users").upsert({
        email: emailToFind,
        password: initialPassword,
      }, { onConflict: "email" });
    }
  } catch (err) {
    console.warn("Supabase admin_users table query notice:", err.message);
  }

  // 2. Fallback to local JSON store
  const localUsers = readLocalUsers();
  let user = localUsers.find((u) => u.email.toLowerCase() === emailToFind);

  if (!user) {
    user = { ...DEFAULT_ADMIN, email: emailToFind };
    localUsers.push(user);
    writeLocalUsers(localUsers);
  }

  return user;
}

export async function updateAdminPassword(email, newPassword) {
  const emailToUpdate = email.toLowerCase();
  const updatedAt = new Date().toISOString();

  // 1. Update in Supabase DB `admin_users` table if exists
  try {
    const { error } = await supabase
      .from("admin_users")
      .upsert({
        email: emailToUpdate,
        password: newPassword,
        reset_token: null,
        reset_token_expires: null,
        updated_at: updatedAt,
      }, { onConflict: "email" });

    if (error) {
      console.warn("Supabase upsert admin_users error:", error.message);
    }
  } catch (err) {
    console.warn("Supabase update error:", err.message);
  }

  // 2. Always update local JSON store as well
  const localUsers = readLocalUsers();
  const index = localUsers.findIndex((u) => u.email.toLowerCase() === emailToUpdate);

  if (index !== -1) {
    localUsers[index].password = newPassword;
    localUsers[index].resetToken = null;
    localUsers[index].resetTokenExpires = null;
    localUsers[index].updatedAt = updatedAt;
  } else {
    localUsers.push({
      email: emailToUpdate,
      password: newPassword,
      resetToken: null,
      resetTokenExpires: null,
      updatedAt,
    });
  }
  writeLocalUsers(localUsers);

  return true;
}

export async function saveResetToken(email, token, expiresTimestamp) {
  const emailToUpdate = email.toLowerCase();

  // 1. Update Supabase DB
  try {
    await supabase.from("admin_users").upsert({
      email: emailToUpdate,
      password: (await getAdminUser(emailToUpdate)).password || "admin",
      reset_token: token,
      reset_token_expires: new Date(expiresTimestamp).toISOString(),
    }, { onConflict: "email" });
  } catch (err) {
    console.warn("Supabase save reset token notice:", err.message);
  }

  // 2. Update local JSON store
  const localUsers = readLocalUsers();
  const index = localUsers.findIndex((u) => u.email.toLowerCase() === emailToUpdate);

  if (index !== -1) {
    localUsers[index].resetToken = token;
    localUsers[index].resetTokenExpires = expiresTimestamp;
    writeLocalUsers(localUsers);
  }
}
