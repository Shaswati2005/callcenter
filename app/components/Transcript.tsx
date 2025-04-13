"use client";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CallStatus from "./CallStatus";

type TranscriptLine = {
  speaker: "Agent" | "Customer";
  text: string;
  timestamp?: string;
};

const mockTranscript: TranscriptLine[] = [];

export default function LiveTranscript() {
  const [lines] = useState<TranscriptLine[]>(mockTranscript);
  const [number, setNumber] = useState("");
  const [showDialPad, setShowDialPad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sid, setSid] = useState("");
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const [recorder, setrecorder] = useState("");
  const [line, setLine] = useState<string>("");

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleNumberInput = (digit: string) => {
    setNumber((prev) => (prev.length < 15 ? prev + digit : prev));
  };

  const fetchTranscript = async () => {
    try {
      const res = await fetch(
        `https://call-system-backend.onrender.com/get-transcript?url=${recorder}`
      );
      const body = await res.json();
      console.log(body);
      setLine(body.transcript);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCall = async () => {
    if (number.length < 10) {
      toast.error("Enter a valid number.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "https://call-system-backend.onrender.com/start-call",
        {
          method: "POST",
          body: JSON.stringify({ to: `+91${number}` }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const contentType = res.headers.get("content-type");
      if (!res.ok || !contentType?.includes("application/json")) {
        toast.error("Invalid server response.");
      }
      const data = await res.json();
      if (res.status === 200) {
        toast.success(`Call started: ${data.sid}`);
        setSid(data.sid);
      } else {
        toast.error(`Call failed: ${data.error}`);
        setSid("");
      }
    } catch (error) {
      toast.error("Call could not be started.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-[#1e1e2f] rounded-xl p-4 shadow-inner border border-[#2e2e44] 
      h-[80vh] w-full max-w-5xl mx-auto mb-8 flex flex-col justify-between"
    >
      <h2 className="text-lg font-semibold text-purple-400 mb-3">
        📝 Live Transcript
      </h2>

      <div className="overflow-y-auto mt-2 mb-2 flex-1">
        <span
          className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm 
              
                bg-purple-800 text-purple-100
                
            }`}
        >
          <strong>{line}</strong>
        </span>

        <div ref={transcriptEndRef} />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 p-2 border-t border-[#2e2e44]">
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="tel"
            value={number}
            onFocus={() => setShowDialPad(true)}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter Contact"
            className="bg-gray-700 text-white px-3 py-2 rounded-xl outline-none w-30 lg:w-48"
          />
          <button
            onClick={handleCall}
            disabled={loading}
            className={`px-4 py-2 text-sm rounded-xl ${
              loading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {loading ? "Calling..." : "Make Call"}
          </button>

          <input
            className="bg-gray-700 text-sm text-white px-3 py-2 rounded-xl outline-none w-30 lg:w-48"
            type="string"
            placeholder="enter the url for recording "
            onChange={(e) => setrecorder(e.target.value)}
          ></input>

          <button
            onClick={() => fetchTranscript()}
            className="px-1 rounded-xl bg-violet-500 py-2"
          >
            Transcribe
          </button>
        </div>

        <CallStatus callSid={sid} />
      </div>

      {/* Dialpad for small screens */}
      {showDialPad && (
        <div
          onClick={() => setShowDialPad(false)}
          className="fixed inset-0 z-50 flex justify-center items-center md:hidden bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#2e2e44]/90 p-4 rounded-2xl w-72 flex flex-col items-center border border-purple-700 shadow-lg"
          >
            {/* Number Display and Delete Button */}
            <div className="w-full bg-gray-800 text-white text-xl px-4 py-2 rounded-lg mb-4 flex justify-between items-center">
              <span className="truncate">{number || "Enter Number"}</span>
              <button
                onClick={() => setNumber((prev) => prev.slice(0, -1))}
                className="ml-3 text-red-300 hover:text-red-500"
              >
                ⌫
              </button>
            </div>

            {/* Dial Pad Grid */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
                (digit) => (
                  <button
                    key={digit}
                    onClick={() => handleNumberInput(digit)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-lg shadow-md"
                  >
                    {digit}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}
