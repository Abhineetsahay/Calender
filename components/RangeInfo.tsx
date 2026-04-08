interface RangeInfoProps {
  rangeStart: { y: number; m: number; d: number } | null;
  rangeEnd: { y: number; m: number; d: number } | null;
  selecting: boolean;
  onClear: () => void;
  formatDate: (d: { y: number; m: number; d: number } | null) => string;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

export default function RangeInfo({
  rangeStart,
  rangeEnd,
  selecting,
  onClear,
  formatDate,
  palette,
  isMobile,
}: RangeInfoProps) {
  if (!rangeStart) return null;

  return (
    <div
      style={{
        marginTop: isMobile ? 10 : 14,
        minHeight: selecting && !rangeEnd ? 28 : 32,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          fontSize: 11,
          background: palette.light,
          color: palette.text,
          padding: "6px 12px",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <span style={{ fontWeight: "600" }}>From:</span> {formatDate(rangeStart)}
        {rangeEnd && (
          <>
            <span style={{ fontWeight: "600" }}>→ To:</span>
            {formatDate(rangeEnd)}
          </>
        )}
        <button
          onClick={onClear}
          aria-label="Clear range"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: palette.bg,
            fontSize: 14,
            padding: "0 4px",
            transition: "color 0.2s",
            fontWeight: "600",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = palette.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = palette.bg;
          }}
        >
          ✕
        </button>
      </div>

      {selecting && !rangeEnd && (
        <span style={{ fontSize: 11, color: "#aaa", fontStyle: "italic" }}>
          Click another date to set end
        </span>
      )}
    </div>
  );
}
