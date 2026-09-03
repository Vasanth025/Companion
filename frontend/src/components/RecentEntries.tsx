import React from "react";

type RecentEntriesProps = {
  entries: any[];
  onEntrySelect: (entry: any) => void;
};

const moodEmojis: { [key: string]: string } = {
  Happy: "😊",
  Sad: "😢",
  Neutral: "😐",
  Angry: "😠",
  Fearful: "😨",
  Surprised: "😲",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RecentEntries = ({ entries, onEntrySelect }: RecentEntriesProps) => {
  const sortedEntries = [...entries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (sortedEntries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#7C748E]">No entries yet</p>
        <p className="text-sm text-[#7C748E] mt-1">
          Start writing your first diary entry
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedEntries.map((entry) => (
        <button
          key={entry._id}
          onClick={() => onEntrySelect(entry)}
          className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-[#F3ECFF] transition"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-[#1F1B2D] text-sm">
                {entry.title}
              </h4>
              <p className="text-xs text-[#7C748E] mt-1">
                {formatDate(entry.date)}
              </p>
            </div>
            <span className="text-xl">
              {moodEmojis[entry.mood] || "😐"}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RecentEntries;
