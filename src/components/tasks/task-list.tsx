import type { Task } from "@/types/task"
import { TaskCard } from "./task-card"

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="relative mt-4 space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}