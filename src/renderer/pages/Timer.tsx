import { useState } from 'react'

interface TimerProps {
  isWork: boolean
  timeLeft: number
  isRunning: boolean
  workTime: number
  restTime: number
  toggleTimer: () => void
  resetTimer: () => void
  updateWorkTime: (mins: number) => void
  updateRestTime: (mins: number) => void
}

export default function Timer({
  isWork,
  timeLeft,
  isRunning,
  workTime,
  restTime,
  toggleTimer,
  resetTimer,
  updateWorkTime,
  updateRestTime,
}: TimerProps) {
  const [showSettings, setShowSettings] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      {/* Current Phase */}
      <div className="text-2xl font-semibold mb-8">
        {isWork ? '🔴 Work Time' : '🟢 Rest Time'}
      </div>

      {/* Timer Display */}
      <div className="text-7xl font-bold font-mono mb-12 text-center tracking-wide">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={toggleTimer}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
        >
          ⚙ Settings
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="w-full max-w-xs bg-slate-800 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Work Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workTime}
              onChange={(e) => updateWorkTime(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Rest Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={restTime}
              onChange={(e) => updateRestTime(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600 text-white"
            />
          </div>
          <button 
            onClick={() => setShowSettings(false)}
            className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition"
          >
            Finish settings
          </button>
        </div>
      )}
    </div>
  )
}
