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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">📝 Todo List</h2>
        <div className="text-sm text-slate-400">
          {completedCount} of {todos.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      {todos.length > 0 && (
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all"
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
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 bg-slate-800 rounded border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {todos.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            No todos yet. Add one to get started!
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-slate-800 rounded hover:bg-slate-700 transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-slate-500' : 'text-white'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-400 transition"
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
