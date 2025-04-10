"use client";

import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { callLogs } from "./data"; // Import from your shared data file

type CallLog = {
  id: string;
  caller: string;
  callee: string;
  duration: string;
  timestamp: string;
  status: "completed" | "missed" | "ongoing";
};

const CallLogs = () => {
  const [logs] = useState<CallLog[]>(
    callLogs.map(({ id, caller, callee, duration, timestamp, status }) => ({
      id,
      caller,
      callee,
      duration,
      timestamp,
      status: status as "completed" | "missed" | "ongoing",
    }))
  );

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white px-8 py-10">
      <h1 className="text-2xl font-semibold mb-6">📞 Call Logs</h1>
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
        <div className="grid grid-cols-5 font-medium text-sm uppercase border-b border-gray-700 px-6 py-3 text-gray-400">
          <span>Caller</span>
          <span>Callee</span>
          <span>Duration</span>
          <span>Time</span>
          <span>Status</span>
        </div>

        {logs.map((log) => (
          <Link
            href={`/calls/${log.id}`}
            key={log.id}
            className="grid grid-cols-5 items-center px-6 py-4 border-b border-gray-800 hover:bg-gray-800 transition"
          >
            <div className="flex items-center gap-2">
              <FiPhone className="text-purple-400" />
              <span>{log.caller}</span>
            </div>
            <span>{log.callee}</span>
            <span>{log.duration}</span>
            <span>{log.timestamp}</span>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  log.status === "completed"
                    ? "bg-green-600/20 text-green-400"
                    : log.status === "missed"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-yellow-600/20 text-yellow-300"
                }`}
              >
                {log.status}
              </span>
              <BsThreeDotsVertical className="text-gray-400 hover:text-white cursor-pointer ml-3" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CallLogs;
