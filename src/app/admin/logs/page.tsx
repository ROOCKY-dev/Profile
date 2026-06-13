"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminLogs, createAdminLog, updateAdminLog, deleteAdminLog } from "./actions/log.actions";
import { logout } from "@/app/verify/actions";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [eventText, setEventText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const docs = await getAdminLogs();
      setLogs(docs);
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/verify");
      } else {
        console.error("Failed to fetch logs:", error);
      }
    }
    setLoading(false);
  };

  const setNow = () => {
    const now = new Date();
    const formatted = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    setTimeText(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventText || !timeText) return;

    try {
      if (editingId) {
        await updateAdminLog(editingId, timeText, eventText);
      } else {
        await createAdminLog(timeText, eventText);
      }
      setEventText("");
      setTimeText("");
      setEditingId(null);
      fetchLogs();
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/verify");
      } else {
        alert("Error saving log: " + error.message);
      }
    }
  };

  const handleEdit = (log: any) => {
    setEditingId(log.$id);
    setEventText(log.event);
    setTimeText(log.time);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEventText("");
    setTimeText("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return;
    try {
      await deleteAdminLog(id);
      fetchLogs();
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        router.push("/verify");
      } else {
        alert("Error deleting log: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/verify");
  };

  return (
    <main className="w-full min-h-[100dvh] bg-[var(--bg-primary)] p-6 pt-32 relative overflow-hidden">
      <div className="absolute inset-0 line-grid opacity-10 pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="w-full max-w-[900px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <span className="badge mb-4">Command Center</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              System Logs
            </h1>
          </div>
          <button onClick={handleLogout} className="btn-ghost !text-xs border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-red-400">
            End Session
          </button>
        </div>

        {/* Editor Form */}
        <div className={`glass-card-elevated p-8 rounded-3xl mb-16 transition-all duration-500 border ${editingId ? 'border-[var(--accent-primary)] shadow-[0_0_40px_rgba(var(--accent-rgb),0.1)]' : 'border-[var(--border-subtle)]'}`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-3">
              {editingId ? (
                <><span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" /> Editing Log</>
              ) : (
                <><span className="w-2 h-2 rounded-full bg-emerald-400" /> New Log Entry</>
              )}
            </h2>
            {editingId && (
              <button onClick={handleCancelEdit} className="text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] uppercase tracking-wider">
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Timestamp</label>
                  <button type="button" onClick={setNow} className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-primary)] hover:underline">
                    [ Set Now ]
                  </button>
                </div>
                <input 
                  type="text" 
                  value={timeText} 
                  onChange={(e) => setTimeText(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  placeholder="e.g. 14:30 - Jun 13"
                />
              </div>

              <div className="w-full md:w-2/3">
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Event Description</label>
                <textarea 
                  value={eventText} 
                  onChange={(e) => setEventText(e.target.value)}
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-[var(--text-primary)] font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-colors min-h-[120px] resize-y"
                  placeholder="Log system update, personal thought, or dev milestone..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--border-subtle)]">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Sequence' : 'Commit Log'}
              </button>
            </div>
          </form>
        </div>

        {/* Log List */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="label text-[var(--text-secondary)]">Database Records</h2>
            <div className="h-px bg-[var(--border-subtle)] flex-1" />
          </div>

          {loading ? (
            <div className="text-[var(--text-tertiary)] font-mono text-sm animate-pulse text-center py-12">Scanning records...</div>
          ) : logs.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center border-dashed">
              <p className="text-[var(--text-tertiary)] font-mono text-sm">Database is empty. Waiting for input.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {logs.map((log) => (
                <div key={log.$id} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[var(--border-highlight)] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1">
                    <span className="font-mono text-xs whitespace-nowrap text-[var(--accent-primary)] bg-[var(--accent-glow)] px-3 py-1.5 rounded-md border border-[var(--accent-primary)]/20">
                      {log.time}
                    </span>
                    <p className="font-mono text-sm text-[var(--text-primary)] leading-relaxed line-clamp-2 md:line-clamp-none">
                      {log.event}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-auto shrink-0">
                    <button 
                      onClick={() => handleEdit(log)}
                      className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(log.$id)}
                      className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
