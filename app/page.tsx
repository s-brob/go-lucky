"use client"

import React, { useState } from "react";
import { LayoutGrid, PieChart, BookOpen, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import "./styles.css";

type TabType = 'today' | 'wheel' | 'library';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [dosage, setDosage] = useState(50);
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="home-root">
      <div className="spatial-scene" aria-hidden="true">
        <div className="orb orb--a" />
        <div className="orb orb--b" />
        <div className="orb orb--c" />
      </div>
      
      <div className="home-container">
        {/* Main Content Area with bottom padding */}
        <main className="home-main">
          {/* Conditional Rendering Based on Active Tab */}
          {activeTab === 'today' && (
            <>
              {/* Hero Card */}
              <div className="home-hero">
                <h1 className="home-title">
                  Good Day
                </h1>
                <p className="home-subtitle">
                  Track your wellbeing with intention
                </p>
              </div>

              {/* Dosage Slider Card */}
              <div className="home-card">
                <div className="dosage-header">
                  <label htmlFor="dosage" className="dosage-label">
                    Today&apos;s Dosage
                  </label>
                  <span className="dosage-value">
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
                  className="dosage-slider"
                  style={{
                    background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${dosage}%, rgba(255,255,255,0.08) ${dosage}%, rgba(255,255,255,0.08) 100%)`
                  }}
                />
                <div className="dosage-range">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Hero Insight Card */}
              <div className="home-card progress-card">
                <h2 className="card-title">
                  Your Progress
                </h2>
                <p className="card-text">
                  You&apos;re maintaining a steady pace. Small, consistent steps lead to meaningful change.
                </p>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${dosage}%` }}
                  />
                </div>
              </div>

              {/* Survey CTA */}
              <div className="cta-container">
                <button
                  onClick={() => router.push('/survey')}
                  className="primary"
                >
                  Take PERMA Survey
                </button>
              </div>
            </>
          )}

          {activeTab === 'wheel' && (
            <div className="tab-placeholder">
              <p>
                Your Wellbeing Wheel is generating...
              </p>
            </div>
          )}

          {activeTab === 'library' && (
            <div className="tab-placeholder">
              <p>
                Your Saved Resources.
              </p>
            </div>
          )}
        </main>

        {/* Voice Overlay - Floating Action Button */}
        <button
          onClick={() => setIsRecording(!isRecording)}
          className="voice-button"
          aria-label="Voice input"
        >
          <Mic className={`voice-icon ${isRecording ? 'recording' : ''}`} />
        </button>

        {/* Bottom Navigation Bar */}
        <nav className="home-nav">
          <div className="nav-container">
            {/* Today Tab */}
            <button
              onClick={() => setActiveTab('today')}
              className={`nav-button ${activeTab === 'today' ? 'active' : ''}`}
              aria-label="Today"
              aria-current={activeTab === 'today' ? 'page' : undefined}
            >
              <LayoutGrid className="nav-icon" />
              <span className="nav-label">Today</span>
            </button>

            {/* My Wheel Tab */}
            <button
              onClick={() => setActiveTab('wheel')}
              className={`nav-button ${activeTab === 'wheel' ? 'active' : ''}`}
              aria-label="My Wheel"
              aria-current={activeTab === 'wheel' ? 'page' : undefined}
            >
              <PieChart className="nav-icon" />
              <span className="nav-label">My Wheel</span>
            </button>

            {/* Library Tab */}
            <button
              onClick={() => setActiveTab('library')}
              className={`nav-button ${activeTab === 'library' ? 'active' : ''}`}
              aria-label="Library"
              aria-current={activeTab === 'library' ? 'page' : undefined}
            >
              <BookOpen className="nav-icon" />
              <span className="nav-label">Library</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
