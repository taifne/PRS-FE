"use client";

import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import { getCookie } from "cookies-next";
import { useAllPunchesForUser, useCreatePunch } from "../../../hooks/usePunch";
const PunchPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf("month"));
  const [error, setError] = useState<string | null>(null);
  const [isPunching, setIsPunching] = useState(false);
  const { mutate: punchNow } = useCreatePunch();
  const userId = getCookie("userId")?.toString();
  const { data: punches } = useAllPunchesForUser(userId ?? "");
  const daysInMonth = useMemo(() => {
    const days = [];
    const start = selectedMonth.startOf("month");
    const end = selectedMonth.endOf("month");

    for (
      let date = start;
      date.isBefore(end) || date.isSame(end, "day");
      date = date.add(1, "day")
    ) {
      days.push(date.clone());
    }
    return days;
  }, [selectedMonth]);

  const getPunchForDate = (date: string) =>
    punches?.find((p) => dayjs(p.date).isSame(date, "day"));

  const isOffHour = (time: string, type: "start" | "end") => {
    const hour = dayjs(time).hour();
    return type === "start" ? hour > 8 : hour < 17;
  };

  return (
    <div className="max-w-8xl mx-auto p-4">
     

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
<div className="w-full flex flex-row">
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => setSelectedMonth(selectedMonth.subtract(1, "month"))}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          ←
        </button>
        <input
          type="month"
          value={selectedMonth.format("YYYY-MM")}
          onChange={(e) => setSelectedMonth(dayjs(e.target.value))}
          className="border p-2 rounded"
        />
        <button
          onClick={() => setSelectedMonth(selectedMonth.add(1, "month"))}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          →
        </button>
        <button
          onClick={() => setSelectedMonth(dayjs())}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Today
        </button>
      </div>
      <div className="mb-6">
        <button
          onClick={async () => {
            setIsPunching(true);
            setError(null);
            try {
              await punchNow(userId ?? "");
              // Consider adding data refresh logic here
            } catch (err) {
              setError("Failed to record punch. Please try again.");
            } finally {
              setIsPunching(false);
            }
          }}
          disabled={isPunching}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPunching ? (
            <div className="flex items-center justify-evenly">
              <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Punching...
            </div>
          ) : (
            "Punch"
          )}
        </button>
      </div>
</div>
      {/* Punch Button */}


      {/* Month Navigation */}


      {/* Days List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {daysInMonth.map((day) => {
          const punch = getPunchForDate(day.format("YYYY-MM-DD"));
          const isStartOff =
            punch?.firstPunchIn && isOffHour(punch.firstPunchIn, "start");
          const isEndOff =
            punch?.lastPunchOut && isOffHour(punch.lastPunchOut, "end");
          const isToday = day.isSame(dayjs(), "day");
          const isWeekend = day.day() === 0 || day.day() === 6;

          return (
            <div
            key={day.toString()}
            className={`flex justify-between items-center border p-3 rounded-lg shadow-sm transition-all
              ${isToday ? "border-blue-500 border-2 bg-blue-50" : "bg-white"}
              ${isWeekend ? "bg-gray-50" : ""}
            `}
          >
            {/* Date & Label */}
            <div className="flex items-center w-1/3">
              <span className="font-semibold text-gray-800">
                {day.format("ddd, MMM D")}
              </span>
              {isToday && (
                <span className="ml-3 text-xs font-medium bg-blue-500 text-white px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </div>
          
            {/* Start & End Times */}
            <div className="flex flex-col items-center w-1/3 text-sm text-gray-700">
              <div className="flex gap-6">
                <span className={isStartOff ? "text-red-500" : ""}>
                  Start: {punch?.firstPunchIn ? dayjs(punch.firstPunchIn).format("HH:mm") : "--"}
                </span>
                <span className={isEndOff ? "text-red-500" : ""}>
                  End: {punch?.lastPunchOut ? dayjs(punch.lastPunchOut).format("HH:mm") : "--"}
                </span>
              </div>
            </div>
          
            {/* Duration */}
            <div className="w-1/3 text-right text-sm text-gray-500">
              {punch?.firstPunchIn && punch?.lastPunchOut && (
                <span>
                  {dayjs(punch.lastPunchOut)
                    .diff(dayjs(punch.firstPunchIn), "hour", true)
                    .toFixed(1)}
                  h
                </span>
              )}
            </div>
          </div>
          
          );
        })}
      </div>

      {/* Empty State */}
      {!daysInMonth.some((day) =>
        getPunchForDate(day.format("YYYY-MM-DD"))
      ) && (
        <div className="text-gray-500 italic mt-4">
          No punches recorded for this month.
        </div>
      )}

      {/* Total Hours */}
      <div className="mt-4 font-bold">
        Total Hours:{" "}
        {daysInMonth
          .reduce((total, day) => {
            const punch = getPunchForDate(day.format("YYYY-MM-DD"));
            if (punch?.firstPunchIn && punch?.lastPunchOut) {
              return (
                total +
                dayjs(punch.lastPunchOut).diff(
                  dayjs(punch.firstPunchIn),
                  "hour",
                  true
                )
              );
            }
            return total;
          }, 0)
          .toFixed(1)}
        h
      </div>
    </div>
  );
};

export default PunchPage;
