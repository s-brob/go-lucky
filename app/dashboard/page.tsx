"use client"

import React, { useState } from "react";

interface DosageEntry {
  id: string;
  activity: string;
  duration: number; // in minutes
  timestamp: Date;
  completed: boolean;
}

const getInitialDosageLog = (): DosageEntry[] => {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 3600000);
  
  return [
    {
      id: "1",
      activity: "Morning Meditation",
      duration: 10,
      timestamp: now,
      completed: true,
    },
    {
      id: "2",
      activity: "Gratitude Journal",
      duration: 5,
      timestamp: oneHourAgo,
      completed: true,
    },
    {
      id: "3",
      activity: "Evening Reflection",
      duration: 15,
      timestamp: now,
      completed: false,
    },
  ];
};

export default function Dashboard() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [dosageLog, setDosageLog] = useState<DosageEntry[]>(getInitialDosageLog);

  const completedToday = dosageLog.filter((entry) => entry.completed).length;
  const totalMinutes = dosageLog
    .filter((entry) => entry.completed)
    .reduce((sum, entry) => sum + entry.duration, 0);
  const completionRate = Math.round((completedToday / dosageLog.length) * 100);

  const toggleActivity = (id: string) => {
    setDosageLog((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, completed: !entry.completed } : entry
      )
    );
  };

  const startBreathingExercise = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Wellness Dashboard</h1>
          <p className="text-slate-400">Track your daily wellness activities</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-slate-400 mb-2">Completed Today</div>
            <div className="text-3xl font-bold">{completedToday}</div>
            <div className="text-sm text-slate-500 mt-1">
              of {dosageLog.length} activities
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-slate-400 mb-2">Total Time</div>
            <div className="text-3xl font-bold">{totalMinutes} min</div>
            <div className="text-sm text-slate-500 mt-1">spent on wellness</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="text-sm text-slate-400 mb-2">Completion Rate</div>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="h-2 bg-slate-700 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Today&apos;s Activities</h2>
          <div className="space-y-4">
            {dosageLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleActivity(entry.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      entry.completed
                        ? "bg-teal-500 border-teal-500"
                        : "border-slate-500"
                    }`}
                  >
                    {entry.completed && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <div>
                    <div
                      className={`font-medium ${
                        entry.completed ? "text-slate-400 line-through" : ""
                      }`}
                    >
                      {entry.activity}
                    </div>
                    <div className="text-sm text-slate-500">
                      {entry.duration} minutes
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-500">
                  {entry.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breathing Exercise Button */}
        <div className="flex justify-center">
          <button
            onClick={startBreathingExercise}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Start Breathing Exercise
          </button>
        </div>
      </div>

      {/* Breathing Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="text-center">
            {/* Breathing Circle with Tailwind animate-pulse */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute w-64 h-64 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-30 animate-pulse" />
              <div className="absolute w-48 h-48 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-50 animate-pulse" />
              <div className="relative w-32 h-32 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full shadow-2xl animate-pulse" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Breathe</h2>
            <p className="text-xl text-slate-300 mb-8">
              Inhale slowly... Hold... Exhale gently
            </p>

            <button
              onClick={closeOverlay}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
