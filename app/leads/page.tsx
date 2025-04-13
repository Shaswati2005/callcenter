"use client"


import React, { useState } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import { div } from "framer-motion/client";


interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  createdAt: string;
  createdBy: string;
}

const LeadsPage: React.FC = () => {
  const [newleads,setnewleads] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<Omit<Lead, 'id' | 'createdAt' | 'status'>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    createdBy: ""
  });

  const handleCreateLead = () => {
    if (!form.name || !form.email || !form.phone || !form.company || !form.createdBy) {
      alert("Please fill out all fields!");
      return;
    }

    setnewleads(!newleads);

    const newLead: Lead = {
      id: Date.now(),
      ...form,
      status: "New",
      createdAt: new Date().toLocaleString()
    };

    setLeads([newLead, ...leads]);
    setForm({ name: "", email: "", phone: "", company: "", createdBy: "" });
  };

  const updateLeadStatus = (id: number, newStatus: Lead["status"]) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    ));
    setSelectedLead(null); // Auto-close after status change
  };

  const { user, isLoaded } = useUser();


  return (
    <>
    <div className=" flex md:hidden  ">
      <Sidebar user={{ username: (user && user.username) || "Guest" }} />


        
      </div>



    <div className={`min-h-screen bg-gray-900 p-6  text-white ${newleads? `backdrop:blur-lg`:``}`}>
      <h1 className="text-3xl font-bold mb-8">📈 Leads Management</h1>

      <div className={`flex flex-col lg:flex-row gap-6 h-full `}>
        
       

        {/* Leads List */}
        <div className="lg:w-full bg-gray-800 rounded-xl p-4 border border-gray-700">
          <h2 className="text-lg font-semibold">Lead List</h2>
          {leads.length === 0 ? (
            <p className="text-gray-400 mt-4">No leads created yet.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {leads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="p-4 bg-gray-800 rounded border border-gray-700 flex justify-between items-center cursor-pointer hover:bg-gray-700"
                >
                  <div>
                    <h3 className="text-base font-medium">{lead.name}</h3>
                    <p className="text-gray-400 text-xs">{lead.company}</p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      lead.status === "Closed"
                        ? "bg-green-600/20 text-green-400"
                        : lead.status === "Qualified"
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-yellow-600/20 text-yellow-300"
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        

        {newleads &&
             <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-3xl flex items-center justify-center">
                
             <div className="lg:w-1/2 bg-gray-800 rounded-xl h-fit p-4 border border-gray-700">
             <h2 className="text-lg font-semibold mb-4">Add New Lead</h2>
             <div className="flex flex-col gap-3">
               <input
                 type="text"
                 placeholder="Full Name"
                 className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                 value={form.name}
                 onChange={(e) => setForm({ ...form, name: e.target.value })}
               />
               <input
                 type="email"
                 placeholder="Email Address"
                 className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                 value={form.email}
                 onChange={(e) => setForm({ ...form, email: e.target.value })}
               />
               <input
                 type="tel"
                 placeholder="Phone Number"
                 className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                 value={form.phone}
                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
               />
               <input
                 type="text"
                 placeholder="Company"
                 className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                 value={form.company}
                 onChange={(e) => setForm({ ...form, company: e.target.value })}
               />
               <input
                 type="text"
                 placeholder="Created By (Agent Name)"
                 className="p-2 rounded bg-gray-900 border border-gray-700 text-white shadow-sm hover:shadow-violet-400"
                 value={form.createdBy}
                 onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
               />
               <button
                 onClick={handleCreateLead}
                 className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
               >
                 Create Lead
               </button>
             </div>
           </div>
             </div>
     
                 }



      </div>

      {/* Lead Details Panel */}
      {selectedLead && (
        <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur-3xl flex items-center justify-center">
            <div className=" sm:w-1/3 h-fit bg-gray-800 shadow-lg border-l rounded-2xl border-gray-700 p-6 overflow-y-auto">
          <button
            className="text-gray-400 hover:text-white text-sm mb-4"
            onClick={() => setSelectedLead(null)}
          >
            Close ✖️
          </button>
          <h2 className="text-2xl font-bold mb-2">{selectedLead.name}</h2>
          <p className="text-gray-400 mb-2">Status: 
            <span className={`ml-2 ${
              selectedLead.status === "Closed"
                ? "text-green-400"
                : selectedLead.status === "Qualified"
                ? "text-blue-400"
                : "text-yellow-300"
            }`}>
              {selectedLead.status}
            </span>
          </p>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><strong>Email:</strong> {selectedLead.email}</li>
            <li><strong>Phone:</strong> {selectedLead.phone}</li>
            <li><strong>Company:</strong> {selectedLead.company}</li>
            <li><strong>Created By:</strong> {selectedLead.createdBy}</li>
            <li><strong>Created At:</strong> {selectedLead.createdAt}</li>
          </ul>

          <div className="mt-6 space-y-2">
            {selectedLead.status !== "Qualified" && (
              <button
                onClick={() => updateLeadStatus(selectedLead.id, "Qualified")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Mark as Qualified
              </button>
            )}
            {selectedLead.status !== "Closed" && (
              <button
                onClick={() => updateLeadStatus(selectedLead.id, "Closed")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Mark as Closed
              </button>
            )}
          </div>
        </div>
        </div>
      )}

      
     <button className={`w-15 h-15 rounded-[100%] ${newleads?`bg-red-500`:`bg-violet-600`} fixed bottom-2 right-2 text-2xl`} onClick={()=>(setnewleads(!newleads))}>
        {newleads? "x":"+"}


     </button>

    </div>
    
    </>
  );
};

export default LeadsPage;
