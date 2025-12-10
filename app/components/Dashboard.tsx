"use client"

import { useState } from "react";

type DosageType = 'rest' | 'grow' | 'challenge';

export default function Dashboard() {
  const [dosage, setDosage] = useState<DosageType>('rest');

  const getDosageLabel = (dosageValue: DosageType): string => {
    const labels: Record<DosageType, string> = {
      rest: 'Rest (Low)',
      grow: 'Grow (Medium)',
      challenge: 'Challenge (High)'
    };
    return labels[dosageValue];
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Dashboard
          </h1>
          
          <div className="w-full max-w-md">
            <h2 className="text-xl font-medium mb-4 text-black dark:text-zinc-50">
              Select Your Dosage Level
            </h2>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setDosage('rest')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  dosage === 'rest'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-black dark:text-zinc-50">Rest (Low)</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Take it easy</div>
                </div>
              </button>
              
              <button
                onClick={() => setDosage('grow')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  dosage === 'grow'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-black dark:text-zinc-50">Grow (Medium)</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Steady progress</div>
                </div>
              </button>
              
              <button
                onClick={() => setDosage('challenge')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  dosage === 'challenge'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-black dark:text-zinc-50">Challenge (High)</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Push yourself</div>
                </div>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Current Dosage: <span className="font-semibold text-black dark:text-zinc-50">{getDosageLabel(dosage)}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
