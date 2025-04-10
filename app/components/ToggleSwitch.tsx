"use client";

import { useState } from "react";

export default function ToggleSwitch() {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  return (
    <div className="inline-flex bg-[#2c2f33] p-1 rounded-full">
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          activeTab === "all" ? "bg-black text-white" : "text-gray-400"
        }`}
        onClick={() => setActiveTab("all")}
      >
        All
      </button>
      <button
        className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
          activeTab === "unread" ? "bg-black text-white" : "text-gray-400"
        }`}
        onClick={() => setActiveTab("unread")}
      >
        Unread
      </button>
    </div>
  );
}
