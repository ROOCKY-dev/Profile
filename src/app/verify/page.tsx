"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";

export default function VerifyPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login(password);
      if (res.success) {
        router.push("/admin/logs");
      } else {
        setError(res.error || "Invalid passkey");
      }
    } catch (err) {
      setError("An unknown error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[100dvh] bg-[var(--bg-primary)] flex items-center justify-center p-6">
      <div className="glass-card-elevated p-8 md:p-12 w-full max-w-md rounded-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent pointer-events-none rounded-2xl" />
        
        <div className="relative z-10">
          <span className="badge mb-6 block w-fit">Authentication</span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mb-8">
            System Verification
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="label block text-[var(--text-secondary)] mb-2">Admin Passphrase</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-8"
            >
              {loading ? "Verifying..." : "Initialize Session"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
