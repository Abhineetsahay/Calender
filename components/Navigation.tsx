"use client";

import { useState } from "react";

interface NavigationProps {
  monthName: string;
  year: number;
  onPrevious: () => void;
  onNext: () => void;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

export default function Navigation({
  monthName,
  year,
  onPrevious,
  onNext,
  palette,
  isMobile,
}: NavigationProps) {
  const [hoveredBtn, setHoveredBtn] = useState<"prev" | "next" | null>(null);

  return (
    <div className={`flex items-center justify-center ${isMobile ? "mb-3 gap-2" : "mb-5 gap-6"}`}>
      <button
        onClick={onPrevious}
        aria-label="Previous month"
        className="group w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 font-bold text-lg shadow-md hover:shadow-lg"
        style={{
          backgroundColor: hoveredBtn === "prev" ? palette.accent : palette.light,
          color: hoveredBtn === "prev" ? "#fff" : palette.text,
          transform: hoveredBtn === "prev" ? "scale(1.1) translateX(-2px)" : "scale(1)",
          border: `2px solid ${palette.accent}`,
        }}
        onMouseEnter={() => setHoveredBtn("prev")}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <span className="text-2xl">◀</span>
      </button>

      <span
        className={`font-semibold tracking-wider text-center w-44 ${isMobile ? "text-sm" : "text-lg"}`}
        style={{ 
          color: palette.text,
          textShadow: `0 2px 4px rgba(0,0,0,0.05)`,
        }}
      >
        {monthName.toUpperCase()} {year}
      </span>

      <button
        onClick={onNext}
        aria-label="Next month"
        className="group w-12 h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 font-bold text-lg shadow-md hover:shadow-lg"
        style={{
          backgroundColor: hoveredBtn === "next" ? palette.accent : palette.light,
          color: hoveredBtn === "next" ? "#fff" : palette.text,
          transform: hoveredBtn === "next" ? "scale(1.1) translateX(2px)" : "scale(1)",
          border: `2px solid ${palette.accent}`,
        }}
        onMouseEnter={() => setHoveredBtn("next")}
        onMouseLeave={() => setHoveredBtn(null)}
      >
        <span className="text-2xl">▶</span>
      </button>
    </div>
  );
}
