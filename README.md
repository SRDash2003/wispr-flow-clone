# Wispr Flow Clone

A functional desktop clone of [Wispr Flow](https://wisprflow.ai)'s push-to-talk voice transcription app. Records from your microphone and transcribes using Deepgram's API.

[![Demo GIF](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Wispr+Flow+Clone+Demo)](https://github.com/yourusername/wispr-flow-clone)

## ✨ Features

- **Push-to-talk** recording with real-time visual feedback
- **Live mic capture** using browser MediaRecorder API
- **Deepgram-powered** speech-to-text transcription
- **Smooth UX** with loading states, copy button, and recording pulse
- **Tauri desktop app** (web tech, native performance)
- **Secure** – API keys stay local via `.env`

## 🎥 Demo
1. Click and hold "Record" button
2. Speak clearly into your mic
3. Release → see "Transcribing..." → get instant text
4. Click 📋 to copy


## 🛠 Tech Stack

- Frontend: React + TypeScript + Vanilla CSS
- Backend: Tauri (Rust + WebView)
- Speech: Deepgram REST API
- Mic: Web MediaRecorder API (WebM/Opus)
- State: Custom React hooks


## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Rust (for Tauri)
- [Deepgram account](https://console.deepgram.com) with API key

### 1. Clone & Install
 >> git clone https://github.com/SRDash2003/wispr-flow-clone.git
 >> cd wispr-flow-clone
 >> npm install

### 2. Setup API Key
- cp .env.example .env

- Edit .env with your real Deepgram key:
- VITE_DEEPGRAM_API_KEY=your_key_here

### 3. Run Development
>> npm run tauri dev

### 4. Build for Production
>> npm run tauri build


## 📱 Current Workflow
Push → Record (pulse animation) → Release →
Deepgram API → "Transcribing..." → Text + Copy 📋


**Latency note**: ~2-4s end-to-end due to full-clip REST upload. Speaking clearly = 95%+ accuracy.

## 🎨 UX Polish

| Feature | Implementation |
|---------|----------------|
| **Recording pulse** | CSS `@keyframes` animation |
| **Transcribing state** | `isTranscribing` boolean + italic text |
| **Copy feedback** | `navigator.clipboard` + "Copied!" toast |
| **Button states** | Disabled during recording/transcribing |

## 🏗 Architecture Decisions
useRecorder() hook manages:
├── isRecording (MediaRecorder.start/stop)
├── isTranscribing (Deepgram await wrapper)
├── transcript (Deepgram response)
└── permissionError (mic access fallback)

**Why REST over WebSocket?** Simpler prototype, same 95% accuracy. WebSocket streaming = future v2.

**Why MediaRecorder?** Native browser API, WebM/Opus = Deepgram's preferred format.

## 🔮 Future Improvements

- [ ] **WebSocket streaming** for <1s latency
- [ ] **Voice Activity Detection** (VAD) for auto-stop
- [ ] **Multiple languages**
- [ ] **Keyboard shortcuts** (Spacebar PTT)
- [ ] **Dark mode**
- [ ] **Export to notes apps**

## 📄 License

MIT – feel free to fork and build on top!

---

*Built with ❤️ using Tauri + Deepgram. Demo your voice app in 200 lines.*

---

> **Deepgram**: [console.deepgram.com](https://console.deepgram.com)  
> **Tauri**: [tauri.app](https://tauri.app)  
> **Wispr Flow**: [wisprflow.ai](https://wisprflow.ai) (inspiration)
