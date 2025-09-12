import { useState } from "react";

export default function HelpBar() {
  const [q, setQ] = useState<string>("");
  const [res, setRes] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  async function ask() {
    if (!q.trim() || busy) return;
    setBusy(true);
    setRes(null);

    try {
      const r = await fetch("http://localhost:8080/ai/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const data = await r.json();
      setRes(data);
    } catch (err: any) {
      setRes({ error: String(err?.message ?? err) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask something…"
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #d1d5db",
            borderRadius: 8,
            fontSize: 14,
          }}
          onKeyDown={(e) => e.key === "Enter" && ask()}
        />
        <button
          onClick={ask}
          disabled={busy}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: busy ? "#9ca3af" : "#2563eb",
            color: "#fff",
            fontWeight: 600,
            fontSize: 14,
            cursor: busy ? "not-allowed" : "pointer",
          }}
        >
          {busy ? "…" : "Ask"}
        </button>
      </div>

      {res && (
        <pre
          style={{
            marginTop: 12,
            padding: 12,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            fontSize: 13,
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  );
}
