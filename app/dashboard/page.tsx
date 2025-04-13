"use client";

import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { FiHome, FiActivity, FiAlertCircle, FiList } from "react-icons/fi";
import Transcript from "../components/Transcript";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import StarField from "../components/Starfield";


const Dashboard = () => {
 

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


  const { user, isLoaded } = useUser();

  return (
    <div className="flex relative h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <Sidebar user={{ username: (user && user.username) || "Guest" }} />



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
        <Transcript />
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
              Agent Performance
            </h3>
            <h5 className="text-md font-medium text-[#a29bfe] mb-2">
              number of calls per day
            </h5>
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
            <h3 className="text-xl font-semibold text-[#a29bfe] mb-2">
              Service Quality Trend
            </h3>
            <h5 className="text-md font-medium text-[#a29bfe] mb-2">
              Lower score means negative sentiment
            </h5>
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

       
        <div className="opacity-30">
          <StarField />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
