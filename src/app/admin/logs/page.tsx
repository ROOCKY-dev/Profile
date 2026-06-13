"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account, databases, APPWRITE_DB_ID, APPWRITE_LOGS_COLLECTION_ID } from "@/lib/appwrite.client";
import { ID, Query } from "appwrite";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [eventText, setEventText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      await account.get();
      fetchLogs();
    } catch {
      router.push("/verify");
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      setLogs(response.documents);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
    setLoading(false);
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventText || !timeText) return;

    try {
      await databases.createDocument(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        ID.unique(),
        { time: timeText, event: eventText }
      );
      setEventText("");
      setTimeText("");
      fetchLogs();
    } catch (error: any) {
      alert("Error adding log: " + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(
        APPWRITE_DB_ID,
        APPWRITE_LOGS_COLLECTION_ID,
        id
      );
      fetchLogs();
    } catch (error: any) {
      alert("Error deleting log: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Logout error", error);
    }
    router.push("/verify");
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
            <div className="text-[var(--text-tertiary)] font-mono text-sm">No logs found in Appwrite.</div>
          ) : (
            logs.map((log) => (
              <div key={log.$id} className="glass-card p-4 rounded-xl flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[var(--accent-primary)] bg-[var(--accent-glow)] px-2 py-1 rounded">
                    {log.time}
                  </span>
                  <span className="font-mono text-sm text-[var(--text-primary)]">
                    {log.event}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(log.$id)}
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
