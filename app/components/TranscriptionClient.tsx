"use client";

import { useEffect, useRef, useState } from "react";

const TranscriptionClient = () => {
  const [transcript, setTranscript] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const startTranscription = async () => {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const deepgramSocket = new WebSocket(
        `wss://api.deepgram.com/v1/listen?access_token=${process.env.NEXT_PUBLIC_DEEPGRAM_API_SECRET}`
      );

      deepgramSocket.onopen = () => {
        console.log("Deepgram WebSocket connected");
        socketRef.current = deepgramSocket;
        mediaRecorder.start(250); // chunk every 250ms

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0 && socketRef.current?.readyState === 1) {
            socketRef.current.send(event.data);
          }
        };
      };

      deepgramSocket.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const transcriptText = data.channel?.alternatives[0]?.transcript;
        if (transcriptText && !data.is_final) {
          setTranscript(transcriptText);
        }
      };

      deepgramSocket.onerror = (err) => {
        console.log("Deepgram WebSocket error:", err);
      };
    };

    startTranscription();

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <div className="p-6 text-white bg-[#121212] rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-purple-400 mb-4">
        🎙️ Live Transcription
      </h2>
      <p className="text-lg text-[#e0e0e0]">
        {transcript || "Speak something..."}
      </p>
    </div>
  );
};

export default TranscriptionClient;
