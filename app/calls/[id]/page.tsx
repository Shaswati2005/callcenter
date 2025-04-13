import { notFound } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import StarField from "@/app/components/Starfield";

type Call = {
  id: number;
  caller_number: string;
  callee_number?: string;
  call_duration: string;
  avg_sentiment: string;
  audio_link: string;
  transcript: string;
};

export default async function CallPage({ params }: { params: { id: string } }) {
  // Fetch all call data from the backend
  const res = await fetch(
    `https://april-cohort.onrender.com/calls/+19412057703`,
    {
      cache: "no-store", // disables caching during development
    }
  );

  if (!res.ok) {
    return notFound();
  }

  const data: Call[] = await res.json();

  // Find the specific call by ID
  const call = data.find((c) => c.id.toString() === params.id);

  if (!call) return notFound();

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-600 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Call Details</h2>
          <a
            href={call.audio_link}
            download
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            <FiDownload /> Download Recording
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-400">Caller</p>
            <p className="text-lg">{call.caller_number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Callee</p>
            <p className="text-lg">{call.callee_number || "Unknown"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Call Duration</p>
            <p className="text-lg">{call.call_duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Sentiment</p>
            <p className="text-lg">{call.avg_sentiment}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4">📝 Transcription</h3>
        <div className="space-y-3 text-sm leading-relaxed bg-gray-700 px-4 py-3 rounded-md border border-gray-600 max-h-[400px] overflow-y-scroll">
          {call.transcript
            .split(". ")
            .filter(Boolean)
            .map((line, index) => (
              <p key={index} className="border-b border-gray-600 pb-2">
                {line.trim()}
              </p>
            ))}
        </div>
      </div>
      <StarField />
    </div>
  );
}
