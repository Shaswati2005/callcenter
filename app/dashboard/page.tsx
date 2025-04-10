"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FiHome, FiActivity, FiAlertCircle } from "react-icons/fi";

import LiveTranscript from "../components/LiveTranscript";
import { useState } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { user } = useUser();

  const barData = [
    { name: "Service", value: 2564 },
    { name: "Handling Time", value: 5564 },
    { name: "Call Rate", value: 64000 },
    { name: "Hold Time", value: 2164 },
  ];

  const lineData = [
    { name: "Sat", value: 20 },
    { name: "Sun", value: 60 },
    { name: "Mon", value: 45 },
    { name: "Tue", value: 75 },
    { name: "Wed", value: 90 },
    { name: "Thu", value: 55 },
    { name: "Fri", value: 85 },
  ];

  const satisfactionData = [
    { name: "Sat", value: 10 },
    { name: "Sun", value: 20 },
    { name: "Mon", value: 30 },
    { name: "Tue", value: 50 },
    { name: "Wed", value: 70 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 100 },
  ];

  const outageAlerts = [
    {
      status: "In Progress",
      trigger: "deanna.curtis@example.com",
      connector: "Adaxa Suite",
      connection: "willie.jennings@example.com",
      category: "Credit Memo",
      date: "Dec 4, 2019 21:42",
    },
    {
      status: "Closed",
      trigger: "kenzi.lawson@example.com",
      connector: "metasfresh",
      connection: "felicia.reid@example.com",
      category: "Sales Receipt",
      date: "Dec 30, 2019 07:52",
    },
    {
      status: "On hold",
      trigger: "jessica.hanson@example.com",
      connector: "SQL-Ledger",
      connection: "jackson.graham@example.com",
      category: "Estimate",
      date: "Dec 30, 2019 05:18",
    },
  ];

  return (
    <div className="flex relative h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1e2f] border-r border-[#2e2e3e] p-6 flex flex-col  gap-8 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold text-[#a29bfe]">📊 Elite Support</h2>
        <nav className="flex flex-col gap-4">
          <span className="flex w-full justify-start gap-4 items-center">
            <UserButton />
            {user?.username}
          </span>
          <button className="flex items-center gap-3 pl-1.5 text-[#a29bfe] hover:text-white">
            <FiHome /> Overview
          </button>
          <button className="flex items-center gap-3 text-[#a29bfe] pl-1.5 hover:text-white">
            <FiActivity /> Performance
          </button>
          <button className="flex items-center gap-3 text-[#a29bfe] pl-1.5 hover:text-white">
            <FiAlertCircle /> Alerts
          </button>
        </nav>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-8 overflow-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-[#a29bfe] mb-10"
        >
          📞 Call Center Performance
        </motion.h1>
        <LiveTranscript />
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {barData.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-[#1c1c2b] p-6 text-center shadow-lg border border-[#2a2a40]"
            >
              <p className="text-lg font-semibold text-[#a29bfe] mb-2">
                {item.name}
              </p>
              <p className="text-2xl font-bold text-white">
                {item.value.toLocaleString()}
              </p>
              <div className="h-2 mt-4 bg-[#2a2a40] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#a29bfe] to-[#6c5ce7] animate-pulse"
                  style={{ width: `${Math.min(item.value / 100, 100)}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1c1c2b] p-6 rounded-3xl shadow-md border border-[#2a2a40]"
          >
            <h3 className="text-xl font-semibold text-[#a29bfe] mb-4">
              Agent Performance Alerts
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lineData}>
                <XAxis dataKey="name" stroke="#a29bfe" />
                <YAxis stroke="#a29bfe" />
                <Tooltip />
                <Bar dataKey="value" fill="#a29bfe" radius={[10, 10, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00cec9"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#1c1c2b] p-6 rounded-3xl shadow-md border border-[#2a2a40]"
          >
            <h3 className="text-xl font-semibold text-[#a29bfe] mb-4">
              Service Quality Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData}>
                <XAxis dataKey="name" stroke="#a29bfe" />
                <YAxis stroke="#a29bfe" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00cec9"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Outage Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1c1c2b] p-6 rounded-3xl shadow-md border border-[#2a2a40] max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#a29bfe] scrollbar-track-[#1e1e2f]"
        >
          <h3 className="text-xl font-semibold text-[#a29bfe] mb-4">
            System Outage Alerts
          </h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[#a29bfe]">
                <th>Status</th>
                <th>Trigger</th>
                <th>Connector</th>
                <th>Connection</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {outageAlerts.map((alert, index) => (
                <tr key={index} className="border-t border-[#2e2e3e]">
                  <td className="py-2 text-[#6c5ce7]">{alert.status}</td>
                  <td>{alert.trigger}</td>
                  <td>{alert.connector}</td>
                  <td>{alert.connection}</td>
                  <td>{alert.category}</td>
                  <td>{alert.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
      <div className="absolute bottom-0">
        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
