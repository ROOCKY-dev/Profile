"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/logs");
      router.refresh();
    }
  };

  return (
    <main className="w-full min-h-[100dvh] bg-[var(--bg-primary)] flex items-center justify-center p-6">
      <div className="glass-card-elevated p-8 md:p-12 w-full max-w-md rounded-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-glow)] to-transparent pointer-events-none rounded-2xl" />
        
        <div className="relative z-10">
          <span className="badge mb-6 block w-fit">Authentication</span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] mb-8">
            Terminal Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="label block text-[var(--text-secondary)] mb-2">Email</label>
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
              <label className="label block text-[var(--text-secondary)] mb-2">Password</label>
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
              {loading ? "Authenticating..." : "Initialize Session"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
