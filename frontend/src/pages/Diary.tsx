import React from "react";
import axios from "axios";
import { HiOutlineCalendar, HiOutlineFire, HiOutlineCheck, HiOutlineTrash } from "react-icons/hi2";
import Calendar from "../components/Calendar";
import MoodSelector from "../components/MoodSelector";
import RecentEntries from "../components/RecentEntries";
import { toast } from "react-toastify";

type DiaryEntry = {
  _id: string;
  title: string;
  content: string;
  mood: string;
  tags: string[];
  date: string;
  createdAt: string;
  updatedAt: string;
};

const Diary = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [entries, setEntries] = React.useState<DiaryEntry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentEntry, setCurrentEntry] = React.useState<DiaryEntry | null>(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [mood, setMood] = React.useState("Neutral");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");

  const fetchEntries = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/diary/getall`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        setEntries(data.diaryEntries);
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);

  React.useEffect(() => {
    // Check if there's an entry for the selected date
    const entryForDate = entries.find((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getDate() === selectedDate.getDate() &&
        entryDate.getMonth() === selectedDate.getMonth() &&
        entryDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (entryForDate) {
      setCurrentEntry(entryForDate);
      setTitle(entryForDate.title);
      setContent(entryForDate.content);
      setMood(entryForDate.mood);
      setTags(entryForDate.tags);
    } else {
      setCurrentEntry(null);
      setTitle("");
      setContent("");
      setMood("Neutral");
      setTags([]);
    }
  }, [selectedDate, entries]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSaveEntry = async () => {
    try {
      const entryData = {
        title,
        content,
        mood,
        tags,
        date: selectedDate.toISOString(),
      };

      if (currentEntry) {
        // Update existing entry
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/diary/edit/${currentEntry._id}`,
          entryData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.status === 200) {
          await fetchEntries();
          toast.success("Entry updated successfully!");
        }
      } else {
        // Create new entry
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/diary/create`,
          entryData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (data.status === 201) {
          await fetchEntries();
          toast.success("Entry created successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving diary entry:", error);
    }
  };

  const handleDeleteEntry = async () => {
    if (!currentEntry) return;
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/diary/delete/${currentEntry._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.status === 200) {
        await fetchEntries();
        setCurrentEntry(null);
        toast.success("Entry deleted successfully!");
        setTitle("");
        setContent("");
        setMood("Neutral");
        setTags([]);
      }
    } catch (error) {
      console.error("Error deleting diary entry:", error);
    }
  };

  const calculateStreak = () => {
    if (entries.length === 0) return 0;

    const sortedEntries = [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F1B2D]">Diary</h1>
          <p className="mt-2 text-[#7C748E]">Track your thoughts and emotions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Entry Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#1F1B2D]">
                  {currentEntry ? "Edit Entry" : "New Entry"}
                </h2>
                <div className="text-sm text-[#7C748E]">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Mood Selector */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-[#1F1B2D]">
                  How are you feeling?
                </label>
                <MoodSelector selectedMood={mood} onMoodSelect={setMood} />
              </div>

              {/* Title */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none"
                  placeholder="Enter entry title..."
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-[#841DED] focus:outline-none resize-none"
                  rows={12}
                  placeholder="Write your thoughts..."
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-[#1F1B2D]">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2 focus:border-[#841DED] focus:outline-none"
                    placeholder="Add tags..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="rounded-xl bg-gradient-to-r from-[#841DED] to-[#7418D9] px-4 py-2 text-white font-medium hover:from-[#7418D9] hover:to-[#6416C7] shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-[#F3ECFF] px-3 py-1 text-sm text-[#841DED]"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 transition"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveEntry}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#841DED] to-[#7418D9] px-6 py-3 text-white font-semibold hover:from-[#7418D9] hover:to-[#6416C7] shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <HiOutlineCheck size={20} />
                  {currentEntry ? "Update Entry" : "Save Entry"}
                </button>
                {currentEntry && (
                  <button
                    onClick={handleDeleteEntry}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 px-6 py-3 text-red-500 font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                  >
                    <HiOutlineTrash size={20} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCalendar size={24} className="text-[#841DED]" />
                <h2 className="text-lg font-semibold text-[#1F1B2D]">Calendar</h2>
              </div>
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                entries={entries}
              />
            </div>

            {/* Current Streak */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineFire size={24} className="text-orange-500" />
                <h2 className="text-lg font-semibold text-[#1F1B2D]">Current Streak</h2>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-500">{streak}</p>
                <p className="mt-2 text-[#7C748E]">days</p>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1F1B2D] mb-4">
                Recent Entries
              </h2>
              <RecentEntries
                entries={entries}
                onEntrySelect={(entry) => {
                  setSelectedDate(new Date(entry.date));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
