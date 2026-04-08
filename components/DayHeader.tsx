interface DayHeaderProps {
  days: string[];
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

export default function DayHeader({ days, palette, isMobile }: DayHeaderProps) {
  return (
    <div className="grid grid-cols-7 mb-2 gap-0.5">
      {days.map((d) => (
        <div
          key={d}
          className={`text-center font-semibold tracking-tighter p-1 text-xs md:text-sm uppercase border-b-2`}
          style={{
            color: d === "Sat" || d === "Sun" ? palette.bg : "#888",
            borderBottomColor: palette.light,
          }}
        >
          {d}
        </div>
      ))}
    </div>
  );
}
