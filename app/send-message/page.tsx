"use client";

import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Contact = {
  name: string;
  phone: string;
};

export default function SendWhatsapp() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [contactList] = useState<Contact[]>([
    { name: "Bidyendu Das", phone: "+918018108430" },
    { name: "Jane Smith", phone: "+0987654321" },
  ]);

  const handleSendMessage = async (contact: Contact) => {
    if (!phoneNumber || !message) {
      toast.error("Please enter a valid phone number and message.");
      return;
    }

    try {
      const response = await axios.post(
        "https://e7b7-171-48-110-91.ngrok-free.app/send-whatsapp",
        {
          to: contact.phone,
          message: message,
        }
      );
      if (response.status === 200) {
        toast.success("Message sent successfully!!");
        console.log(response.data.sid);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("error sending message");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="bg-zinc-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Send WhatsApp Message
        </h2>

        {/* Contact list */}
        <div className="mb-4">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Select Contact
          </label>
          <select
            id="contact"
            className="w-full bg-zinc-700 border border-zinc-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          >
            <option value="" disabled>
              Select a contact
            </option>
            {contactList.map((contact, index) => (
              <option key={index} value={contact.phone}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>

        {/* Message box */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full bg-zinc-700 border border-zinc-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Send button */}
        <div className="flex justify-center">
          <button
            onClick={() =>
              handleSendMessage({
                name: "Selected Contact",
                phone: phoneNumber,
              })
            }
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white py-2 px-6 rounded-full font-medium shadow-md"
          >
            Send Message
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
