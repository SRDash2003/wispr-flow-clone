// src/components/TranscriptionDisplay.tsx
import { useState } from "react";

type TranscriptionDisplayProps = {
  transcript: string;
  isTranscribing: boolean;
  isRecording: boolean;
};

export function TranscriptionDisplay({
  transcript,
  isTranscribing,
  isRecording,
}: TranscriptionDisplayProps) {
  const hasTranscript = transcript.trim().length > 0;
  const canCopy = hasTranscript && !isRecording && !isTranscribing;

  const [copied, setCopied]= useState(false);

  async function handleCopy() {
    if (!canCopy) return;
    if (!navigator.clipboard?.writeText) {
      alert("Copy not supported in this browser");
      return;
    }
    try {
      await navigator.clipboard.writeText(transcript); // Clipboard API [web:224][web:201]
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // hide after 1.5s [web:271][web:281]
    } catch (e) {
      console.error("Failed to copy", e);
    }
  }

  return (
    <div
      style={{
        position: "relative", // needed for top-right button
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

      {/* Copy icon button – top right, only when transcript exists */}
       {hasTranscript && (
       <button 
         className={`copy-button ${canCopy ? '' : 'copy-button--disabled'}`}
         onClick={handleCopy}
         disabled={!canCopy}
         aria-label="Copy transcript"
       >
      <span>📋</span>
    </button>
    )}


      {/* Small copied message */}
      {copied && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "40px",
            fontSize: "12px",
            color: "#059669",
          }}
        >
          Copied!
        </div>
      )}

      {isRecording && !isTranscribing && !hasTranscript && (
        <div
          style={{
            marginBottom: "4px",
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          Recording… release to transcribe.
        </div>
      )}

      {/* Transcribing state */}
      {isTranscribing && (
        <div
          style={{
            whiteSpace: "pre-wrap",
            minHeight: "3em",
            color: "#6b7280",
            fontStyle: "italic",
          }}
        >
          Transcribing…
        </div>
      )}

      {/* Normal content */}
      {!isTranscribing && (
        <div style={{ whiteSpace: "pre-wrap", minHeight: "3em" }}>
          {hasTranscript ? transcript : "No transcription yet."}
        </div>
      )}
    </div>
  );
}

