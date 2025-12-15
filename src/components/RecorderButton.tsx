// src/components/RecorderButton.tsx
type RecorderButtonProps = {
  isRecording: boolean;
  onToggle: () => void;
};

export function RecorderButton({ isRecording, onToggle }: RecorderButtonProps) {
  return (
    <button className="recorder-button"
      onClick={onToggle}
      style={{
        padding: "12px 24px",
        borderRadius: "999px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: 600,
        color: "white",
        backgroundColor: isRecording ? "#dc2626" : "#16a34a",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      {isRecording ? "Recording…" : "Press to Record"}
    </button>
  );
}
