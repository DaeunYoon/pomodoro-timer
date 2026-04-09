import { useState, useEffect } from 'react'
import Timer from './pages/Timer'
import Todo from './pages/Todo'

type Tab = 'timer' | 'todo'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('timer')

  // Timer state - persists across tab switches
  const [isWork, setIsWork] = useState(true)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [workTime, setWorkTime] = useState(25)
  const [restTime, setRestTime] = useState(5)

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Timer effect - runs regardless of active tab
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Play sound
            if (window.electron?.playSound) {
              window.electron.playSound()
            }
            // Switch to rest or work
            setIsWork(!isWork)
            return isWork ? restTime * 60 : workTime * 60
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isWork, workTime, restTime])

  // Update tray with current time
  useEffect(() => {
    if (window.electron?.updateTray) {
      window.electron.updateTray(formatTime(timeLeft))
    }
  }, [timeLeft, formatTime])

  const toggleTimer = () => setIsRunning(!isRunning)

  const resetTimer = () => {
    setIsRunning(false)
    setIsWork(true)
    setTimeLeft(workTime * 60)
  }

  const updateWorkTime = (mins: number) => {
    setWorkTime(mins)
    if (!isRunning && isWork) {
      setTimeLeft(mins * 60)
    }
  }

  const updateRestTime = (mins: number) => {
    setRestTime(mins)
    if (!isRunning && !isWork) {
      setTimeLeft(mins * 60)
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900">
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'timer' && (
          <Timer
            isWork={isWork}
            timeLeft={timeLeft}
            isRunning={isRunning}
            workTime={workTime}
            restTime={restTime}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            updateWorkTime={updateWorkTime}
            updateRestTime={updateRestTime}
          />
        )}
        {activeTab === 'todo' && <Todo />}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-t border-slate-200 bg-white shadow-sm">
        <button
          onClick={() => setActiveTab('timer')}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            activeTab === 'timer'
              ? 'bg-indigo-500 text-white border-b-2 border-indigo-500'
              : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
          }`}
        >
          ⏱ Timer
        </button>
        <button
          onClick={() => setActiveTab('todo')}
          className={`flex-1 py-3 text-sm font-semibold transition ${
            activeTab === 'todo'
              ? 'bg-indigo-500 text-white border-b-2 border-indigo-500'
              : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
          }`}
        >
          ✓ Todo
        </button>
      </div>
    </div>
  )
}
