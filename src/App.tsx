// src/App.tsx
import "./App.css";
import { RecorderButton } from "./components/RecorderButton";
import { useRecorder } from "./hooks/useRecorder";

function App() {
  const { isRecording, toggleRecording } = useRecorder();

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
      }}
    >
      <h1>Wispr Flow Clone</h1>
      <p style={{ color: "#555" }}>Phase 2: Push-to-talk UI (no audio yet)</p>

      <RecorderButton isRecording={isRecording} onToggle={toggleRecording} />

      <p style={{ fontSize: "14px", color: "#777" }}>
        Recording state: <strong>{isRecording ? "ON" : "OFF"}</strong>
      </p>
    </div>
  );
}

export default App;
