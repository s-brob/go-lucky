import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Humanist - Burnout Recovery",
  description: "Your organic sanctuary for burnout recovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        {/* Mobile-centered wrapper with subtle shadow to look like a phone app on desktop */}
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="w-full max-w-md min-h-screen bg-slate-50 shadow-2xl shadow-zinc-900/10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
