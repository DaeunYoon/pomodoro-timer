import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'

export default function Todo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [input, setInput] = useState('')

  const handleAddTodo = () => {
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">📝 Todo List</h2>
        <div className="text-sm text-slate-500">
          {completedCount} of {todos.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      {todos.length > 0 && (
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-indigo-500 h-full transition-all"
            style={{ width: `${(completedCount / todos.length) * 100}%` }}
          />
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-white rounded border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
        />
        <button
          onClick={handleAddTodo}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded font-semibold transition shadow-md hover:shadow-lg"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {todos.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No todos yet. Add one to get started!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-white rounded border border-slate-200 hover:border-slate-300 hover:shadow-sm transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer accent-indigo-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-slate-400'
                    : 'text-slate-900'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-slate-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
