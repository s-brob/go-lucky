"use client"

import React, { useState } from "react";
import "./styles.css";

type Answer = number | null;

// PERMA-Profiler (structure): domains with placeholder/paraphrased items.
// NOTE: Use licensed official items in production. These are representative placeholders.
const PERMA_ITEMS: { domain: string; items: { id: string; text: string }[] }[] = [
  {
    domain: "Positive Emotion",
    items: [
      { id: "p1", text: "I felt cheerful and content" },
      { id: "p2", text: "I experienced positive feelings recently" },
    ],
  },
  {
    domain: "Engagement",
    items: [
      { id: "e1", text: "I was absorbed in activities I enjoy" },
      { id: "e2", text: "I felt interested and focused" },
    ],
  },
  {
    domain: "Relationships",
    items: [
      { id: "r1", text: "I felt close to others" },
      { id: "r2", text: "I had supportive social connections" },
    ],
  },
  {
    domain: "Meaning",
    items: [
      { id: "m1", text: "My life felt meaningful" },
      { id: "m2", text: "I felt that what I do matters" },
    ],
  },
  {
    domain: "Accomplishment",
    items: [
      { id: "a1", text: "I achieved things that are important to me" },
      { id: "a2", text: "I felt capable and competent" },
    ],
  },
];

const SCALE = [0, 1, 2, 3, 4];

// Flatten for navigation; keep track of domain mapping
const FLAT_ITEMS = PERMA_ITEMS.flatMap((d) => d.items.map((it) => ({ ...it, domain: d.domain })));

// Content mapping for daily tasks based on dosage
const DAILY_TASK_CONTENT = {
  Rest: {
    title: "Grounding",
    task: "Touch a textured object for 60 seconds.",
  },
  Grow: {
    title: "Reflection",
    task: "Write down one thing you are tolerating today.",
  },
  Challenge: {
    title: "Action",
    task: "Send that one email you have been avoiding.",
  },
} as const;

type Dosage = keyof typeof DAILY_TASK_CONTENT;

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>(Object.fromEntries(FLAT_ITEMS.map((it) => [it.id, null])));
  const [submitted, setSubmitted] = useState(false);
  const [selectedDosage, setSelectedDosage] = useState<Dosage>("Grow");

  const setAnswer = (id: string, value: number) => {
    setAnswers((s) => ({ ...s, [id]: value }));
  };

  const next = () => {
    if (step < FLAT_ITEMS.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const complete = () => {
    setSubmitted(true);
  };

  const answeredValues = Object.values(answers).map((v) => v ?? 0);
  const totalScore = answeredValues.reduce((a, b) => a + b, 0);
  const max = FLAT_ITEMS.length * Math.max(...SCALE);
  const pct = Math.round((totalScore / max) * 100);

  // compute per-domain averages and percentages
  const domainScores: { domain: string; sum: number; count: number; pct: number }[] = PERMA_ITEMS.map((d) => {
    const ids = d.items.map((it) => it.id);
    const vals = ids.map((id) => answers[id] ?? 0);
    const sum = vals.reduce((a, b) => a + b, 0);
    const count = vals.length;
    const pct = Math.round((sum / (count * Math.max(...SCALE))) * 100);
    return { domain: d.domain, sum, count, pct };
  });

  const interpretation = (p: number) => {
    if (p >= 75) return "High";
    if (p >= 50) return "Moderate";
    if (p >= 25) return "Low";
    return "Very Low";
  };

  const current = FLAT_ITEMS[step];

  return (
    <div className="survey-root">
      <div className="spatial-scene" aria-hidden>
        <div className="orb orb--a" />
        <div className="orb orb--b" />
        <div className="orb orb--c" />
      </div>

      <div className="survey-card" role="application" aria-label="PERMA Profiler survey">
        <header className="survey-header">
          <h1 className="survey-title">PERMA Profiler — Quick Check</h1>
          <p className="survey-sub">A brief PERMA-Profiler style check-in. Items are placeholders.</p>
        </header>

        {!submitted ? (
          <main className="survey-main">
            <div className="progress">
              <div className="progress-bar" style={{ width: `${((step + 1) / FLAT_ITEMS.length) * 100}%` }} />
            </div>

            <div className="question">
              <p className="q-count">{step + 1} / {FLAT_ITEMS.length} — <span style={{color:'var(--muted)'}}>{current.domain}</span></p>
              <h2 className="q-text">{current.text}</h2>

              <div className="scale">
                {SCALE.map((v) => (
                  <button
                    key={v}
                    className={`scale-btn ${answers[current.id] === v ? "active" : ""}`}
                    onClick={() => setAnswer(current.id, v)}
                    aria-pressed={answers[current.id] === v}
                  >
                    <span className="scale-label">{v}</span>
                  </button>
                ))}
              </div>

              <div className="actions">
                <button className="ghost" onClick={prev} disabled={step === 0}>Back</button>
                {step < FLAT_ITEMS.length - 1 ? (
                  <button className="primary" onClick={next} disabled={answers[current.id] === null}>Next</button>
                ) : (
                  <button className="primary" onClick={complete} disabled={answers[current.id] === null}>See Results</button>
                )}
              </div>
            </div>
          </main>
        ) : (
          <main className="survey-main results">
            <div className="result-card">
              <h2 className="result-score">Total {totalScore} / {max}</h2>
              <p className="result-pct">Overall {pct}% — {interpretation(pct)}</p>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
                {domainScores.map((d) => (
                  <div key={d.domain} style={{padding:10,background:'rgba(255,255,255,0.02)',borderRadius:8}}>
                    <strong>{d.domain}</strong>
                    <div style={{height:8,background:'rgba(255,255,255,0.03)',borderRadius:999,marginTop:8,overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${d.pct}%`,background:'linear-gradient(90deg,var(--accent), #5bd3e6)'}} />
                    </div>
                    <div style={{fontSize:13,color:'var(--muted)',marginTop:6}}>{d.pct}% — {interpretation(d.pct)}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:14}}>
                <button className="ghost" onClick={() => { setSubmitted(false); setStep(0); }}>Review</button>
                <button className="primary" onClick={() => alert(JSON.stringify({ totalScore, pct, domainScores }, null, 2))} style={{marginLeft:10}}>Export</button>
              </div>
            </div>

            <div className="result-card" style={{marginTop:20}}>
              <h3 style={{margin:0,fontSize:18,marginBottom:16}}>Daily Task</h3>
              <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:20}}>
                {(Object.keys(DAILY_TASK_CONTENT) as Dosage[]).map((dosage) => (
                  <button
                    key={dosage}
                    className={selectedDosage === dosage ? "primary" : "ghost"}
                    onClick={() => setSelectedDosage(dosage)}
                    style={{flex:1,maxWidth:140}}
                  >
                    {dosage}
                  </button>
                ))}
              </div>
              <div style={{textAlign:'left',padding:'16px 20px',background:'rgba(255,255,255,0.02)',borderRadius:10}}>
                <h4 style={{margin:0,fontSize:16,color:'var(--accent)',marginBottom:8}}>
                  {DAILY_TASK_CONTENT[selectedDosage].title}
                </h4>
                <p style={{margin:0,color:'var(--muted)',fontSize:14}}>
                  {DAILY_TASK_CONTENT[selectedDosage].task}
                </p>
              </div>
            </div>

            <div className="detail-note">This prototype shows PERMA domains with paraphrased placeholders. Replace with licensed PERMA-Profiler items for production use.</div>
          </main>
        )}

      </div>
    </div>
  );
}
