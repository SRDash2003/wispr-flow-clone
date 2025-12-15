// src/App.tsx
import "./App.css";
import { RecorderButton } from "./components/RecorderButton";
import { TranscriptionDisplay } from "./components/TranscriptionDisplay";
import { useRecorder } from "./hooks/useRecorder";

function App() {
  const { isRecording, transcript, toggleRecording, permissionError, isTranscribing  } = useRecorder();

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
      <h1 style={{color: "#f2ecec"}}>Wispr Flow Clone </h1>
      <p style={{ color: "#d7d4d4ff", marginBottom: "8px" }}>
        Transcribe your voice into text in real time with Deepgram AI
      </p>

      {permissionError && (
        <p style={{ color: "red", fontSize: "14px" }}>{permissionError}</p>
      )}

      <RecorderButton isRecording={isRecording} onToggle={toggleRecording} />

      <p style={{ fontSize: "14px", color: "#d7d4d4ff" }}>
        Recording state: <strong>{isRecording ? "ON" : "OFF"}</strong>
      </p>

      {isRecording && (
        <div
          style={{
            marginTop: "4px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#e53935",
            boxShadow: "0 0 0 0 rgba(229, 57, 53, 0.7)",
            animation: "pulse 1.5s infinite",
          }}
        />
      )}

      <TranscriptionDisplay transcript={transcript} isTranscribing={isTranscribing} isRecording={isRecording}/>
    </div>
  );
}

export default App;
