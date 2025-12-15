// src/hooks/useRecorder.ts
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);

  async function startRecording() {
    try {
      await invoke("start_recording");
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }

  async function stopRecording() {
    try {
      await invoke("stop_recording");
      setIsRecording(false);
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
    toggleRecording,
  };
}
