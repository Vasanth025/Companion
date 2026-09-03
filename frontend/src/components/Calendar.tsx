import React from "react";

type CalendarProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  entries: any[];
};

const Calendar = ({ selectedDate, onDateSelect, entries }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const hasEntry = (day: number) => {
    const checkDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return entries.some((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getDate() === day &&
        entryDate.getMonth() === currentMonth.getMonth() &&
        entryDate.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    onDateSelect(new Date());
  };

  return (
    <div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          ‹
        </button>
        <div className="text-center">
          <h3 className="font-semibold text-[#1F1B2D]">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          ›
        </button>
      </div>

      {/* Today Button */}
      <button
        onClick={goToToday}
        className="w-full mb-4 rounded-lg bg-[#F3ECFF] px-4 py-2 text-sm font-medium text-[#841DED] hover:bg-[#E8D8FF] transition"
      >
        Today
      </button>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-[#7C748E]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before the first day of the month */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const entryExists = hasEntry(day);
          const dayIsSelected = isSelected(day);
          const dayIsToday = isToday(day);

          return (
            <button
              key={day}
              onClick={() =>
                onDateSelect(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  )
                )
              }
              className={`relative p-2 rounded-lg text-sm font-medium transition
                ${
                  dayIsSelected
                    ? "bg-[#841DED] text-white"
                    : "hover:bg-gray-100 text-[#1F1B2D]"
                }`}
            >
              {day}
              {entryExists && (
                <div
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    dayIsSelected ? "bg-white" : "bg-[#841DED]"
                  }`}
                />
              )}
              {dayIsToday && !dayIsSelected && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#841DED]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
