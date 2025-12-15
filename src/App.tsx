// src/App.tsx
import "./App.css";
import { RecorderButton } from "./components/RecorderButton";
import { TranscriptionDisplay } from "./components/TranscriptionDisplay";
import { useRecorder } from "./hooks/useRecorder";

function App() {
  const { isRecording, transcript, toggleRecording, permissionError  } = useRecorder();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "24px",
      }}
    >
      <h1>Wispr Flow Clone</h1>
      <p style={{ color: "#555", marginBottom: "8px" }}>
        Phase 3: Push-to-talk + real mic + Deepgram
      </p>

      {permissionError && (
        <p style={{ color: "red", fontSize: "14px" }}>{permissionError}</p>
      )}

      <RecorderButton isRecording={isRecording} onToggle={toggleRecording} />

      <p style={{ fontSize: "14px", color: "#777" }}>
        Recording state: <strong>{isRecording ? "ON" : "OFF"}</strong>
      </p>

      <TranscriptionDisplay transcript={transcript} />
    </div>
  );
}

export default App;
