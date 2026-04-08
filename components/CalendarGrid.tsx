import DateCell from "./DateCell";

interface CalendarGridProps {
  cells: (number | null)[];
  year: number;
  month: number;
  rangeStart: { y: number; m: number; d: number } | null;
  rangeEnd: { y: number; m: number; d: number } | null;
  showHoliday: string | null;
  onDayClick: (day: number) => void;
  onHolidayMouseEnter: (key: string) => void;
  onHolidayMouseLeave: () => void;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
  isToday: (d: number | null) => boolean;
  isWeekend: (idx: number) => boolean;
  isHoliday: (d: number | null) => string | undefined;
  isSameDay: (
    d1: { y: number; m: number; d: number } | null,
    d2: { y: number; m: number; d: number } | null
  ) => boolean;
  inRange: (
    day: { y: number; m: number; d: number } | null,
    start: { y: number; m: number; d: number } | null,
    end: { y: number; m: number; d: number } | null
  ) => boolean;
}

export default function CalendarGrid({
  cells,
  year,
  month,
  rangeStart,
  rangeEnd,
  showHoliday,
  onDayClick,
  onHolidayMouseEnter,
  onHolidayMouseLeave,
  palette,
  isMobile,
  isToday,
  isWeekend,
  isHoliday,
  isSameDay,
  inRange,
}: CalendarGridProps) {
  return (
    <div className={`grid grid-cols-7 flex-1 ${isMobile ? "gap-0.75" : "gap-1"}`}>
      {cells.map((day, idx) => {
        const d = day ? { y: year, m: month, d: day } : null;
        const isStart = isSameDay(d, rangeStart);
        const isEnd = isSameDay(d, rangeEnd);
        const inRng = d && inRange(d, rangeStart, rangeEnd);
        const isT = isToday(day);
        const weekend = isWeekend(idx);
        const holiday = isHoliday(day);

        return (
          <DateCell
            key={idx}
            day={day}
            isStart={isStart}
            isEnd={isEnd}
            inRange={inRng || false}
            isToday={isT}
            isWeekend={weekend}
            holiday={holiday}
            showHoliday={showHoliday === `${month + 1}-${day}`}
            onClick={() => day && onDayClick(day)}
            onMouseEnter={() =>
              holiday && onHolidayMouseEnter(`${month + 1}-${day}`)
            }
            onMouseLeave={onHolidayMouseLeave}
            palette={palette}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
}
