// src/hooks/useRecorder.ts
import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { transcribeWithDeepgram } from "../services/deepgram";

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  // Ask for microphone permission and prepare MediaRecorder
  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });
        mediaRecorderRef.current = recorder;
        setPermissionError(null);
      } catch (error: any) {
        console.error("Failed to access microphone:", error);
        setPermissionError("Microphone permission denied or not available.");
      }
    }

    setup().catch((err) => {
      console.error("Error setting up MediaRecorder:", err);
      setPermissionError("Error initializing microphone.");
    });
  }, []);

  async function startRecording() {
    if (!mediaRecorderRef.current) {
      console.warn("MediaRecorder not ready.");
      return;
    }

    try {
      await invoke("start_recording"); // still call Tauri command for symmetry/logging
    } catch (error) {
      console.error("Failed to call start_recording command:", error);
      // Not fatal for web recording, so continue
    }

    chunksRef.current = [];

    const recorder = mediaRecorderRef.current;
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.start();
    setIsRecording(true);
    // Optionally clear previous transcript when starting new recording
    // setTranscript("");
  }

  async function stopRecording() {
    if (!mediaRecorderRef.current) {
      console.warn("MediaRecorder not ready.");
      return;
    }

    try {
      await invoke("stop_recording");
    } catch (error) {
      console.error("Failed to call stop_recording command:", error);
    }

    const recorder = mediaRecorderRef.current;

    const audioBlob: Blob = await new Promise((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm;codecs=opus",
        });
        resolve(blob);
      };

      recorder.stop();
    });

    setIsRecording(false);

    // Send real audio blob to Deepgram
    const text = await transcribeWithDeepgram(audioBlob);
    setTranscript(text);
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
    permissionError,
  };
}
