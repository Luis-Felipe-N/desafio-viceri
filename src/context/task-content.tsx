import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { MOCK_TASKS } from '@/utils/mock-data'
import type { Task, TaskStatus } from '@/types/task'

type SerializedTask = Omit<Task, 'deadline'> & { deadline: string | Date }

const reviveTasks = (tasks: SerializedTask[]): Task[] =>
  tasks.map((task) => ({
    ...task,
    deadline: new Date(task.deadline),
  }))

const getInitialTasks = (): Task[] => {
  if (typeof window === 'undefined') {
    return reviveTasks(MOCK_TASKS as SerializedTask[])
  }

  const stored = window.localStorage.getItem('viceri-tasks')
  if (!stored) {
    return reviveTasks(MOCK_TASKS as SerializedTask[])
  }

  try {
    const parsed = JSON.parse(stored) as SerializedTask[]
    return reviveTasks(parsed)
  } catch (error) {
    console.error('Falha ao recuperar tasks, usando fallback.', error)
    return reviveTasks(MOCK_TASKS as SerializedTask[])
  }
}

interface TaskContextType {
  tasks: Task[]
  createTask: (task: Omit<Task, 'id'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, newStatus: TaskStatus) => void
  getTaskById: (id: string) => Task | null
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(getInitialTasks)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('viceri-tasks', JSON.stringify(tasks))
    }
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

  function getTaskById(id: string) {
    return tasks.find((task) => task.id === id) ?? null
  }

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, moveTask, getTaskById }}
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