import type { Task } from "@/types/task";
import { Calendar } from "lucide-react";

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="relative mt-4 space-y-4">
              {tasks.map((task) => (
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
  )
}