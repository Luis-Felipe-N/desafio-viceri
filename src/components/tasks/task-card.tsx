import type { Task } from "@/types/task"
import { Badge as BadgeIcon, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DeleteTaskDialog } from "../feature/delete-task"
import { EditTaskDialog } from "../feature/edit-task-dialog"
import { Badge } from "../ui/badge"

interface TaskCardProps {
  task: Task
}

const deadlineFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
})

export function TaskCard({ task }: TaskCardProps) {
  const formattedDeadline = deadlineFormatter.format(task.deadline)
  const participants = [task.owner, ...(task.participants || [])]

  return (
    <div className="rounded-2xl p-4 bg-card">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Badge className="bg-viceri-blue">{task.owner.squad}</Badge>
            <div className="flex items-center gap-2">
              <EditTaskDialog task={task} />
              <DeleteTaskDialog id={task.id} />
            </div>
          </div>
          <p className="leading-tight font-bold text-viceri-blue">{task.title}</p>
          <p className="my-1 text-xs text-viceri-muted-blue/80">{task.description}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          {participants.map((participant) => (
            <Avatar key={participant.id} className="size-6">
              <AvatarImage src={participant.imageUrl} />
              <AvatarFallback className="bg-viceri-blue text-xs font-semibold">
                {participant.name[0]}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 text-viceri-muted-blue/80">
          <Calendar className="size-3.5" /> {formattedDeadline}
        </span>
      </div>
    </div>
  )
}