import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface DroppableColumnProps {
  status: string
  children: React.ReactNode
  className?: string
}

export function DroppableColumn({ status, children, className }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  })

  return (
    <article
      ref={setNodeRef}
      className={cn(
        "rounded-2xl border-transparent transition-all duration-200 p-2",
        isOver ? "border-viceri bg-viceri/10 ring-2 ring-viceri/20 border-dashed" : "border-none",
        className
      )}
    >
      {children}
    </article>
  )
}