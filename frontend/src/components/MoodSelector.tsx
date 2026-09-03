// import React from "react";

type MoodSelectorProps = {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
};

const moods = [
  { name: "Happy", emoji: "😊", color: "bg-green-100 text-green-600" },
  { name: "Sad", emoji: "😢", color: "bg-blue-100 text-blue-600" },
  { name: "Neutral", emoji: "😐", color: "bg-gray-100 text-gray-600" },
  { name: "Angry", emoji: "😠", color: "bg-red-100 text-red-600" },
  { name: "Fearful", emoji: "😨", color: "bg-purple-100 text-purple-600" },
  { name: "Surprised", emoji: "😲", color: "bg-yellow-100 text-yellow-600" },
];

const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="flex flex-nowrap gap-2 pt-2 overflow-x-auto pb-2">
      {moods.map((mood) => (
        <button
          key={mood.name}
          onClick={() => onMoodSelect(mood.name)}
          className={`flex items-center gap-2 rounded-full px-4 py-2 transition whitespace-nowrap flex-shrink-0
            ${
              selectedMood === mood.name
                ? `${mood.color} ring-2 ring-offset-2 ring-[#841DED]`
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
        >
          <span className="text-xl">{mood.emoji}</span>
          <span className="font-medium text-sm">{mood.name}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
