import { Badge } from "../ui/badge"
import { TaskList } from "./task-list"
import { useTasks } from "@/context/task-content"
import { useSearch } from "@tanstack/react-router"

export function TaskColumn() {
  const { tasks } = useTasks()

  const { query, filter } = useSearch({ from: '/tasks' })
  const filteredTasks = tasks.filter((task) => {

    if (query) {
      const term = query.toLowerCase()
      const matchesSearch =
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        task.owner.toLowerCase().includes(term)

      if (!matchesSearch) return false
    }

    if (filter && filter !== 'all') {
      if (filter === 'overdue') {
        console.log('Checking overdue for task:', task)
        const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'CONCLUIDA'
        if (!isOverdue) return false
      } else {
        const statusMap: Record<string, string> = {
          started: 'INICIADA',
          finished: 'CONCLUIDA',
          blocked: 'BLOQUEADA'
        }
        if (task.status !== statusMap[filter]) return false
      }
    }

    return true
  })

  const columns = [
    {
      title: 'Iniciada',
      color: 'esmerald',
      accent: 'from-emerald-200/70 via-emerald-100 to-transparent',
      status: 'progress',
      tasks: filteredTasks.filter(task => task.status === 'INICIADA'),
    },
    {
      title: 'Concluídas',
      color: 'sky',
      accent: 'from-sky-200/70 via-sky-100 to-transparent',
      status: 'done',
      tasks: filteredTasks.filter(task => task.status === 'CONCLUIDA'),
    },
    {
      title: 'Bloqeueadas',
      color: 'red',
      accent: 'from-red-200/60 via-red-100 to-transparent',
      status: 'done',
      tasks: filteredTasks.filter(task => task.status === 'BLOQUEADA'),
    },
  ]



  return (
    <section className="grid gap-5 xl:grid-cols-3">
      {columns.map((column) => (
        <article
          key={column.title}
          className="border-border/60 bg-card text-card-foreground relative flex h-full flex-col rounded-2xl border p-4"
        >
          <div className={`bg-linear-to-br ${column.accent} absolute inset-x-4 top-4 h-16 rounded-2xl blur-3xl`} />
          <header className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold">{column.title}</p>

              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums leading-5"
                variant="default"
              >
                {column.tasks.length}
              </Badge>
            </div>
          </header>
          <TaskList tasks={column.tasks} />
        </article>
      ))}
    </section>
  )
}