"use client";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CallStatus from "./CallStatus";

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
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [sid, setSid] = useState("");
  useEffect(() => {
    // Scroll to the latest line smoothly
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);
  const makeCall = async () => {
    if (number.length != 10) {
      toast.error("Enter a Valid number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/twilio-call", {
        method: "POST",
        body: JSON.stringify({ to: `+91${number}` }), // Replace with your number
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        alert(`Call started: ${data.callSid}`);
        setSid(data.callSid);
      } else {
        alert(`Call failed: ${data.error}`);
        setSid("");
      }
    } catch (e) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1e2f] relative overflow-x-hidden p-4 rounded-xl h-[350px] overflow-y-auto shadow-inner my-4 border border-[#2e2e44]">
      <h2 className="text-lg font-semibold text-purple-400 mb-3 flex justify-start items-center">
        📝 Live Transcript{" "}
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
      <div className="w-full absolute bottom-2 flex gap-4 justify-center items-center h-fit p-3 ">
        <button
          onClick={makeCall}
          type="button"
          className="w-fit-h-fit px-4 py-2 rounded-xl bg-green-600"
        >
          Make Call
        </button>
        <input
          type="number"
          placeholder="Enter Contact (+91)"
          className="bg-gray-500 outline-0 px-3 py-2 rounded-xl w-fit text-white"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        ></input>
        <CallStatus callSid={sid} />
      </div>
      <Toaster />
    </div>
  );
}
