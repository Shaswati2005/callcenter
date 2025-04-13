"use client";

import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { callLogs } from "./data"; // Import from your shared data file
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import StarField from "../components/Starfield";


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

  const { user, isLoaded } = useUser();

  return (
    <>
      <div className=" flex md:hidden  ">
        <Sidebar user={{ username: (user && user.username) || "Guest" }} />
      </div>

      <div className="w-full min-h-screen bg-gray-950 text-white px-8 py-10">
        <h1 className="text-2xl font-semibold mb-6">📞 Call Logs</h1>
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 w-full">
          <div className="flex flex-row w-full items-center justify-between gap-10  font-medium text-sm uppercase border-b border-gray-700 px-6 py-3 text-gray-400">
            <span>Caller</span>
            <span>Callee</span>
            <span className="hidden md:flex">Duration</span>
            <span className="hidden md:flex">Time</span>
            <span>Status</span>
          </div>

          {logs.map((log) => (
            <Link
              href={`/calls/${log.id}`}
              key={log.id}
              className="flex flex-row justify-between items-center  px-6 py-4 border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-2">
                <FiPhone className="text-purple-400" />
                <span>{log.caller}</span>
              </div>
              <span>{log.callee}</span>
              <span className="hidden md:flex">{log.duration}</span>
              <span className="hidden md:flex">{log.timestamp}</span>
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
      <StarField/>
    </>
  );
};

export default CallLogs;
