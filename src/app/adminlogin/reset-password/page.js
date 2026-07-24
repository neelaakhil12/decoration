"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldCheck, CheckCircle, ArrowRight, AlertCircle, KeyRound, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "prmohan.hyd@gmail.com";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      setError("No reset token found in URL. Please click the link sent to your email.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setSuccess(data.message || "Password updated successfully in database!");
        setTimeout(() => {
          router.push("/adminlogin");
        }, 3000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-plum via-[#2E1524] to-brand-plum flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-brand-gold/30 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3.5 bg-brand-gold/15 rounded-2xl text-brand-gold mb-1">
            <KeyRound className="h-8 w-8 text-brand-gold" />
          </div>
          <h1 className="text-2xl font-serif font-black text-brand-plum">
            Set New <span className="text-brand-gold italic">Admin Password</span>
          </h1>
          <p className="text-xs text-gray-500 font-sans">
            Updating password for <span className="font-bold text-brand-plum">{email}</span>
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold font-sans flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl space-y-3 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
            <p className="text-sm font-bold font-sans">{success}</p>
            <p className="text-xs text-gray-500 font-sans">Redirecting to Admin Login in 3 seconds...</p>
            <Link
              href="/adminlogin"
              className="inline-flex items-center justify-center px-4 py-2 bg-brand-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-plum/90 transition-all"
            >
              Go to Admin Login Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider font-sans mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-11 pr-11 py-3 rounded-xl text-sm text-brand-plum font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-plum transition-colors cursor-pointer p-1"
                  title={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4 text-brand-gold" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider font-sans mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-11 pr-11 py-3 rounded-xl text-sm text-brand-plum font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-plum transition-colors cursor-pointer p-1"
                  title={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 text-brand-gold" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-3.5 bg-brand-plum hover:bg-brand-plum/90 disabled:opacity-50 text-white rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
            >
              <span>{loading ? "Updating Database..." : "Save Password & Update Database"}</span>
              <ArrowRight className="h-4 w-4 text-brand-gold" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-gray-100">
          <Link href="/adminlogin" className="text-xs font-bold text-brand-gold hover:underline font-sans">
            ← Back to Admin Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-plum flex items-center justify-center text-white font-sans text-sm">
        Loading Reset Password...
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
