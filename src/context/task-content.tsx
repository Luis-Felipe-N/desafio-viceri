import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { MOCK_TASKS } from '@/utils/mock-data'
import type { Task, TaskStatus } from '@/types/task'

interface TaskContextType {
  tasks: Task[]
  createTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, newStatus: TaskStatus) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('viceri-tasks')
    return stored ? JSON.parse(stored) : MOCK_TASKS
  })

  useEffect(() => {
    localStorage.setItem('viceri-tasks', JSON.stringify(tasks))
  }, [tasks])

  function createTask(newTaskData: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...newTaskData,
      id: crypto.randomUUID(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  function updateTask(id: string, updates: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function moveTask(id: string, newStatus: TaskStatus) {
    updateTask(id, { status: newStatus })
  }

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TaskProvider')
  }
  return context
}