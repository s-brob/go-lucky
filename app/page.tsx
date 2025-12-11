"use client"

import { useState } from "react";
import { Play } from "lucide-react";

type Dosage = "low" | "medium" | "high";

interface TaskState {
  title: string;
  description: string;
}

const TASK_STATES: Record<Dosage, TaskState> = {
  low: {
    title: "Gentle Breathing",
    description: "Take a moment to breathe deeply and center yourself. A calm start for low energy.",
  },
  medium: {
    title: "Light Walk",
    description: "A brief stroll to refresh your mind and body. Perfect for moderate energy levels.",
  },
  high: {
    title: "Energizing Exercise",
    description: "Time for an active session to channel your energy productively.",
  },
};

export default function Dashboard() {
  const [selectedDosage, setSelectedDosage] = useState<Dosage>("medium");
  const currentTask = TASK_STATES[selectedDosage];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl text-stone-800 font-medium">
          Good evening. How is your energy?
        </h1>
      </div>

      {/* Segmented Control */}
      <div className="mb-12">
        <div 
          className="relative flex bg-stone-300/30 rounded-full p-1.5"
          style={{
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Active indicator background */}
          <div
            className="absolute top-1.5 bottom-1.5 bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
            style={{
              width: 'calc(33.333% - 6px)',
              left: selectedDosage === "low" ? '6px' : selectedDosage === "medium" ? 'calc(33.333% + 2px)' : 'calc(66.666% - 2px)',
            }}
          />
          
          {/* Buttons */}
          {(["low", "medium", "high"] as Dosage[]).map((dosage) => (
            <button
              key={dosage}
              onClick={() => setSelectedDosage(dosage)}
              className="relative z-10 px-8 py-2.5 text-sm font-medium transition-colors duration-300 capitalize"
              style={{
                color: selectedDosage === dosage ? '#1c1917' : '#78716c',
              }}
            >
              {dosage}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Card */}
      <div 
        className="bg-white rounded-3xl shadow-sm p-8 w-full max-w-md transition-all duration-500 ease-in-out"
        key={selectedDosage}
        style={{
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Play Button */}
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer">
            <Play className="w-10 h-10 text-stone-800 fill-stone-800" />
          </div>

          {/* Task Content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-stone-800">
              {currentTask.title}
            </h2>
            <p className="text-stone-500 leading-relaxed">
              {currentTask.description}
            </p>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
