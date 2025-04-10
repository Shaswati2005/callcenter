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
        const res = await fetch(`/api/check-call-status?sid=${callSid}`);
        const data = await res.json();
        setStatus(data.status);
      } catch (err) {
        console.error("Failed to fetch call status:", err);
      }
    };

    fetchStatus(); // Initial fetch

    const interval = setInterval(fetchStatus, 8000); // Every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [callSid]);

  return (
    <div className="text-white bg-purple-600 px-4 py-2 rounded-xl flex gap-3">
      <p className="font-semibold">Call Status:</p>
      <p className="h-fit">{status || "Checking.."}</p>
    </div>
  );
}
