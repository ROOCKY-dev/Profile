"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { fadeUp, stagger } from "@/lib/animations";
import { motion } from "framer-motion";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [eventText, setEventText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
    fetchLogs();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login");
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setLogs(data);
    }
    setLoading(false);
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventText || !timeText) return;

    const { error } = await supabase.from("logs").insert([
      { time: timeText, event: eventText }
    ]);

    if (!error) {
      setEventText("");
      setTimeText("");
      fetchLogs();
    } else {
      alert("Error adding log: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("logs").delete().eq("id", id);
    if (!error) {
      fetchLogs();
    } else {
      alert("Error deleting log: " + error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="w-full min-h-[100dvh] bg-[var(--bg-primary)] p-6 pt-32">
      <div className="w-full max-w-[800px] mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display text-4xl font-bold uppercase text-[var(--text-primary)]">
            Admin / Logs
          </h1>
          <button onClick={handleLogout} className="btn-ghost !text-xs">
            Sign Out
          </button>
        </div>

        {/* Add Log Form */}
        <div className="glass-card-elevated p-8 rounded-2xl mb-12">
          <h2 className="label text-[var(--text-secondary)] mb-6">New Log Entry</h2>
          <form onSubmit={handleAddLog} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Time (e.g. 14:30)</label>
              <input 
                type="text" 
                value={timeText} 
                onChange={(e) => setTimeText(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                placeholder="14:30"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Event</label>
              <input 
                type="text" 
                value={eventText} 
                onChange={(e) => setEventText(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                placeholder="Deployed new feature..."
              />
            </div>
            <button type="submit" className="btn-primary h-[42px] px-8">Add</button>
          </form>
        </div>

        {/* Log List */}
        <div className="space-y-4">
          <h2 className="label text-[var(--text-secondary)] mb-6 block">Recent Logs</h2>
          {loading ? (
            <div className="text-[var(--text-tertiary)] font-mono text-sm animate-pulse">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="text-[var(--text-tertiary)] font-mono text-sm">No logs found in Supabase.</div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="glass-card p-4 rounded-xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--accent-primary)] bg-[var(--accent-glow)] px-2 py-1 rounded">
                    {log.time}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {log.event}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(log.id)}
                  className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
