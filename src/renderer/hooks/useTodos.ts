import { useState, useEffect } from 'react'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

const STORAGE_KEY = 'pomodoro-todos'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  // Load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setTodos(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load todos:', e)
      }
    }
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
