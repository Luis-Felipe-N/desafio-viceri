import type { Task } from "@/types/task"
import { Calendar, Ellipsis } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { TaskDropdownMenu } from "./task-dropdown-menu"
import { DeleteTaskDialog } from "../feature/delete-task"

interface TaskCardProps {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div key={task.title} className="border-border/60 rounded-2xl border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="font-medium leading-tight">{task.title}</p>
            <div>
              <DeleteTaskDialog id={task.id} />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground/80">{task.description}</p>
        </div>
      </div>
      <div>
        <strong>Squard: </strong> <small>Frontend</small>
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
          <Calendar className="size-3.5" /> {task.due}
        </span>
      </div>
    </div>
  )
}