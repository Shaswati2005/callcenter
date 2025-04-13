"use client";

import { useEffect, useState } from "react";

interface Props {
  callSid: string;
}

export default function CallStatus({ callSid }: Props) {
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/twilio-status");
        if (res.status != 200) return;
        const text = await res.text();
        console.log("Raw response text:", text);
        try {
          const data = JSON.parse(text);
          console.log("Parsed JSON:", data);
          if (data?.status) setStatus(data.status);
        } catch (err) {
          console.error("Failed to parse JSON:", err);
        }
      } catch (error: any) {
        console.log("Network error:", error.message);
      }
    };
    fetchStatus();

    // Initial fetch

    const interval = setInterval(fetchStatus, 4000); // Poll every 4 seconds

    return () => clearInterval(interval); // Cleanup
  }, [callSid]);

  return (
    <div className="text-white bg-purple-600 px-4 py-2 rounded-xl flex gap-3">
      <p className="font-semibold">Call Status:</p>
      <p className="h-fit">{status}</p>
    </div>
  );
}
