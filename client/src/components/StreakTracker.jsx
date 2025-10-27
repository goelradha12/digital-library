import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function StreakTracker({ streakData }) {
  const [showInfo, setShowInfo] = useState(false);

  if (!streakData) return null;

  const { Current_Streak = 0, Longest_Streak = 0, Last_Read_Date = null } = streakData;

  return (
    <div className="bg-white rounded-lg shadow-md px-5 py-4 text-center flex flex-col items-center relative">
      {/* 🔥 Header */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span role="img" aria-label="fire" className="text-xl">
          🔥
        </span>
        <h3 className="text-lg font-semibold text-[#A56F6E]">Reading Streak</h3>

        {/* ℹ️ Info Button */}
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="absolute top-2 right-2 text-gray-500 hover:text-[#A56F6E] transition"
          title="How to improve streak"
        >
          <Info size={16} />
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-6 mb-2">
        <div>
          <p className="text-xl font-bold text-[#A56F6E] leading-tight">{Current_Streak}</p>
          <p className="text-[11px] text-gray-500">Current</p>
        </div>
        <div className="w-px h-6 bg-gray-300" />
        <div>
          <p className="text-xl font-bold text-[#A56F6E] leading-tight">{Longest_Streak}</p>
          <p className="text-[11px] text-gray-500">Longest</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
        <div
          className="h-full bg-[#A56F6E] transition-all duration-500"
          style={{
            width: `${Longest_Streak ? (Current_Streak / Longest_Streak) * 100 : 0}%`,
          }}
        />
      </div>

      {/* Date info */}
      {Last_Read_Date && (
        <p className="text-[10px] text-gray-400">
          Last read:{' '}
          {new Date(Last_Read_Date).toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
          })}
        </p>
      )}

      {/* 🧠 Tooltip / Popup */}
      {showInfo && (
        <div className="absolute top-10 right-2 bg-white border border-gray-200 shadow-xl rounded-lg p-3 text-xs text-gray-700 w-56 z-20 animate-fade-in">
          <p className="text-left">
            📚 <b>Improve your streak</b> by reading at least one page daily.
          </p>
          <ul className="list-disc list-inside mt-2 text-left space-y-1">
            <li>Open and read a book every day</li>
            <li>Even reading 1 page counts!</li>
            <li>Miss a day? Streak resets to 1</li>
          </ul>
          <button
            onClick={() => setShowInfo(false)}
            className="block ml-auto mt-2 text-[#A56F6E] text-xs font-medium hover:underline"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
