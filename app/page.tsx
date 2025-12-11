"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isListening && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [isListening]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsListening(true)}
        className="fixed bottom-8 right-6 h-16 w-16 rounded-full bg-stone-800 text-white shadow-xl flex items-center justify-center hover:bg-stone-700 transition-colors"
        aria-label="Open Voice Sanctuary"
      >
        <Mic size={24} />
      </button>

      {/* Sanctuary Overlay (Modal) */}
      {isListening && (
        <div
          ref={overlayRef}
          onClick={() => setIsListening(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsListening(false);
          }}
          tabIndex={0}
          className="fixed inset-0 backdrop-blur-md bg-stone-900/60 flex items-center justify-center cursor-pointer"
          aria-label="Voice Sanctuary Overlay"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Breathing Circle Animation */}
            <div
              className="h-32 w-32 rounded-full bg-white animate-pulse"
              aria-hidden="true"
            />
            {/* Listening Text */}
            <p className="text-white text-2xl font-light">I&apos;m listening...</p>
          </div>
        </div>
      )}
    </div>
  );
}
