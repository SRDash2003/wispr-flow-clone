// src/components/TranscriptionDisplay.tsx
type TranscriptionDisplayProps = {
  transcript: string;
};

export function TranscriptionDisplay({ transcript }: TranscriptionDisplayProps) {
  return (
    <div
      style={{
        marginTop: "24px",
        width: "100%",
        maxWidth: "600px",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#f9fafb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "14px",
        color: "#111827",
        boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: "8px", color: "#374151" }}>
        Transcription
      </div>
      <div style={{ whiteSpace: "pre-wrap", minHeight: "3em" }}>
        {transcript.trim().length > 0 ? transcript : "No transcription yet."}
      </div>
    </div>
  );
}
