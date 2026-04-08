# Wall Calendar App

A modern, interactive wall calendar built with Next.js, React, and Tailwind CSS. Features a beautiful spiral-bound design with date range selection, note management, and holiday indicators.

## Features

✨ **Interactive Calendar**
- Navigate through months and years with smooth flip animations
- View holidays for each date
- Today indicator highlighting current date
- Weekend highlighting

📅 **Date Range Selection**
- Select date ranges by clicking start and end dates
- Visual range highlighting on calendar
- Clear range selection with one click

📝 **Note Management**
- Add notes to specific dates or date ranges
- View all notes for the current month
- Delete individual notes
- Notes automatically saved to browser localStorage

🎨 **Beautiful UI**
- Spiral binding design element
- Color-coded months with dynamic palettes
- Responsive design (mobile & desktop)
- Smooth animations and transitions
- System fonts for optimal performance

💾 **Data Persistence**
- Automatically saves state to localStorage:
  - Current year and month
  - Selected date ranges
  - All notes
- Data persists across browser sessions

📱 **Responsive Design**
- Optimized for desktop and mobile devices
- Adaptive layouts and font sizes
- Touch-friendly interface

## Tech Stack

- **Framework**: Next.js 13+ with React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Build Tool**: Next.js built-in tools

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calendar
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Navigation
- Click **Previous** (◀) or **Next** (▶) buttons to navigate between months
- Year automatically advances/decreases when moving between months
- Smooth flip animation on month transition

### Date Selection
1. Click a date to start range selection
2. Click another date to complete the range
3. Selected dates highlight in the calendar color
4. Click "Clear" to reset the selection

### Adding Notes
1. Select a date or date range (optional)
2. Type your note in the input field
3. Press Enter or click the save button
4. Note appears in the "Notes" section

### Viewing Notes
- **Current Month**: Shows notes for the current viewing month
- **Date Range**: Shows notes for specific date ranges
- Click delete icon (🗑️) to remove a note

### Holiday Information
- Hover over dates with holiday indicators to view holiday name
- Includes major Indian holidays and international observances

## File Structure

```
calendar/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── WallCalender.tsx     # Main calendar component
│   ├── HeroImage.tsx        # Month image hero section
│   ├── Navigation.tsx       # Month/year navigation
│   ├── DayHeader.tsx        # Day abbreviations (Mon-Sun)
│   ├── DateCell.tsx         # Individual date cell
│   ├── CalendarGrid.tsx     # Calendar grid layout
│   ├── RangeInfo.tsx        # Date range display
│   ├── NotesSection.tsx     # Notes management
│   └── Footer.tsx           # Footer info
├── public/                  # Static assets
└── package.json             # Dependencies
```

## Key Components

### WallCalender.tsx (Main)
- Orchestrates all state management
- Handles date calculations
- Manages localStorage persistence
- Contains holiday definitions and color palettes

### Sub-Components
- **Navigation**: Month/year navigation controls
- **CalendarGrid**: 7-column grid layout for dates
- **DateCell**: Individual date cells with holiday indicators
- **NotesSection**: Note input and display
- **RangeInfo**: Shows selected date range
- **Footer**: Additional calendar statistics

## State Management

The calendar uses React hooks with localStorage persistence:

```typescript
// Persisted state (loads from localStorage on mount)
- year
- month
- rangeStart
- rangeEnd
- notes

// Non-persisted state
- noteInput
- selecting
- isMobile
- flipping
- showHoliday
```

All persisted state uses lazy initializers to load from localStorage on mount.

## Styling

The project uses **Tailwind CSS** for styling with a custom color palette system:

- 12 color schemes (one per month)
- Each palette includes: background, accent, light, and text colors
- Responsive utilities for mobile/desktop
- Smooth transitions and animations

### Font Stack
System fonts for instant rendering:
- Segoe UI
- -apple-system
- BlinkMacSystemFont
- SF Pro Display
- Helvetica Neue

## Holidays

The calendar includes major holidays:
- New Year's Day
- Republic Day
- Women's Day
- Holi, Dussehra, Diwali
- Independence Day
- Gandhi Jayanti
- Christmas
- And more...

## Build for Production

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Data Privacy

All data is stored **locally in your browser** using localStorage. No data is sent to any server.


**Built with ❤️ using Next.js and Tailwind CSS**
