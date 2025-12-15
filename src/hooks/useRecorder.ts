// src/hooks/useRecorder.ts
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Temporary mock transcription – will be replaced by Deepgram later
  async function mockTranscribe(): Promise<string> {
    // In the real version, this will send audio to Deepgram and return text
    return "This is a placeholder transcription. Deepgram integration coming next.";
  }

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

      // For now, call mockTranscribe to simulate getting text
      const text = await mockTranscribe();
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
