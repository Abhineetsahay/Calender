interface DateCellProps {
  day: number | null;
  isStart: boolean;
  isEnd: boolean;
  inRange: boolean;
  isToday: boolean;
  isWeekend: boolean;
  holiday: string | undefined;
  showHoliday: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

export default function DateCell({
  day,
  isStart,
  isEnd,
  inRange,
  isToday,
  isWeekend,
  holiday,
  showHoliday,
  onClick,
  onMouseEnter,
  onMouseLeave,
  palette,
  isMobile,
}: DateCellProps) {
  if (!day) {
    return <div className={`${isMobile ? "h-9" : "h-11.5"} rounded-lg bg-transparent`} />;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative ${isMobile ? "h-9" : "h-11.5"} flex items-center justify-center cursor-pointer rounded-lg transition-all duration-150 ${
        isStart || isEnd ? "scale-110" : "scale-100"
      }`}
      style={{
        background: isStart || isEnd
          ? palette.bg
          : inRange
          ? palette.light
          : isToday
          ? palette.accent + "20"
          : "transparent",
      }}
    >
      <span
        className={`font-serif ${isStart || isEnd || isToday ? "font-medium" : "font-normal"} leading-none`}
        style={{
          fontSize: isMobile ? 13 : 15,
          color: isStart || isEnd
            ? "#fff"
            : isToday
            ? palette.text
            : isWeekend
            ? palette.bg
            : "#333",
        }}
      >
        {day}
      </span>

      {holiday && (
        <div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
          style={{
            background: isStart || isEnd ? "#fff" : palette.accent,
          }}
        />
      )}

      {holiday && showHoliday && (
        <div
          className={`absolute ${
            isMobile ? "bottom-full mb-1" : "bottom-full mb-1.5"
          } left-1/2 transform -translate-x-1/2 text-white text-xs font-medium whitespace-nowrap z-20 pointer-events-none shadow-md rounded-lg px-2 py-1`}
          style={{
            background: palette.bg,
          }}
        >
          {holiday}
        </div>
      )}
    </div>
  );
}
