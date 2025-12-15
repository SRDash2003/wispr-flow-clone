// src-tauri/src/audio.rs
use std::fs::File;
use std::io::BufWriter;
use std::sync::{Arc, Mutex};

use cpal::traits::{DeviceTrait, HostTrait, StreamTrait};
use hound::{SampleFormat, WavSpec, WavWriter};

pub struct Recorder {
    stream: Option<cpal::Stream>,
    writer: Arc<Mutex<Option<WavWriter<BufWriter<File>>>>>,
}

impl Recorder {
    pub fn new() -> Self {
        Self {
            stream: None,
            writer: Arc::new(Mutex::new(None)),
        }
    }

    pub fn start(&mut self) -> Result<(), String> {
        if self.stream.is_some() {
            return Ok(()); // already recording
        }

        let host = cpal::default_host();
        let device = host
            .default_input_device()
            .ok_or_else(|| "No input device available".to_string())?;

        let config = device
            .default_input_config()
            .map_err(|e| format!("Failed to get default input config: {e}"))?;
        let sample_format = config.sample_format();
        let config: cpal::StreamConfig = config.into();

        // Prepare WAV writer
        let spec = WavSpec {
            channels: config.channels,
            sample_rate: config.sample_rate.0,
            bits_per_sample: 16,
            sample_format: SampleFormat::Int,
        };

        let file = File::create("recording.wav")
            .map_err(|e| format!("Failed to create recording.wav: {e}"))?;
        let writer = WavWriter::new(BufWriter::new(file), spec)
            .map_err(|e| format!("Failed to create WAV writer: {e}"))?;

        let writer_handle = self.writer.clone();
        *writer_handle.lock().unwrap() = Some(writer);

        // Data callback – only supports f32 for now
        let writer_handle_clone = self.writer.clone();
        let data_callback = move |data: &[f32], _: &cpal::InputCallbackInfo| {
            if let Some(writer) = &mut *writer_handle_clone.lock().unwrap() {
                for &sample in data {
                    let s = (sample * i16::MAX as f32) as i16;
                    if let Err(e) = writer.write_sample(s) {
                        eprintln!("Failed to write sample: {e}");
                        break;
                    }
                }
            }
        };

        let error_callback = |err| {
            eprintln!("Stream error: {err}");
        };

        let stream = match sample_format {
            cpal::SampleFormat::F32 => device
                .build_input_stream(&config, data_callback, error_callback, None)
                .map_err(|e| format!("Failed to build input stream: {e}"))?,
            other => {
                return Err(format!(
                    "Unsupported sample format: {other:?}. Only f32 is supported in this example."
                ));
            }
        };

        stream
            .play()
            .map_err(|e| format!("Failed to start input stream: {e}"))?;

        self.stream = Some(stream);
        println!("Recording started, writing to recording.wav");
        Ok(())
    }

    pub fn stop(&mut self) -> Result<(), String> {
        // Dropping the stream stops the callback
        if self.stream.is_some() {
            self.stream = None;
            println!("Recording stopped");
        }

        // Finalize WAV: drop the writer so it flushes and closes the file
        if let Some(writer) = self.writer.lock().unwrap().take() {
            drop(writer);
            println!("recording.wav finalized");
        }

        Ok(())
    }
}
