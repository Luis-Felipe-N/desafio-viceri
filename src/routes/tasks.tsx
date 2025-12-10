import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Calendar, Flame, Pause, Play, Sparkles } from 'lucide-react'

import { MOCK_TASKS } from '@/utils/mock-data'

export const Route = createFileRoute('/tasks')({
  component: TasksPage,
})

const columns = [

  {
    title: 'Iniciada',
    badge: '05 itens',
    accent: 'from-emerald-200/70 via-emerald-100 to-transparent',
    status: 'progress',
    tasks: MOCK_TASKS.filter(task => task.status === 'INICIADA'),
  },
  {
    title: 'Concluídas',
    badge: '02 itens',
    accent: 'from-sky-200/70 via-sky-100 to-transparent',
    status: 'review',
    tasks: MOCK_TASKS.filter(task => task.status === 'CONCLUIDA'),
  },
  {
    title: 'Bloqeueadas',
    badge: '{18} itens',
    accent: 'from-red-200/60 via-red-100 to-transparent',
    status: 'done',
    tasks: MOCK_TASKS.filter(task => task.status === 'BLOQUEADA'),
  },
]

function TasksPage() {
  return (
    <div className="space-y-8">
            <h1 className="mt-1 text-3xl font-semibold">Pipeline de tarefas</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Visão consolidada do que está em descoberta, execução ou aguardando validação. As tasks críticas
              aparecem primeiro para manter o foco do time nas entregas com maior impacto.
            </p>
     

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
                <span className="text-xs text-muted-foreground">{column.badge}</span>
              </div>
            </header>
            <div className="relative mt-4 space-y-4">
              {column.tasks.map((task) => (
                <div key={task.title} className="border-border/60 rounded-2xl border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium leading-tight">{task.title}</p>
                      <p className="text-sm text-muted-foreground">{task.owner}</p>
                      <p className="mt-2 text-xs text-muted-foreground/80">{task.description}</p>
                    </div>
                    <span className="bg-secondary text-secondary-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                      {task.initials}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="size-3.5" /> {task.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
