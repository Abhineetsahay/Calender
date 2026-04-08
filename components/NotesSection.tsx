interface NotesSectionProps {
  noteKey: string;
  noteInput: string;
  onNoteInputChange: (value: string) => void;
  onSaveNote: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  notes: Record<string, string[]>;
  onDeleteNote: (key: string, idx: number) => void;
  allNoteKeys: string[];
  palette: { bg: string; accent: string; light: string; text: string };
  isMobile: boolean;
  notesRef: React.RefObject<HTMLInputElement | null>;
}

export default function NotesSection({
  noteKey,
  noteInput,
  onNoteInputChange,
  onSaveNote,
  onKeyDown,
  notes,
  onDeleteNote,
  allNoteKeys,
  palette,
  isMobile,
  notesRef,
}: NotesSectionProps) {
  const currentNotes = notes[noteKey] || [];
  const otherNotes = allNoteKeys.filter((k) => k !== noteKey);
  
  return (
    <div
      style={{
        marginTop: isMobile ? 12 : 16,
        borderTop: `1.5px dashed ${palette.light}`,
        paddingTop: isMobile ? 10 : 14,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: "700",
          color: "#999",
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Notes {noteKey ? `— ${noteKey}` : ""}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          ref={notesRef}
          value={noteInput}
          onChange={(e) => onNoteInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add a note and press Enter…"
          style={{
            flex: 1,
            border: `1.5px solid ${palette.light}`,
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 13,
            fontFamily: "'Georgia', serif",
            outline: "none",
            color: "#444",
            background: "#fafafa",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = palette.accent;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${palette.accent}15`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = palette.light;
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        <button
          onClick={onSaveNote}
          aria-label="Save note"
          style={{
            background: palette.bg,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0 16px",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "600",
            flexShrink: 0,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = palette.accent;
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = palette.bg;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          +
        </button>
      </div>
      <div style={{ maxHeight: isMobile ? 100 : 140, overflowY: "auto" }}>
        {currentNotes.length > 0 ? (
          currentNotes.map((n: string, i: number) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "6px 0",
                borderBottom: `1px solid ${palette.light}`,
                fontSize: 12,
                color: "#555",
              }}
            >
              <span
                style={{
                  color: palette.accent,
                  fontWeight: "600",
                  marginTop: 1,
                }}
              >
                —
              </span>
              <span style={{ flex: 1, wordBreak: "break-word" }}>{n}</span>
              <button
                onClick={() => onDeleteNote(noteKey, i)}
                aria-label="Delete note"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ddd",
                  fontSize: 14,
                  padding: 0,
                  flexShrink: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = palette.bg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ddd";
                }}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div style={{ fontSize: 11, color: "#ccc", fontStyle: "italic" }}>
            No notes yet.
          </div>
        )}
      </div>

      {otherNotes.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: 9,
              color: "#bbb",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 6,
              fontWeight: "600",
            }}
          >
            Other saved notes
          </div>
          {otherNotes.map((k) => (
            <div
              key={k}
              style={{
                fontSize: 11,
                color: "#aaa",
                marginBottom: 4,
                padding: "4px 0",
              }}
            >
              <span style={{ fontWeight: "600", color: palette.accent }}>
                {k}:
              </span>{" "}
              {notes[k]!.join(", ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
