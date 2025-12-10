import { TaskList } from "./task-list"
import { useTasks } from "@/context/task-content"

export function TaskColumn() {
  const { tasks } = useTasks()

  const columns = [
    {
      title: 'Iniciada',
      accent: 'from-emerald-200/70 via-emerald-100 to-transparent',
      status: 'progress',
      tasks: tasks.filter(task => task.status === 'INICIADA'),
    },
    {
      title: 'Concluídas',
      accent: 'from-sky-200/70 via-sky-100 to-transparent',
      status: 'review',
      tasks: tasks.filter(task => task.status === 'CONCLUIDA'),
    },
    {
      title: 'Bloqeueadas',
      accent: 'from-red-200/60 via-red-100 to-transparent',
      status: 'done',
      tasks: tasks.filter(task => task.status === 'BLOQUEADA'),
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
              <div>
                <p className="text-sm font-semibold">{column.title}</p>
                <span className="text-xs text-muted-foreground">{column.tasks.length} itens</span>
              </div>
            </header>
            <TaskList tasks={column.tasks} />
          </article>
        ))}
      </section>
  )
}