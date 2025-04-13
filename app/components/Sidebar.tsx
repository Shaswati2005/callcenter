import { useState } from "react";
import {
  FiHome,
  FiActivity,
  FiAlertCircle,
  FiList,
  FiMenu,
  FiX,
  FiMessageCircle,
} from "react-icons/fi";
import Link from "next/link";
import { UserButton, SignOutButton } from "@clerk/nextjs";
import { FileTextIcon } from "lucide-react";

interface SidebarProps {
  user: {
    username: string;
  };
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Nav Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          className="text-[#a29bfe] text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-[#1e1e2f] border-[#2e2e3e] p-4 md:p-6 md:w-64 w-full md:h-screen md:sticky md:top-0 gap-6 md:gap-8 md:border-r border-b md:border-b-0 fixed z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "top-14" : "-top-full"
        } md:top-0 flex flex-col`}
      >
        <div className="flex justify-between items-center md:block">
          <h2 className="text-2xl font-bold text-[#a29bfe]">Elite Support</h2>
          <div className="md:hidden mt-2">
            <SignOutButton />
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          className={`flex flex-col gap-4 ${
            isOpen ? "block" : "hidden"
          } md:flex`}
        >
          <span className="flex items-center gap-3 text-[#a29bfe]">
            <UserButton />
            <span className="hidden md:inline">{user?.username}</span>
          </span>

          <Link href={"/dashboard"}
          className="flex items-center gap-2 text-[#a29bfe] hover:text-white">
            <FiHome size={20} /> <span>Overview</span>
          </Link>
          <Link href={"/dashboard"}
           className="flex items-center gap-2 text-[#a29bfe] hover:text-white">
            <FiActivity size={20} /> <span>Performance</span>
          </Link>
          <Link
            href="/alerts"
            className="flex items-center gap-2 text-[#a29bfe] hover:text-white"
          >
            <FiAlertCircle size={20} /> <span>Alerts</span>
          </Link>
          <Link
            href="/calls"
            className="flex items-center gap-2 text-[#a29bfe] hover:text-white"
          >
            <FiList size={20} /> <span>Call Logs</span>
          </Link>
          <Link
            href="/tickets"
            className="flex items-center gap-2 text-[#a29bfe] hover:text-white"
          >
            <FileTextIcon size={20} /> <span>Tickets</span>
          </Link>
          <Link
            href="/send-message"
            className="flex items-center gap-2 text-[#a29bfe] hover:text-white"
          >
            <FiMessageCircle size={20} /> <span>Send Message</span>
          </Link>
        </nav>

        {/* Sign Out Button for large screens */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 translate-x-[-50%]">
          <SignOutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
