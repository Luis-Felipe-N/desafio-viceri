import type { Task } from "@/types/task"
import { Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DeleteTaskDialog } from "../feature/delete-task"
import { EditTaskDialog } from "../feature/edit-task-dialog"

interface TaskCardProps {
  task: Task
}

const deadlineFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
})

export function TaskCard({ task }: TaskCardProps) {
  const formattedDeadline = deadlineFormatter.format(task.deadline)

  return (
    <div className="border-border/60 rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="leading-tight font-bold">{task.title}</p>
            <div className="flex items-center gap-2">
              <EditTaskDialog task={task} />
              <DeleteTaskDialog id={task.id} />
            </div>
          </div>
          <p className="my-1 text-xs text-muted-foreground/90">{task.description}</p>
        </div>
      </div>
      <div>
        <small className="text-accent-foreground/70"><strong>Squard: </strong>Frontend</small>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/maxleiter.png"
              alt="@maxleiter"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>

        <span className="inline-flex items-center gap-2">
          <Calendar className="size-3.5" /> {formattedDeadline}
        </span>
      </div>
    </div>
  )
}