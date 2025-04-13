"use client";

import { useState, useEffect } from "react";

type Ticket = {
  id: number;
  title: string;
  description: string;
  created_by: string;
  resolved: boolean;
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    created_by: "",
    resolved: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await fetch("https://april-cohort.onrender.com/tickets/", {
      cache: "no-store",
    });
    const data = await res.json();
    setTickets(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      "https://april-cohort.onrender.com/tickets/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      setForm({ title: "", description: "", created_by: "", resolved: false });
      fetchTickets(); // re-fetch tickets after successful creation
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">🎫 Create Ticket</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 border border-gray-600 rounded-lg p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            rows={4}
            required
          />
          <input
            type="text"
            placeholder="Created By"
            value={form.created_by}
            onChange={(e) => setForm({ ...form, created_by: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white transition"
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <h3 className="text-2xl font-semibold">📋 All Tickets</h3>
        <div className="space-y-4">
          {tickets.length === 0 && <p>No tickets yet.</p>}
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-gray-800 border border-gray-600 rounded-lg p-4"
            >
              <h4 className="text-xl font-bold">{ticket.title}</h4>
              <p className="text-gray-300 mb-2">{ticket.description}</p>
              <p className="text-sm text-gray-400">
                Created by: {ticket.created_by} •{" "}
                {ticket.resolved ? "✅ Resolved" : "❌ Not Resolved"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
