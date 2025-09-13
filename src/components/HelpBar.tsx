import { useEffect, useMemo, useState } from "react";

// Shape the backend can return
type RouterResp =
  | { answer: string; action?: null; args?: undefined }
  | { action: "createPaymentHold"; args: { invoiceId: string; amount: number }; answer?: undefined }
  | { error: string };

export default function HelpBar() {
  const [q, setQ] = useState<string>("");
  const [res, setRes] = useState<RouterResp | null>(null);
  const [busy, setBusy] = useState<boolean>(false);
  const [barWidth, setBarWidth] = useState<number>(360);

  // Responsive width
  useEffect(() => {
    const compute = () => setBarWidth(Math.min(420, Math.max(300, window.innerWidth - 32)));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const fmtAmount = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }),
    []
  );

  async function ask(): Promise<void> {
    if (!q.trim() || busy) return;
    setBusy(true);
    setRes(null);

    try {
      const r = await fetch("http://localhost:8080/ai/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q }),
      });
      const data: RouterResp = await r.json();
      setRes(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setRes({ error: message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ marginTop: 16, width: "100%", maxWidth: 720 }}>
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
            minWidth: 64,
          }}
        >
          {busy ? "…" : "Ask"}
        </button>
      </div>

      {res && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
          }}
        >
          {"error" in res && res.error && (
            <div
              style={{
                color: "#b91c1c",
                background: "#fee2e2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "8px 10px",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {res.error}
            </div>
          )}

          {"answer" in res && res.answer && (
            <div style={{ color: "#111827", fontSize: 14, whiteSpace: "pre-wrap" }}>
              {res.answer}
            </div>
          )}

          {"action" in res && res.action && res.args && (
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "#e0f2fe",
                  color: "#075985",
                  border: "1px solid #bae6fd",
                  padding: "2px 8px",
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {res.action}
              </div>

              <div style={{ marginTop: 8, fontSize: 14, color: "#111827" }}>
                <div>
                  <span style={{ color: "#6b7280" }}>Invoice:</span>{" "}
                  <code
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 6,
                      padding: "2px 6px",
                    }}
                  >
                    {res.args.invoiceId}
                  </code>
                </div>
                <div style={{ marginTop: 4 }}>
                  <span style={{ color: "#6b7280" }}>Amount:</span>{" "}
                  <strong>{fmtAmount.format(res.args.amount)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
