"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.client";
import { AppwriteException } from "appwrite";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a session using Appwrite. Appwrite sessions are persistent by default.
      await account.createEmailPasswordSession(email, password);
      
      // Store transient preference if needed in the future
      if (!stayLoggedIn) {
        sessionStorage.setItem("transient_session", "true");
      }
      
      router.push("/admin/logs");
    } catch (err) {
      if (err instanceof AppwriteException) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during verification.");
      }
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
              <label className="label block text-[var(--text-secondary)] mb-2">Identifier</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="admin@roocky.dev"
              />
            </div>
            <div>
              <label className="label block text-[var(--text-secondary)] mb-2">Passkey</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-3 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <input 
                type="checkbox" 
                id="stayLoggedIn" 
                checked={stayLoggedIn}
                onChange={(e) => setStayLoggedIn(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-subtle)] bg-[var(--bg-secondary)] accent-[var(--accent-primary)]"
              />
              <label htmlFor="stayLoggedIn" className="text-sm font-mono text-[var(--text-secondary)] select-none cursor-pointer">
                Maintain active session
              </label>
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
