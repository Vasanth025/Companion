import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineBookOpen,
  HiOutlinePencilSquare,
  HiOutlineArrowRight,
  HiOutlineCalendar
} from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ completed: 0, total: 0, notesCount: 0, diaryCount: 0 });

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      if (!token) return;
      try {
        const [todosRes, notesRes, diaryRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_API_URL}/api/todo/get`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/notes/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/diary/getall`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        let completedCount = 0;
        let totalCount = 0;
        let totalNotes = 0;
        let totalDiary = 0;

        if (todosRes.status === "fulfilled" && todosRes.value.data?.todos) {
          const todosList = todosRes.value.data.todos;
          totalCount = todosList.length;
          completedCount = todosList.filter((t: any) => t.completed).length;
        }

        if (notesRes.status === "fulfilled" && notesRes.value.data?.notes) {
          totalNotes = notesRes.value.data.notes.length;
        }

        if (diaryRes.status === "fulfilled" && diaryRes.value.data?.diaryEntries) {
          totalDiary = diaryRes.value.data.diaryEntries.length;
        }

        setStats({
          completed: completedCount,
          total: totalCount,
          notesCount: totalNotes,
          diaryCount: totalDiary,
        });
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchDashboardSummary();
  }, [token]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const pendingTasks = Math.max(0, stats.total - stats.completed);

  const modules = [
    {
      name: "Task Manager",
      desc: "Manage tasks, set due dates & track task completion.",
      icon: <HiOutlineClipboardDocumentList size={22} className="text-[#841DED]" />,
      bg: "bg-[#F3ECFF]",
      path: "/todos",
      stat: `${pendingTasks} Pending Tasks`,
    },
    {
      name: "Notes",
      desc: "Organize ideas, pin notes & search through categories.",
      icon: <HiOutlineBookOpen size={22} className="text-blue-600" />,
      bg: "bg-blue-50",
      path: "/notes",
      stat: `${stats.notesCount} Saved Notes`,
    },
    {
      name: "Diary",
      desc: "Track daily moods, reflect on thoughts & record entries.",
      icon: <HiOutlinePencilSquare size={22} className="text-emerald-600" />,
      bg: "bg-emerald-50",
      path: "/diary",
      stat: `${stats.diaryCount} Journal Entries`,
    },
    {
      name: "Relax & Games",
      desc: "Guided box breathing timer & mindful memory game.",
      icon: <IoGameControllerOutline size={22} className="text-amber-600" />,
      bg: "bg-amber-50",
      path: "/games",
      stat: "Mindfulness Tools",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Minimal Header */}
      <section className="rounded-2xl bg-[#F3ECFF]/60 p-8 border border-purple-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#841DED] bg-white/80 px-3 py-1 rounded-md w-fit border border-purple-100">
            <HiOutlineCalendar size={14} /> {currentDateStr}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F1B2D]">
            {getGreeting()},{" "}
            <span className="text-[#841DED]">
              {user?.name || "Friend"}
            </span>
          </h1>

          <p className="text-gray-600 text-sm max-w-xl">
            {pendingTasks > 0
              ? `You have ${pendingTasks} tasks pending today. Ready to get work done?`
              : "Welcome to your companion workspace! Select a module below to get started."}
          </p>
        </div>
      </section>

      {/* Workspace Modules Grid */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#1F1B2D]">Workspace Modules</h2>
          <p className="text-xs text-gray-500">Select a tool to open your workspace</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modules.map((m) => (
            <div
              key={m.name}
              onClick={() => navigate(m.path)}
              className="group rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#841DED] hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-4 ${m.bg}`}>
                  {m.icon}
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#841DED] transition-colors">
                  {m.name}
                </h3>

                <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">{m.stat}</span>
                <span className="text-xs font-semibold text-[#841DED] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Open <HiOutlineArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Relaxation Card */}
      <section className="rounded-2xl bg-white border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#841DED]">
            <span>🧘</span> Mindfulness Break
          </div>
          <h3 className="text-lg font-bold text-gray-900">Need a mental breather?</h3>
          <p className="text-gray-500 text-xs max-w-xl">
            Take a 4-4-4 box breathing session or play a quick memory match game.
          </p>
        </div>

        <button
          onClick={() => navigate("/games")}
          className="rounded-xl bg-[#841DED] text-white px-5 py-2.5 font-semibold text-xs hover:bg-[#7418D9] transition cursor-pointer flex-shrink-0"
        >
          Start Breathing Break
        </button>
      </section>

    </div>
  );
};

export default Home;