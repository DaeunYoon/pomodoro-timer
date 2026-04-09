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
      {/* Current Phase Indicator */}
      <div className={`text-lg font-semibold mb-8 px-4 py-2 rounded-full ${
        isWork ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
      }`}>
        {isWork ? '🔵 Work Time' : '🟢 Rest Time'}
      </div>

      {/* Timer Display */}
      <div className="text-7xl font-bold font-mono mb-8 text-center tracking-wide text-slate-900">
        {formatTime(timeLeft)}
      </div>

      {/* Progress indicator */}
      <div className="mb-8 w-32 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${isWork ? 'bg-indigo-500' : 'bg-emerald-500'}`}
          style={{ width: `${isWork ? ((workTime * 60 - timeLeft) / (workTime * 60)) * 100 : ((restTime * 60 - timeLeft) / (restTime * 60)) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={toggleTimer}
          className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
        >
          ⚙ Settings
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="w-full max-w-xs bg-white rounded-lg p-6 space-y-4 shadow-lg border border-slate-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Work Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workTime}
              onChange={(e) => updateWorkTime(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rest Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={restTime}
              onChange={(e) => updateRestTime(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full px-3 py-2 bg-slate-50 rounded border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded font-semibold transition shadow-md hover:shadow-lg"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}
