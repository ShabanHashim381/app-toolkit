import { useRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { BsCalendar4Week, BsRepeat } from "react-icons/bs";
import { MdToday, MdOutlineDateRange } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { PiCalendarCheckDuotone } from "react-icons/pi";
import { GoBell } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const daysOfWeek = [
  { label: "Sun", key: 0 },
  { label: "Mon", key: 1 },
  { label: "Tue", key: 2 },
  { label: "Wed", key: 3 },
  { label: "Thu", key: 4 },
  { label: "Fri", key: 5 },
  { label: "Sat", key: 6 },
];

const TodoInput = ({
  text,
  setText,
  inputText,
  showCalendar,
  selectedDueDate,
  setTodoList,
  setInputText,
  setSelectedDueDate,
  setShowDatePicker,
  setShowCalendar,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reminderDropdownOpen, setReminderDropdownOpen] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);
  const [reminderDate, setReminderDate] = useState(null);
  const [repeatDropdownOpen, setRepeatDropdownOpen] = useState(false);
  const [repeatValue, setRepeatValue] = useState(null);
  const [customRepeatDays, setCustomRepeatDays] = useState([]);
  const [showCustomDays, setShowCustomDays] = useState(false);
  const calendarRef = useRef(null);
  const reminderRef = useRef(null);
  const repeatRef = useRef(null);
  const today = new Date();
  const formattedDueDate = () => {
    if (!selectedDueDate) return null;

    const todayDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(todayDate.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(todayDate.getDate() + 7);

    const time = selectedDueDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (selectedDueDate.toDateString() === todayDate.toDateString())
      return `Today ${time}`;
    if (selectedDueDate.toDateString() === tomorrow.toDateString())
      return `Tomorrow ${time}`;
    if (selectedDueDate.toDateString() === nextWeek.toDateString())
      return `Next Week ${time}`;
    return selectedDueDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowCalendar(false);
      }
      if (reminderRef.current && !reminderRef.current.contains(event.target)) {
        setReminderDropdownOpen(false);
        setShowReminderPicker(false);
      }
      if (repeatRef.current && !repeatRef.current.contains(event.target)) {
        setRepeatDropdownOpen(false);
        setShowCustomDays(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setRelativeDate = (days, hours = 9, minutes = 0) => {
    const date = new Date();
    date.setDate(today.getDate() + days);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    setSelectedDueDate(date);
    setDropdownOpen(false);
  };

  const setReminder = (days, hours = 9, minutes = 0) => {
    const date = new Date();
    date.setDate(today.getDate() + days);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    setReminderDate(date);
    setReminderDropdownOpen(false);
  };

  const handleAdd = () => {
    if (inputText.trim()) {
      const now = Date.now();
      const newTodo = {
        id: now,
        text: inputText,
        completed: false,
        createdAt: now,
        dueDate: selectedDueDate ? selectedDueDate.getTime() : null,
        reminder: reminderDate ? reminderDate.getTime() : null,
        repeat: repeatValue,
        repeatDays: customRepeatDays,
        favorite: false,
      };
      setTodoList((prev) => [...prev, newTodo]);
      setInputText("");
      setSelectedDueDate(null);
      setShowDatePicker(false);
      setReminderDate(null);
      setRepeatValue(null);
      setCustomRepeatDays([]);
    }
  };

  const formatReminderLabel = () => {
    if (!reminderDate) return null;

    const reminder = new Date(reminderDate);
    const todayDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(todayDate.getDate() + 1);

    const nextWeek = new Date();
    nextWeek.setDate(todayDate.getDate() + 7);

    const time = reminder.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (reminder.toDateString() === todayDate.toDateString())
      return `Today ${time}`;
    if (reminder.toDateString() === tomorrow.toDateString())
      return `Tomorrow ${time}`;
    if (reminder.toDateString() === nextWeek.toDateString())
      return `Next Week ${time}`;
    return reminder.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const toggleDay = (key) => {
    setCustomRepeatDays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  const formatRepeatLabel = () => {
    if (!repeatValue) return null;
    if (repeatValue === "Custom" && customRepeatDays.length > 0) {
      return customRepeatDays.map((d) => daysOfWeek[d].label).join(", ");
    }
    return repeatValue;
  };

  return (
    <div className="mb-4">
      <div className="bg-white shadow-sm border border-gray-200 rounded-t px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center gap-3 flex-1">
          <FiPlus className="text-gray-900" title="Add icon" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task"
            className="w-full outline-none text-sm ml-2 text-gray-900"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>

        <button
          onClick={handleAdd}
          className="text-sm text-gray-500 hover:text-gray-700 ml-3"
        >
          Add
        </button>

        {selectedDueDate && (
          <div className="absolute bottom-[-20px] left-4 text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            {formattedDueDate}
          </div>
        )}
      </div>

      <div className="border-t border-gray-400"></div>

      <div className="bg-gray-50 border-x border-b border-gray-200 rounded-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-500">
          {/* Due Date */}
          <div className="relative" ref={calendarRef}>
            <div className="flex items-center gap-2">
              <BsCalendar4Week
                className="hover:text-blue-500 cursor-pointer"
                title="Pick a due date"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {selectedDueDate && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                  {formattedDueDate()}
                </span>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded shadow-md w-44 z-20">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                  onClick={() => setRelativeDate(0, 17)}
                >
                  <MdToday className="text-gray-500" />
                  Today
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                  onClick={() => setRelativeDate(1, 9)}
                >
                  <MdOutlineDateRange className="text-gray-500" />
                  Tomorrow
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                  onClick={() => setRelativeDate(7, 9)}
                >
                  <LuCalendarDays className="text-gray-500" />
                  Next Week
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                  onClick={() => {
                    setShowCalendar(true);
                    setReminderDropdownOpen(false);
                  }}
                >
                  <BsCalendar4Week className="text-gray-500" />
                  Pick Date
                </button>

                {showCalendar && (
                  <div className="px-4 py-2">
                    <DatePicker
                      selected={selectedDueDate}
                      onChange={(date) => {
                        setSelectedDueDate(date);
                        setShowCalendar(false);
                        setDropdownOpen(false);
                      }}
                      inline
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Reminder */}
          <div className="relative" ref={reminderRef}>
            <div className="flex items-center gap-2">
              <GoBell
                className="hover:text-yellow-500 cursor-pointer"
                onClick={() => setReminderDropdownOpen((prev) => !prev)}
                title="Remind me"
              />
              {reminderDate && (
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                  {formatReminderLabel()}
                </span>
              )}
            </div>

            {reminderDropdownOpen && (
              <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded shadow-md w-56 z-20">
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setReminder(0, 17)}
                >
                  <MdToday className="mr-2 text-gray-500" />
                  Later Today
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setReminder(1, 9)}
                >
                  <LuCalendarDays className="mr-2 text-gray-500" />
                  Tomorrow
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setReminder(7, 9)}
                >
                  <PiCalendarCheckDuotone className="mr-2 text-gray-500" />
                  Next Week
                </button>
                <button
                  className="flex items-center w-full px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => {
                    setShowReminderPicker(true);
                    setReminderDropdownOpen(false);
                  }}
                >
                  <MdOutlineDateRange className="mr-2 text-gray-500" />
                  Pick Date & Time
                </button>
              </div>
            )}

            {showReminderPicker && (
              <div className="absolute left-0 top-[160px] z-30">
                <DatePicker
                  selected={reminderDate}
                  onChange={(date) => {
                    setReminderDate(date);
                    setShowReminderPicker(false);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  inline
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          {/* Repeat */}
          <div className="relative" ref={repeatRef}>
            <div className="flex items-center gap-2">
              <BsRepeat
                className="hover:text-green-500 cursor-pointer"
                onClick={() => setRepeatDropdownOpen((prev) => !prev)}
                title="Repeat"
              />
              {formatRepeatLabel() && (
                <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  {formatRepeatLabel()}
                </span>
              )}
            </div>

            {repeatDropdownOpen && (
              <div className="absolute left-0 top-8 bg-white border border-gray-200 rounded shadow-md w-48 z-30">
                {[
                  {
                    label: "Daily",
                    icon: <BsRepeat className="text-gray-500" />,
                  },
                  {
                    label: "Weekdays",
                    icon: <MdToday className="text-gray-500" />,
                  },
                  {
                    label: "Weekly",
                    icon: <LuCalendarDays className="text-gray-500" />,
                  },
                  {
                    label: "Monthly",
                    icon: <BsCalendar4Week className="text-gray-500" />,
                  },
                  {
                    label: "Yearly",
                    icon: <PiCalendarCheckDuotone className="text-gray-500" />,
                  },
                  {
                    label: "Custom",
                    icon: <GoBell className="text-gray-500" />,
                  },
                ].map(({ label, icon }) => (
                  <button
                    key={label}
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left flex items-center gap-2"
                    onClick={() => {
                      setRepeatValue(label);
                      setShowCustomDays(label === "Custom");
                      if (label !== "Custom") setRepeatDropdownOpen(false);
                    }}
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            )}

            {showCustomDays && (
              <div className="absolute left-0 top-[160px] bg-white border border-gray-300 shadow-md rounded-md p-3 z-40 w-52">
                <div className="grid grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day.key}
                      onClick={() => toggleDay(day.key)}
                      className={`text-xs px-2 py-1 rounded-full ${
                        customRepeatDays.includes(day.key)
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
