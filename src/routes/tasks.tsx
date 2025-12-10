import { createFileRoute } from '@tanstack/react-router'

import { MOCK_TASKS } from '@/utils/mock-data'
import { TaskColumn } from '@/components/tasks/task-column'

export const Route = createFileRoute('/tasks')({
  component: TasksPage,
})


function TasksPage() {
  return (
    <div className="space-y-8">
      <h1 className="mt-1 text-3xl font-semibold">Pipeline de tarefas</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Visão consolidada do que está em descoberta, execução ou aguardando validação. As tasks críticas
        aparecem primeiro para manter o foco do time nas entregas com maior impacto.
      </p>
      <TaskColumn />
    </div>
  )
}
