"use client";

import { FiSearch } from "react-icons/fi";
import StarField from "../components/Starfield";
import ToggleSwitch from "../components/ToggleSwitch";
import { RxDropdownMenu } from "react-icons/rx";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";



const callCenterMessages = [
  "Dead air detected for more than 10 seconds",
  "Customer raised voice or showing frustration",
  "Agent talking over customer",
  'Customer used negative sentiment keywords: "cancel", "bad service", "angry"',
  "Long hold time detected",
  "Customer requested supervisor",
  "Customer mentioned legal action",
  "Repetitive questioning detected",
  "Customer mentioned refund or return",
  "Agent not following script",
  "Sensitive information mentioned (e.g. credit card, SSN)",
  "Low agent volume detected",
  "Technical issue mentioned multiple times",
  "Customer silence after agent question",
  "Profanity or abusive language detected",
  "Customer sounds satisfied",
  'Positive language detected: "thank you", "great service"',
  "Customer changed topic from billing to technical support",
  "Customer asked about: invoice, payment, or account status",
  "Loud environment detected – may affect audio quality",
  'Customer mentioned a location: "New York", "office branch"',
  "Call ongoing for 5 minutes",
  "10-minute mark reached – wrap up if appropriate",
  "Consider offering a discount",
  "Suggest next steps: schedule follow-up",
  "Agent: John D.",
  "Customer: Unnamed (voice recognized)",
  'Possible solution found for keyword "reset password" – suggest KB #124',
  "Supervisor joined silently",
  "This call is being monitored for training",
];



const Page = () => {
  const [search, setSearch] = useState("");
  const { user, isLoaded } = useUser();

  const filteredMessages = callCenterMessages.filter((msg) =>
    msg.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>

<div className=" flex md:hidden  ">
      <Sidebar user={{ username: (user && user.username) || "Guest" }} />


        
      </div>
    <div className="w-screen h-screen flex flex-col items-center justify-start gap-4 bg-black text-white relative overflow-hidden">




      <div className="w-[80%] mt-[100px] relative top-5 z-10">
        <div className="flex items-center justify-between gap-1 md:gap-4 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 shadow-md">
          <ToggleSwitch />
          <div className="flex-1 ml-1  md:ml-4 flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-md border border-gray-600">
            <FiSearch size={18} />
            <input
              type="text"
              placeholder="Search notifications"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-white outline-none w-[50px] md:flex-1 "
            />
          </div>
          <button className="flex items-center gap-2 p-1 md:px-4 md:py-2 bg-gray-700 hover:bg-gray-600 border border-gray-500 rounded-md  text-sm">
            Group By
            <RxDropdownMenu />
          </button>
        </div>
      </div>

      <div className="flex-1 w-[80%] bg-gray-800 border border-gray-600 rounded-lg overflow-y-scroll shadow-inner scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
        {filteredMessages.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 px-4 py-3 border-b border-gray-600 hover:bg-gray-700 transition-colors"
          >
            <input type="checkbox" className="accent-purple-500" />
            <Link href={`/alerts/${idx + 1}`} className="hover:underline">
              {item}
            </Link>
          </div>
        ))}
      </div>

      <StarField />
    </div>
    </>
  );
};

export default Page;
