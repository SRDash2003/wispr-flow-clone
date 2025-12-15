// src/services/deepgram.ts

const DEEPGRAM_API_KEY = import.meta.env.VITE_DEEPGRAM_API_KEY as
  | string
  | undefined;

// Deepgram pre-recorded transcription via REST API.
// Docs: https://developers.deepgram.com/docs/pre-recorded-audio [web:152][web:151]
export async function transcribeWithDeepgram(audio: Blob): Promise<string> {
  if (!DEEPGRAM_API_KEY) {
    console.warn("Deepgram API key is not set (VITE_DEEPGRAM_API_KEY).");
    return "Deepgram API key not configured. Please set VITE_DEEPGRAM_API_KEY in your .env file.";
  }

  try {
    // Convert Blob to ArrayBuffer for fetch body
    const arrayBuffer = await audio.arrayBuffer();

    const response = await fetch(
      // Basic example: English, nova-3 model, smart formatting enabled [web:151][web:161]
      "https://api.deepgram.com/v1/listen?model=nova-3&language=en-US&smart_format=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          // Send WebM/Opus audio from MediaRecorder. [web:119][web:159]
          "Content-Type": "audio/webm;codecs=opus",
        },
        body: arrayBuffer,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Deepgram error:", response.status, errorText);
      return `Deepgram error: ${response.status}. Check console for details.`;
    }

    const json = (await response.json()) as any;

    // Deepgram's response shape for STT includes results.channels[0].alternatives[0].transcript [web:152][web:161]
    const transcript =
      json?.results?.channels?.[0]?.alternatives?.[0]?.transcript ?? "";

    if (!transcript) {
      return "Deepgram returned no transcript.";
    }

    return transcript;
  } catch (error) {
    console.error("Failed to call Deepgram:", error);
    return "Failed to contact Deepgram API. See console for details.";
  }
}
