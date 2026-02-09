import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Sparkles,
  Loader2,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";

import Chat from "./Chat";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setUser({
          username: res.data.username,
          email: res.data.email,
        });
        setLoading(false);
      } catch (err) {
        console.error("Auth error", err);
        navigate("/");
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] bg-slate-100 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 hidden lg:flex flex-col bg-white border-r">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <h2 className="text-xl font-bold">Techwagera</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === "overview"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500"
            }`}
          >
            <LayoutDashboard size={20} /> Overview
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
              activeTab === "chat"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500"
            }`}
          >
            <MessageSquare size={20} /> AI Assistant
          </button>
        </nav>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-slate-400 hover:text-rose-600 font-bold"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col bg-white lg:m-3 lg:rounded-[2rem] shadow-xl overflow-hidden">
        <header className="h-16 flex justify-between items-center px-8 border-b">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {activeTab}
          </span>
          <span className="font-bold">{user.username}</span>
        </header>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <OverviewSection user={user} key="overview" />
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <Chat />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ---------------- OVERVIEW ---------------- */

function OverviewSection({ user }) {
  const stats = [
    {
      label: "AI Requests",
      value: "1,284",
      icon: <Zap size={20} />,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Security",
      value: "Active",
      icon: <ShieldCheck size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Uptime",
      value: "99.9%",
      icon: <Clock size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 max-w-5xl mx-auto space-y-8"
    >
      <h1 className="text-4xl font-black">
        Hi, <span className="text-indigo-600">{user.username}</span>
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border shadow-sm">
            <div
              className={`${s.bg} ${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}
            >
              {s.icon}
            </div>
            <p className="text-xs font-bold uppercase text-slate-400">
              {s.label}
            </p>
            <h3 className="text-2xl font-bold">{s.value}</h3>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
