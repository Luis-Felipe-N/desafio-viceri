import type { Task } from "@/types/task"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { DraggableCard } from "./droppable/draggable-card"

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  const [animationParent] = useAutoAnimate()

  return (
    <div className="relative mt-4 space-y-4" ref={animationParent}>
      {tasks.map((task) => (
        <DraggableCard key={task.id} task={task} />
      ))}
    </div>
  )
}