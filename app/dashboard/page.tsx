"use client"


import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const Dashboard = () => {
  const barData = [
    { name: "Service", value: 2564 },
    { name: "Handling Time", value: 5564 },
    { name: "Call Rate", value: 64000 },
    { name: "Hold Time", value: 2164 }
  ];

  const lineData = [
    { name: "Sat", value: 20 },
    { name: "Sun", value: 60 },
    { name: "Mon", value: 45 },
    { name: "Tue", value: 75 },
    { name: "Wed", value: 90 },
    { name: "Thu", value: 55 },
    { name: "Fri", value: 85 }
  ];

  const satisfactionData = [
    { name: "Sat", value: 10 },
    { name: "Sun", value: 20 },
    { name: "Mon", value: 30 },
    { name: "Tue", value: 50 },
    { name: "Wed", value: 70 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 100 }
  ];

  const outageAlerts = [
    {
      status: "In Progress",
      trigger: "deanna.curtis@example.com",
      connector: "Adaxa Suite",
      connection: "willie.jennings@example.com",
      category: "Credit Memo",
      date: "Dec 4, 2019 21:42"
    },
    {
      status: "Closed",
      trigger: "kenzi.lawson@example.com",
      connector: "metasfresh",
      connection: "felicia.reid@example.com",
      category: "Sales Receipt",
      date: "Dec 30, 2019 07:52"
    },
    {
      status: "On hold",
      trigger: "jessica.hanson@example.com",
      connector: "SQL-Ledger",
      connection: "jackson.graham@example.com",
      category: "Estimate",
      date: "Dec 30, 2019 05:18"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f4fa] text-[#1c1c2b] px-4 py-8 md:px-10 lg:px-20 relative">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[#6a4fc3] mb-10 text-center"
      >
        📞 Call Center Performance Dashboard
      </motion.h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {barData.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gradient-to-br from-[#dcd0ff] to-[#e0e7ff] p-6 text-center shadow-lg border border-[#d0cfff]"
          >
            <p className="text-lg font-semibold text-[#6a4fc3] mb-2">{item.name}</p>
            <p className="text-2xl font-bold text-[#1c1c2b]">{item.value.toLocaleString()}</p>
            <div className="h-2 mt-4 bg-[#c4bfff] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#a29bfe] to-[#6c5ce7] animate-pulse"
                style={{ width: `${Math.min(item.value / 100, 100)}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Agent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#eae4ff] to-[#f1f4ff] p-6 rounded-3xl shadow-md border border-[#dad6ff]"
        >
          <h3 className="text-xl font-semibold text-[#6a4fc3] mb-4">Agent Performance Alerts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lineData}>
              <XAxis dataKey="name" stroke="#6a4fc3" />
              <YAxis stroke="#6a4fc3" />
              <Tooltip />
              <Bar dataKey="value" fill="#a29bfe" radius={[10, 10, 0, 0]} />
              <Line type="monotone" dataKey="value" stroke="#00cec9" strokeWidth={2} dot={{ r: 5 }} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Customer Satisfaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#eae4ff] to-[#f1f4ff] p-6 rounded-3xl shadow-md border border-[#dad6ff]"
        >
          <h3 className="text-xl font-semibold text-[#6a4fc3] mb-4">Service Quality Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionData}>
              <XAxis dataKey="name" stroke="#6a4fc3" />
              <YAxis stroke="#6a4fc3" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00cec9" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Scrollable System Outage Alerts Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-[#f1f0ff] to-[#f7f8ff] p-6 rounded-3xl shadow-md border border-[#e4e4f0] max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#a29bfe] scrollbar-track-[#f0f0f5]"
      >
        <h3 className="text-xl font-semibold text-[#6a4fc3] mb-4">System Outage Alerts</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[#6a4fc3]">
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
              <tr key={index} className="border-t border-[#eee]">
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

      {/* Sparkle BG */}
      <img
        src="/sparkle-bg.svg"
        alt="Background sparkles"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none z-0"
      />
    </div>
  );
};

export default Dashboard;
