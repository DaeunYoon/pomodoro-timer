# Pomodoro Timer

A native macOS Pomodoro timer app with integrated todo list.

## Features

- **Timer**: Customizable work (default 25 min) and rest (default 5 min) sessions
- **Todo List**: Add, check off, and delete tasks
- **Tab Navigation**: Switch between Timer and Todo views
- **System Notifications**: Get alerted when timer completes
- **Persistent Storage**: Todos are saved locally

## Tech Stack

- **Electron** - Native macOS app framework
- **React + TypeScript** - UI and logic
- **Tailwind CSS** - Styling
- **Vite** - Build tooling

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

This starts both Vite dev server and Electron app with hot reload.

## Building

```bash
npm run build
```

Creates a distributable `.dmg` and `.zip` file in `dist/`.

## Project Structure

```
src/
├── main/          # Electron main process
├── preload/       # IPC bridge
└── renderer/      # React app
    ├── pages/     # Timer and Todo components
    ├── hooks/     # Custom hooks (useTodos)
    └── styles/    # Tailwind CSS
```
