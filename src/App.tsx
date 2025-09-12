import HelpBar from "./components/HelpBar";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
        color: "#111827",
        background: "#fff",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0 }}>AI Router Demo</h1>
        <p style={{ color: "#6b7280", marginTop: 8, fontSize: 16 }}>
          Ask a question or request an action:
        </p>

        {/* Input + response inline */}
        <HelpBar />
      </div>
    </div>
  );
}
