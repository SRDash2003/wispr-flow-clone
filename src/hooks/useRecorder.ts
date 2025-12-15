// src/hooks/useRecorder.ts
import { useState } from "react";

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);

  function toggleRecording() {
    setIsRecording((prev) => !prev);
  }

  return {
    isRecording,
    toggleRecording,
  };
}
