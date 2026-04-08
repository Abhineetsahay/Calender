"use client";

interface MonthYearPickerProps {
  year: number;
  month: number;
  onSelect: (newMonth: number, newYear: number) => void;
  onClose: () => void;
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function MonthYearPicker({
  year,
  month,
  onSelect,
  onClose,
  palette,
  isMobile,
}: MonthYearPickerProps) {
  const currentYear = new Date().getFullYear();
  const yearRange = 20;
  const startYear = currentYear - yearRange;
  const endYear = currentYear + yearRange;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: isMobile ? "16px" : "24px",
          width: isMobile ? "90%" : "400px",
          maxWidth: "500px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "600",
            color: palette.text,
            marginBottom: "16px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Select Month & Year
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            Month
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {MONTHS.map((m, idx) => (
              <button
                key={m}
                onClick={() => onSelect(idx, year)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: `2px solid ${idx === month ? palette.accent : palette.light}`,
                  backgroundColor: idx === month ? palette.light : "#fafafa",
                  color: idx === month ? palette.bg : palette.text,
                  fontWeight: idx === month ? "600" : "500",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (idx !== month) {
                    e.currentTarget.style.backgroundColor = palette.light;
                    e.currentTarget.style.borderColor = palette.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== month) {
                    e.currentTarget.style.backgroundColor = "#fafafa";
                    e.currentTarget.style.borderColor = palette.light;
                  }
                }}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "8px",
            }}
          >
            Year
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map((y) => (
              <button
                key={y}
                onClick={() => onSelect(month, y)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: `2px solid ${y === year ? palette.accent : palette.light}`,
                  backgroundColor: y === year ? palette.light : "#fafafa",
                  color: y === year ? palette.bg : palette.text,
                  fontWeight: y === year ? "600" : "500",
                  cursor: "pointer",
                  fontSize: "12px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (y !== year) {
                    e.currentTarget.style.backgroundColor = palette.light;
                    e.currentTarget.style.borderColor = palette.accent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (y !== year) {
                    e.currentTarget.style.backgroundColor = "#fafafa";
                    e.currentTarget.style.borderColor = palette.light;
                  }
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: `2px solid ${palette.light}`,
              backgroundColor: "#fafafa",
              color: palette.text,
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.light;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fafafa";
            }}
          >
            Close
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: palette.bg,
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.bg;
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
