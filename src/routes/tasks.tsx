import { createFileRoute } from '@tanstack/react-router'

import { TaskColumn } from '@/components/tasks/task-column'
import { CreateTaskDialog } from '@/components/feature/create-task'
import { TaskFilter } from '@/components/tasks/task-filter'
import z from 'zod'

const tasksSearchSchema = z.object({
  query: z.string().optional(),
  filter: z.enum(['all', 'overdue', 'started', 'finished', 'blocked']).optional().default('all'),
})

export const Route = createFileRoute('/tasks')({
  validateSearch: (search) => tasksSearchSchema.parse(search),
  component: TasksPage,
})

function TasksPage() {
  return (
    <div className="space-y-8">
      <div className='flex justify-between'>
        <div>
          <h1 className="mt-1 text-3xl font-semibold text-viceri-blue">Tasks</h1>
          <p className="mt-2 max-w-2xl text-sm text-viceri-muted-blue/80">
            Crie e gerencie suas tarefas e do seu squad
          </p>
        </div>
        <CreateTaskDialog />
      </div>

      <TaskFilter />

      <TaskColumn />
    </div>
  )
}
