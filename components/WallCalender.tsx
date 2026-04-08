"use client";

import { useState, useEffect, useRef } from "react";
import HeroImage from "./HeroImage";
import Navigation from "./Navigation";
import DayHeader from "./DayHeader";
import CalendarGrid from "./CalendarGrid";
import RangeInfo from "./RangeInfo";
import NotesSection from "./NotesSection";
import Footer from "./Footer";
import Skeleton from "./Skeleton";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1467912407355-245f30185020?w=800&q=80",
];

const PALETTE = [
  { bg: "#1565C0", accent: "#42A5F5", light: "#E3F2FD", text: "#0D47A1" },
  { bg: "#00695C", accent: "#4DB6AC", light: "#E0F2F1", text: "#004D40" },
  { bg: "#6A1B9A", accent: "#CE93D8", light: "#F3E5F5", text: "#4A148C" },
  { bg: "#BF360C", accent: "#FF8A65", light: "#FBE9E7", text: "#870000" },
  { bg: "#1B5E20", accent: "#81C784", light: "#E8F5E9", text: "#003300" },
  { bg: "#4527A0", accent: "#9575CD", light: "#EDE7F6", text: "#311B92" },
  { bg: "#0277BD", accent: "#4FC3F7", light: "#E1F5FE", text: "#01579B" },
  { bg: "#558B2F", accent: "#AED581", light: "#F1F8E9", text: "#33691E" },
  { bg: "#AD1457", accent: "#F48FB1", light: "#FCE4EC", text: "#880E4F" },
  { bg: "#00838F", accent: "#4DD0E1", light: "#E0F7FA", text: "#006064" },
  { bg: "#4E342E", accent: "#BCAAA4", light: "#EFEBE9", text: "#3E2723" },
  { bg: "#37474F", accent: "#90A4AE", light: "#ECEFF1", text: "#263238" },
];

const HOLIDAYS = {
  "1-1": "New Year's Day",
  "1-26": "Republic Day",
  "3-8": "Int'l Women's Day",
  "3-25": "Holi",
  "4-14": "Ambedkar Jayanti",
  "4-18": "Good Friday",
  "5-1": "Labour Day",
  "5-12": "Buddha Purnima",
  "6-21": "World Music Day",
  "8-15": "Independence Day",
  "10-2": "Gandhi Jayanti",
  "10-20": "Dussehra",
  "11-1": "Diwali",
  "11-5": "Diwali",
  "12-25": "Christmas",
};

// Helper functions
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function isSameDay(
  d1: { y: number; m: number; d: number } | null,
  d2: { y: number; m: number; d: number } | null,
): boolean {
  return !!(d1 && d2 && d1.y === d2.y && d1.m === d2.m && d1.d === d2.d);
}

function dateToNum(d: { y: number; m: number; d: number } | null) {
  return d ? d.y * 10000 + d.m * 100 + d.d : null;
}

function inRange(
  day: { y: number; m: number; d: number } | null,
  start: { y: number; m: number; d: number } | null,
  end: { y: number; m: number; d: number } | null,
): boolean {
  if (!start || !end) return false;
  const n = dateToNum(day);
  const s = dateToNum(start),
    e = dateToNum(end);
  return !!(s && e && (s < e ? n && n > s && n < e : n && n > e && n < s));
}

function formatDate(d: { y: number; m: number; d: number } | null) {
  if (!d) return "";
  return `${d.d} ${MONTHS[d.m].slice(0, 3)} ${d.y}`;
}

export default function WallCalendar() {
  const today = new Date();
  const [year, setYear] = useState(() => {
    try {
      const saved = localStorage.getItem("calendarYear");
      return saved ? parseInt(saved, 10) : today.getFullYear();
    } catch (e) {
      return today.getFullYear();
    }
  });
  const [month, setMonth] = useState(() => {
    try {
      const saved = localStorage.getItem("calendarMonth");
      return saved ? parseInt(saved, 10) : today.getMonth();
    } catch (e) {
      return today.getMonth();
    }
  });
  const [rangeStart, setRangeStart] = useState<{
    y: number;
    m: number;
    d: number;
  } | null>(() => {
    try {
      const saved = localStorage.getItem("rangeStart");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [rangeEnd, setRangeEnd] = useState<{
    y: number;
    m: number;
    d: number;
  } | null>(() => {
    try {
      const saved = localStorage.getItem("rangeEnd");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [selecting, setSelecting] = useState(false);
  const [notes, setNotes] = useState<Record<string, string[]>>(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : {};
    } catch (e) {
      console.error("Failed to parse saved notes", e);
      return {};
    }
  });
  const [noteInput, setNoteInput] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showHoliday, setShowHoliday] = useState<string | null>(null);
  const notesRef = useRef<HTMLInputElement>(null);

  const palette = PALETTE[month];
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  useEffect(() => {
    localStorage.setItem("calendarYear", year.toString());
    localStorage.setItem("calendarMonth", month.toString());
  }, [year, month]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (rangeStart) {
      localStorage.setItem("rangeStart", JSON.stringify(rangeStart));
    } else {
      localStorage.removeItem("rangeStart");
    }

    if (rangeEnd) {
      localStorage.setItem("rangeEnd", JSON.stringify(rangeEnd));
    } else {
      localStorage.removeItem("rangeEnd");
    }
  }, [rangeStart, rangeEnd]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    // Show skeleton for 500ms on initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  function navigate(dir: number) {
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      const nm = month + dir;
      let yearDelta = 0;
      let newMonth = month;

      if (nm < 0) {
        yearDelta = -1;
        newMonth = 11;
      } else if (nm > 11) {
        yearDelta = 1;
        newMonth = 0;
      } else {
        newMonth = nm;
      }

      setMonth(newMonth);
      if (yearDelta !== 0) {
        setYear((y) => y + yearDelta);
      }

      setRangeStart(null);
      setRangeEnd(null);
      setSelecting(false);
      setImgLoaded(false);
      setFlipping(false);
    }, 350);
  }

  function handleDayClick(day: number) {
    const d = { y: year, m: month, d: day };
    if (!selecting || !rangeStart) {
      setRangeStart(d);
      setRangeEnd(null);
      setSelecting(true);
    } else {
      const num1 = dateToNum(rangeStart);
      const num2 = dateToNum(d);
      if (num1 && num2 && num1 < num2) {
        setRangeEnd(d);
      } else if (num1 && num2) {
        setRangeEnd(rangeStart);
        setRangeStart(d);
      } else {
        setRangeEnd(d);
      }
      setSelecting(false);
      if (notesRef.current) notesRef.current.focus();
    }
  }

  function saveNote() {
    if (!noteInput.trim()) return;
    const key = rangeStart
      ? `${formatDate(rangeStart)}${rangeEnd ? " → " + formatDate(rangeEnd) : ""}`
      : `${MONTHS[month]} ${year}`;
    setNotes((n) => ({ ...n, [key]: [...(n[key] || []), noteInput.trim()] }));
    setNoteInput("");
  }

  function deleteNote(key: string, idx: number) {
    setNotes((n) => {
      const arr = [...(n[key] || [])];
      arr.splice(idx, 1);
      const next = { ...n };
      if (arr.length === 0) delete next[key];
      else next[key] = arr;
      return next;
    });
  }

  const noteKey = rangeStart
    ? `${formatDate(rangeStart)}${rangeEnd ? " → " + formatDate(rangeEnd) : ""}`
    : `${MONTHS[month]} ${year}`;
  const allNoteKeys = Object.keys(notes);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d: number | null): boolean =>
    !!(
      d &&
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === d
    );
  const isWeekend = (idx: number): boolean => {
    const col = idx % 7;
    return col === 5 || col === 6;
  };
  const holidayKey = (d: number) => `${month + 1}-${d}`;
  const isHoliday = (d: number | null): string | undefined =>
    d ? HOLIDAYS[holidayKey(d) as keyof typeof HOLIDAYS] : undefined;

  return (
    <div className="h-screen bg-linear-to-br from-amber-50 to-amber-100 flex items-center justify-center p-2 md:p-4">
      <div className={`w-full overflow-y-auto ${isMobile ? "h-auto max-h-[95vh]" : "h-[80vh]"} bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl relative`}>
      
        <div className={`flex ${isMobile ? "flex-col " : "flex-row"} mt-7`}>
          <div className={`${isMobile ? "w-full h-56" : "w-1/2"} relative overflow-hidden shrink-0`}>
            <HeroImage
              src={MONTH_IMAGES[month]}
              alt={MONTHS[month]}
              month={MONTHS[month]}
              year={year}
              imgLoaded={imgLoaded}
              onLoad={() => setImgLoaded(true)}
              palette={palette}
              isMobile={isMobile}
            />
          </div>

          <div className={`flex-1 flex flex-col ${isMobile ? "p-4" : "p-7"} relative overflow-hidden`}>
         
            <div
              className={`absolute inset-0 z-5 pointer-events-none transition-all duration-350 ${
                flipping
                  ? flipDir > 0
                    ? "bg-black/5"
                    : "bg-white/10"
                  : "bg-transparent"
              }`}
            />

            {isLoading || flipping ? (
              <Skeleton />
            ) : (
              <>
                <Navigation
                  monthName={MONTHS[month]}
                  year={year}
                  onPrevious={() => navigate(-1)}
                  onNext={() => navigate(1)}
                  palette={palette}
                  isMobile={isMobile}
                />

                <DayHeader days={DAYS} palette={palette} isMobile={isMobile} />

                <CalendarGrid
                  cells={cells}
                  year={year}
                  month={month}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  showHoliday={showHoliday}
                  onDayClick={handleDayClick}
                  onHolidayMouseEnter={setShowHoliday}
                  onHolidayMouseLeave={() => setShowHoliday(null)}
                  palette={palette}
                  isMobile={isMobile}
                  isToday={isToday}
                  isWeekend={isWeekend}
                  isHoliday={isHoliday}
                  isSameDay={isSameDay}
                  inRange={inRange}
                />

                <RangeInfo
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                  selecting={selecting}
                  onClear={() => {
                    setRangeStart(null);
                    setRangeEnd(null);
                    setSelecting(false);
                  }}
                  formatDate={formatDate}
                  palette={palette}
                  isMobile={isMobile}
                />

                <NotesSection
                  noteKey={noteKey}
                  noteInput={noteInput}
                  onNoteInputChange={setNoteInput}
                  onSaveNote={saveNote}
                  onKeyDown={(e) => e.key === "Enter" && saveNote()}
                  notes={notes}
                  onDeleteNote={deleteNote}
                  allNoteKeys={allNoteKeys}
                  palette={palette}
                  isMobile={isMobile}
                  notesRef={notesRef}
                />
              </>
            )}
          </div>
        </div>

        <Footer
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          noteCount={allNoteKeys.length}
          dateToNum={dateToNum}
          palette={palette}
        />
      </div>
    </div>
  );
}
