// app/call-logs/[id]/page.tsx
import { notFound } from "next/navigation";
import { callLogs } from "../data"; // wherever your dummy data is stored
import { FC } from "react";
import { FiDownload } from "react-icons/fi";
import StarField from "@/app/components/Starfield";

interface CallPageProps {
  params: { id: string };
}

const CallPage = ({ params }: CallPageProps) => {
  const call = callLogs.find((c) => c.id === params.id);

  if (!call) return notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold"> Call Details</h2>
          <a
            href={call.recordingUrl}
            download
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            <FiDownload /> Download Recording
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-400">Caller</p>
            <p className="text-lg">{call.caller}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Callee</p>
            <p className="text-lg">{call.callee}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Call Duration</p>
            <p className="text-lg">{call.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Timestamp</p>
            <p className="text-lg">{call.timestamp}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Status</p>
            <p className="text-lg capitalize">{call.status}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">📝 Transcription</h3>
        <div className="space-y-3 text-sm leading-relaxed bg-gray-700 px-4 py-3 rounded-md border border-gray-600 max-h-[400px] overflow-y-scroll">
          {call.transcription.map((line, index) => (
            <p key={index} className="border-b border-gray-600 pb-2">
              {line}
            </p>
          ))}
        </div>
      </div>
      <StarField />
    </div>
  );
};

export default CallPage;
