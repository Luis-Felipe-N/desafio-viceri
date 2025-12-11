import type { Task } from "@/types/task"
import { TaskCard } from "./task-card"
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const [parent, enableAnimations] = useAutoAnimate()

  return (
    <div className="relative mt-4 space-y-4" ref={parent}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}