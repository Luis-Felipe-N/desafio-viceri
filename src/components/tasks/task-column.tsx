import { DndContext, type DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor, TouchSensor } from "@dnd-kit/core"
import { useSearch } from "@tanstack/react-router"
import { Badge } from "../ui/badge"
import { TaskList } from "./task-list"
import { useTasks } from "@/context/task-content"

import type { TaskStatus } from "@/types/task"
import { DroppableColumn } from "./droppable/droppable-column"

export function TaskColumn() {
  const { tasks, moveTask } = useTasks()

  const { query, filter } = useSearch({ from: '/' })
  const filteredTasks = tasks.filter((task) => {

    if (query) {
      const term = query.toLowerCase()
      const matchesSearch =
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.owner.name.toLowerCase().includes(term)

      if (!matchesSearch) return false
    }

    if (filter && filter !== 'all') {
      if (filter === 'overdue') {
        const isOverdue = new Date(task.deadline) < new Date() && task.status === 'started'
        if (!isOverdue) return false
      } else {
        const statusMap: Record<string, string> = {
          started: 'started',
          finished: 'finished',
          bloqued: 'bloqued'
        }
        if (task.status !== statusMap[filter]) return false
      }
    }

    return true
  })

  const columns = [
    {
      title: 'Iniciadas',
      accent: 'from-sky-200/70 via-sky-100 to-transparent',
      color: 'sky',
      status: 'started',
      tasks: filteredTasks.filter(task => task.status === 'started'),
    },
    {
      title: 'Concluídas',
      accent: 'from-emerald-200/70 via-emerald-100 to-transparent',
      color: 'esmerald',
      status: 'finished',
      tasks: filteredTasks.filter(task => task.status === 'finished'),
    },
    {
      title: 'Bloqeueadas',
      color: 'red',
      accent: 'from-red-200/60 via-red-100 to-transparent',
      status: 'bloqued',
      tasks: filteredTasks.filter(task => task.status === 'bloqued'),
    },
  ]

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor)
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as TaskStatus

    const currentTask = tasks.find(t => t.id === taskId)
    if (currentTask && currentTask.status !== newStatus) {
      moveTask(taskId, newStatus)
    }
  }
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <section className="grid xl:grid-cols-3">
        {columns.map((column) => (
          <DroppableColumn
            key={column.status}
            status={column.status}
            className="border-border/60 text-card-foreground relative flex h-full flex-col"
          >
            <div className={`bg-linear-to-br ${column.accent} absolute inset-x-4 top-4 h-16 rounded-2xl blur-3xl`} />
            <header className="relative flex items-center justify-between  rounded-2xl p-4 bg-card">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-viceri-blue">{column.title}</p>

                <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums leading-5 bg-viceri-blue"
                  variant="default"
                >
                  {column.tasks.length}
                </Badge>
              </div>
            </header>
            <TaskList tasks={column.tasks} />
          </DroppableColumn>
        ))}
      </section>
    </DndContext>
  )
}