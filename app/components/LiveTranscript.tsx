"use client";

import { div } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";

type TranscriptLine = {
  speaker: "Agent" | "Customer";
  text: string;
  timestamp?: string;
};

const mockTranscript: TranscriptLine[] = [
  { speaker: "Agent", text: "Hello! How can I assist you today?" },
  { speaker: "Customer", text: "Hi, I’d like to cancel my order." },
  { speaker: "Agent", text: "I understand. May I ask why you’re canceling?" },
  { speaker: "Customer", text: "I found a better deal elsewhere." },
];

export default function LiveTranscript() {
  const [lines, setLines] = useState<TranscriptLine[]>(mockTranscript);
  const [live, setLive] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the latest line smoothly
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="bg-[#1e1e2f] p-4 rounded-xl h-[350px] overflow-y-auto shadow-inner my-4 border border-[#2e2e44]">
      <h2 className="text-lg font-semibold text-purple-400 mb-3 flex justify-start items-center">
        📝 Live Transcript{" "}
        {live ? (
          <div className="text-center text-2xl text-green-500">. </div>
        ) : (
          <div className="text-center text-2xl text-gray-500">.</div>
        )}
      </h2>
      <div className="space-y-2">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              line.speaker === "Agent" ? "items-start" : "items-end"
            }`}
          >
            <span
              className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                line.speaker === "Agent"
                  ? "bg-purple-800 text-purple-100"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              <strong>{line.speaker}:</strong> {line.text}
            </span>
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
}
