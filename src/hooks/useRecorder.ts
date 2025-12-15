// src/hooks/useRecorder.ts
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { transcribeWithDeepgram } from "../services/deepgram";

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  // In the future this will hold the last recorded audio blob.
  // For now we keep it as null and focus on wiring.
  const [lastAudioBlob] = useState<Blob | null>(null);

  async function startRecording() {
    try {
      await invoke("start_recording");
      setIsRecording(true);
      // Optionally clear previous transcript when starting fresh
      // setTranscript("");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }

  async function stopRecording() {
    try {
      await invoke("stop_recording");
      setIsRecording(false);

      // If we had real audio, we'd pass it here. For now, pass a dummy Blob.
      const fakeBlob = lastAudioBlob ?? new Blob();
      const text = await transcribeWithDeepgram(fakeBlob);
      setTranscript(text);
    } catch (error) {
      console.error("Failed to stop recording:", error);
    }
  }

  async function toggleRecording() {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }

  return {
    isRecording,
    transcript,
    toggleRecording,
  };
}
