import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (module: string) => {

    if(module == "Task Manager")
      navigate("/notes")
    else if(module == "Notes")
      navigate("/notes")
    else if(module == "Diary")
      navigate("/diary")
  }

  return (
    <div className="min-h-screen bg-[#F8F7FC] font-Lato text-[#1F1B2D]">
      <main className="max-w-7xl mx-auto px-8 py-10">

        {/* Hero */}
        <section className="flex items-center justify-between">

          <div>
            <p className="text-sm text-[#7C748E]">
              Wednesday, Oct 24
            </p>

            <h1 className="mt-2 text-6xl font-bold leading-tight">
              Good Morning,{" "}
              <span className="text-[#841DED]">
                Alex
              </span>
            </h1>

            <p className="mt-3 text-lg text-[#7C748E]">
              You have 5 tasks pending for today. Ready to start?
            </p>
          </div>

          <div className="flex gap-5">

            <div className="flex items-center gap-4 rounded-3xl border border-[#ECE8F3] bg-white px-6 py-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                ✅
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  12
                </h2>

                <p className="text-xs uppercase tracking-wider text-[#7C748E]">
                  Completed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl border border-[#ECE8F3] bg-white px-6 py-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-2xl">
                🔥
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  5 Days
                </h2>

                <p className="text-xs uppercase tracking-wider text-[#7C748E]">
                  Streak
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* Modules */}

        <section className="mt-14">

          <h2 className="mb-6 text-2xl font-bold">
            Your Modules
          </h2>

          <div className="grid grid-cols-4 gap-6">

            {["Task Manager", "Notes", "Diary", "Relax"].map((module) => (
              <div
                key={module}
                className="rounded-3xl border border-[#ECE8F3] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                onClick={() => handleNavigate(module)}
              >

                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3ECFF] text-2xl">
                  📦
                </div>

                <h3 className="text-xl font-semibold">
                  {module}
                </h3>

                <p className="mt-2 text-sm text-[#7C748E]">
                  Placeholder description for this module.
                </p>
              </div>
            ))}

          </div>

        </section>

        {/* Bottom Section */}

        <section className="mt-14 grid grid-cols-3 gap-8">

          {/* Schedule */}

          <div className="col-span-2 rounded-3xl border border-[#ECE8F3] bg-white p-8 shadow-sm">

            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Today's Overview
              </h2>

              <button className="font-semibold text-[#841DED]">
                View Full Schedule
              </button>
            </div>

            <div className="space-y-5">

              {[
                {
                  time: "09:00 AM",
                  title: "Team Standup",
                  desc: "Zoom Meeting • 30 mins",
                },
                {
                  time: "11:30 AM",
                  title: "Design Review",
                  desc: "Conference Room",
                },
                {
                  time: "02:00 PM",
                  title: "Focus Time",
                  desc: "Do Not Disturb",
                },
              ].map((item) => (
                <div
                  key={item.time}
                  className="flex items-center justify-between rounded-2xl border border-[#ECE8F3] p-5"
                >
                  <div className="w-24 font-semibold text-[#841DED]">
                    {item.time}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#7C748E]">
                      {item.desc}
                    </p>
                  </div>

                  <button className="rounded-full bg-[#F3ECFF] p-3">
                    🎯
                  </button>
                </div>
              ))}

            </div>

          </div>

          {/* Suggestion */}

          <div className="rounded-3xl border border-[#ECE8F3] bg-gradient-to-br from-[#F3ECFF] to-[#F8F7FC] p-8 shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow-sm">
              🧘
            </div>

            <h2 className="mt-8 text-3xl font-bold">
              Take a breather
            </h2>

            <p className="mt-4 leading-7 text-[#7C748E]">
              You've been productive today.
              Take a five minute meditation break before continuing.
            </p>

            <button className="mt-10 rounded-xl bg-[#841DED] px-8 py-3 font-semibold text-white shadow-lg shadow-[#841DED]/20 transition hover:bg-[#6D18C5]">
              Start Now
            </button>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Home;