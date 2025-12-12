import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Calendar as CalendarIcon, Pencil } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTasks } from "@/context/task-content"
import type { Task } from "@/types/task"
import { MOCK_USERS } from "@/utils/mock-user"
import { ParticipantsAutocomplete } from "@/components/feature/participants-autocomplete"

const editTaskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  participantIds: z.array(z.string()).optional(),
  deadline: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Data inválida",
  }),
  description: z.string().min(5, "A descrição deve ser mais detalhada"),
})

type EditTaskSchema = z.infer<typeof editTaskSchema>

interface EditTaskFormDialogProps {
  task: Task
}

export function EditTaskDialog({ task }: EditTaskFormDialogProps) {
  const { updateTask } = useTasks()
  const [open, setOpen] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTaskSchema>({
    resolver: zodResolver(editTaskSchema),
    values: {
      title: task.title,
      participantIds: task.participants?.map((participant) => participant.id) ?? [],
      deadline: new Date(task.deadline).toISOString().split("T")[0],
      description: task.description,
    }
  })

  const onSubmit = (data: EditTaskSchema) => {
    const normalizedDate = new Date(data.deadline)

    const participants = (data.participantIds ?? [])
      .map((id) => MOCK_USERS.find((user) => user.id === id))
      .filter((user) => !!user)

    updateTask(task.id, {
      title: data.title,
      description: data.description,
      participants,
      deadline: normalizedDate,
    })

    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
          <Pencil className="size-4 text-viceri-blue" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="relative">
          <div className={`bg-linear-to-br from-amber-400/70 via-amber-100 absolute to-transparent inset-x-4 top-4 h-16 rounded-2xl blur-3xl`} />
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription>
            Editando: <span className="font-medium text-foreground">{task.title}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">Título</label>
            <Input id="title" {...register("title")} placeholder="Ex: Implementar Login" />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="deadline" className="text-sm font-medium">Prazo</label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-4 size-4 text-muted-foreground" />
              <Input id="deadline" type="date" className="pl-9" {...register("deadline")} />
            </div>
            {errors.deadline && <span className="text-xs text-destructive">{errors.deadline.message}</span>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Descrição</label>
            <Textarea
              id="description"
              placeholder="Detalhes..."
              className="min-h-24"
              {...register("description")}
            />
            {errors.description && <span className="text-xs text-destructive">{errors.description.message}</span>}
          </div>

          <div className="grid gap-2">
            <label htmlFor="participants" className="text-sm font-medium">Participantes</label>
            <Controller
              control={control}
              name="participantIds"
              render={({ field }) => (
                <ParticipantsAutocomplete
                  inputId="participants"
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="bg-viceri-orange hover:bg-viceri-orange/90 text-white">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}