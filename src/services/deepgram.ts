// src/services/deepgram.ts

// Later you will put your real Deepgram API key in an env var, e.g. VITE_DEEPGRAM_API_KEY
const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY as string | undefined;

// This function will send audio to Deepgram and return the transcript.
// For now it's a stub, kept separate from UI for clean architecture.
export async function transcribeWithDeepgram(_audio: Blob): Promise<string> {
  if (!DEEPGRAM_API_KEY) {
    console.warn("Deepgram API key is not set (VITE_DEEPGRAM_API_KEY). Returning mock text.");
    return "Deepgram API key not configured yet. This is still a mock transcription.";
  }

  // TODO: Implement real REST call:
  // - Convert Blob to ArrayBuffer
  // - POST to https://api.deepgram.com/v1/listen with appropriate headers
  // - Parse JSON and extract transcript

  // For now, still return a placeholder so app keeps working
  return "Deepgram integration placeholder: real transcription will go here.";
}
