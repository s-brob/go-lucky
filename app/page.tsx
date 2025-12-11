"use client"

import React, { useState } from "react";
import { LayoutGrid, PieChart, BookOpen, Mic } from "lucide-react";

type TabType = 'today' | 'wheel' | 'library';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [dosage, setDosage] = useState(50);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 font-sans">
      <div className="relative w-full max-w-md min-h-screen bg-white">
        {/* Main Content Area with bottom padding */}
        <main className="pb-24 px-6 pt-8">
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === 'today' && (
            <>
              {/* Hero Card */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-stone-800 mb-2">
                  Good Day
                </h1>
                <p className="text-stone-600 text-sm">
                  Track your wellbeing with intention
                </p>
              </div>

              {/* Dosage Slider Card */}
              <div className="bg-stone-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="dosage" className="text-sm font-medium text-stone-700">
                    Today&apos;s Dosage
                  </label>
                  <span className="text-2xl font-semibold text-stone-800">
                    {dosage}%
                  </span>
                </div>
                <input
                  id="dosage"
                  type="range"
                  min="0"
                  max="100"
                  value={dosage}
                  onChange={(e) => setDosage(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-full appearance-none cursor-pointer accent-stone-600"
                  style={{
                    background: `linear-gradient(to right, #57534e 0%, #57534e ${dosage}%, #e7e5e4 ${dosage}%, #e7e5e4 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-xs text-stone-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Hero Insight Card */}
              <div className="bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl p-6 border border-stone-200">
                <h2 className="text-lg font-medium text-stone-800 mb-2">
                  Your Progress
                </h2>
                <p className="text-stone-600 text-sm mb-4">
                  You&apos;re maintaining a steady pace. Small, consistent steps lead to meaningful change.
                </p>
                <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-stone-600 rounded-full transition-all duration-300"
                    style={{ width: `${dosage}%` }}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'wheel' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-stone-600 text-center text-lg">
                Your Wellbeing Wheel is generating...
              </p>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-stone-600 text-center text-lg">
                Your Saved Resources.
              </p>
            </div>
          )}
        </main>

        {/* Voice Overlay - Floating Action Button */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className="fixed bottom-28 right-6 w-14 h-14 bg-stone-600 hover:bg-stone-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-10"
          aria-label="Voice input"
        >
          <Mic className={`w-6 h-6 ${isRecording ? 'animate-pulse' : ''}`} />
        </button>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur border-t border-stone-100">
          <div className="flex items-center justify-around px-6 py-4">
            {/* Today Tab */}
            <button
              onClick={() => setActiveTab('today')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'today' ? 'text-stone-800' : 'text-stone-400'
              }`}
              aria-label="Today"
              aria-current={activeTab === 'today' ? 'page' : undefined}
            >
              <LayoutGrid className="w-6 h-6" />
              <span className="text-xs font-medium">Today</span>
            </button>

            {/* My Wheel Tab */}
            <button
              onClick={() => setActiveTab('wheel')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'wheel' ? 'text-stone-800' : 'text-stone-400'
              }`}
              aria-label="My Wheel"
              aria-current={activeTab === 'wheel' ? 'page' : undefined}
            >
              <PieChart className="w-6 h-6" />
              <span className="text-xs font-medium">My Wheel</span>
            </button>

            {/* Library Tab */}
            <button
              onClick={() => setActiveTab('library')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'library' ? 'text-stone-800' : 'text-stone-400'
              }`}
              aria-label="Library"
              aria-current={activeTab === 'library' ? 'page' : undefined}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs font-medium">Library</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
