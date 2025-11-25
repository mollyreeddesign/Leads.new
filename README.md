# Leads.new - UX Optimizations

A modern React + TypeScript application for creating and managing lead magnets with an intuitive visual editor.

## Features

- **Visual Editor**: Interactive editor with AI-powered chat interface
- **Multiple Modes**: Chat, Design, Quiz, Brand, Code, and Settings modes
- **Page Flow Management**: Navigate between Data Capture, Gate, and Results pages
- **Device Preview**: Preview your lead magnet on different devices (Mobile, Desktop)
- **Real-time Editing**: Make changes and see them instantly

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Onest Font** - Custom typography

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
leadsdotnew/
├── src/
│   ├── components/
│   │   └── EditViewDesktop.tsx  # Main editor component
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles with Tailwind
├── index.html                    # HTML entry point
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── package.json                  # Dependencies and scripts
```

## Design

The UI is imported from Figma and follows the Leads.new design system:

- **Brand Colors**:
  - Navy: `#211951`
  - Purple: `#836fff`
  - Gray: `#f1f3ff`
  - Green: `#16f5ba`
  - White: `#ffffff`

- **Typography**: Onest font family with weights 400, 500, 600, 700

## Components

### EditViewDesktop

The main component that contains:
- Top navigation with project selector and main menu
- Side menu with mode selection
- Edit area with AI chat interface
- Result panel with page navigation and device preview

### PageSelector

Reusable component for displaying page flow steps with active/inactive states.

## License

Private

