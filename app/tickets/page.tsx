"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import StarField from "../components/Starfield";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: "open" | "resolved";
  resolved: boolean;
  createdAt: string;
  resolvedAt?: string;
  customerName: string;
  createdBy: string;
}

const TicketPage: React.FC = () => {
  const { user } = useUser();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [form, setForm] = useState<{ title: string; description: string; customerName: string; createdBy: string }>({
    title: "",
    description: "",
    customerName: "",
    createdBy: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleCreateTicket = () => {
    if (!form.title || !form.description || !form.customerName || !form.createdBy) {
      alert("Please fill out all fields!");
      return;
    }

    const newTicket: Ticket = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      status: "open",
      resolved: false,
      createdAt: new Date().toLocaleString(),
      customerName: form.customerName,
      createdBy: form.createdBy
    };

    setTickets([newTicket, ...tickets]);
    setForm({ title: "", description: "", customerName: "", createdBy: "" });
    setShowForm(false);
  };

  const markAsResolved = (id: number) => {
    setTickets(tickets.map(ticket =>
      ticket.id === id
        ? { ...ticket, resolved: true, status: "resolved", resolvedAt: new Date().toLocaleString() }
        : ticket
    ));
  };

  const closeTicket = (id: number) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;

    if (!ticket.resolved) {
      alert("You must mark the ticket as resolved before closing it.");
      return;
    }

    setTickets(tickets.filter(t => t.id !== id));
    if (selectedTicket?.id === id) setSelectedTicket(null);
  };

  return (
    <div>

      <div className="flex md:hidden">
        <Sidebar user={{ username: (user && user.username) || "Guest" }} />
      </div>

      <div className="min-h-screen bg-gray-900 p-6 text-white relative">
        <h1 className="text-3xl font-bold mb-8">🎫 Call Center Ticketing System</h1>

        {/* Centered Ticket List */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold">📋 Ticket List</h2>
            {tickets.length === 0 ? (
              <p className="text-gray-400 mt-4">No tickets created yet.</p>
            ) : (
              <div className="space-y-4 mt-4">
                {tickets.map(ticket => (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowForm(false);
                    }}
                    className="p-4 bg-gray-800 rounded border border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-700"
                  >
                    <div>
                      <h3 className="text-base font-medium">{ticket.title}</h3>
                      <p className="text-gray-400 text-xs">Customer: {ticket.customerName}</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        ticket.resolved
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-300"
                      }`}
                    >
                      {ticket.resolved ? "Resolved" : "Open"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Button - Always Sharp */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setSelectedTicket(null);
          }}
          className={`fixed bottom-6 right-6 z-30 w-14 h-14 text-2xl flex items-center justify-center rounded-full ${
            showForm ? "bg-red-500 hover:bg-red-600" : "bg-violet-500 hover:bg-violet-600"
          } transition`}
        >
          {showForm ? "×" : "+"}
        </button>

        {/* Create Ticket Modal */}
        {showForm && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-20">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-lg">
              <h2 className="text-lg font-semibold mb-4">Create New Ticket</h2>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Enter Issue Title"
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <textarea
                  placeholder="Describe the Issue"
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Created By (Agent Name)"
                  className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                  value={form.createdBy}
                  onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
                />
                <button
                  onClick={handleCreateTicket}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                >
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-20">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 w-full max-w-lg">
              <button
                className="text-gray-400 hover:text-white text-sm mb-4"
                onClick={() => setSelectedTicket(null)}
              >
                Close ✖️
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedTicket.title}</h2>
              <p className="text-gray-400 mb-2">
                Status:
                <span className={`ml-2 ${
                  selectedTicket.resolved ? "text-green-400" : "text-yellow-300"
                }`}>
                  {selectedTicket.status.toUpperCase()}
                </span>
              </p>
              <p className="mb-4">{selectedTicket.description}</p>
              <ul className="text-sm space-y-1 text-gray-300">
                <li><strong>Customer:</strong> {selectedTicket.customerName}</li>
                <li><strong>Created By:</strong> {selectedTicket.createdBy}</li>
                <li><strong>Created At:</strong> {selectedTicket.createdAt}</li>
                {selectedTicket.resolvedAt && (
                  <li><strong>Resolved At:</strong> {selectedTicket.resolvedAt}</li>
                )}
              </ul>

              {!selectedTicket.resolved && (
                <button
                  onClick={() =>{ markAsResolved(selectedTicket.id);setSelectedTicket(null)}}
                  className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                >
                  Mark as Resolved
                </button>
              )}
              <button
                onClick={() => {closeTicket(selectedTicket.id);setSelectedTicket(null)}}
                className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Close Ticket
              </button>
            </div>
          </div>
        )}
      </div>
      <StarField/>
    </div>
  );
};

export default TicketPage;
