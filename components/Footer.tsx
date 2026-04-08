interface FooterProps {
  rangeStart: { y: number; m: number; d: number } | null;
  rangeEnd: { y: number; m: number; d: number } | null;
  noteCount: number;
  dateToNum: (d: { y: number; m: number; d: number } | null) => number | null;
  palette: { bg: string; accent: string; light: string; text: string };
}

export default function Footer({
  rangeStart,
  rangeEnd,
  noteCount,
  dateToNum,
  palette,
}: FooterProps) {
  return (
    <div
      style={{
        background: palette.bg,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderTop: `1px solid ${palette.accent}30`,
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: 11,
          opacity: 0.8,
          fontFamily: "'Georgia', serif",
        }}
      >
        {rangeStart && rangeEnd
          ? `${Math.abs(
              dateToNum(rangeEnd)! - dateToNum(rangeStart)!
            )} days selected`
          : "Click to start selecting a range"}
      </span>
      <span style={{ color: "#fff", fontSize: 11, opacity: 0.8 }}>
        {noteCount} note{noteCount !== 1 ? "s" : ""} saved
      </span>
    </div>
  );
}
