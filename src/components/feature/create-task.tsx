import { useState } from "react"
import { PlusCircle, Calendar as CalendarIcon, User } from "lucide-react"
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
import { useTasks } from "@/context/task-content"
import type { TaskStatus } from "@/types/task"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MOCK_USERS } from "@/utils/mock-user"

const createTaskSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  participantIds: z.array(z.string()).optional(),
  deadline: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Data inválida",
  }),
  description: z.string().min(5, "A descrição deve ser mais detalhada"),
})

type CreateTaskFormData = z.infer<typeof createTaskSchema>

export function CreateTaskDialog() {
  const { createTask } = useTasks()
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTaskFormData>(
    { resolver: zodResolver(createTaskSchema) }
  )

  const handleCreateTask = (data: CreateTaskFormData) => {
    const deadline = new Date(data.deadline)

    createTask({
      title: data.title,
      description: data.description,
      participants: [MOCK_USERS[0]],
      owner: MOCK_USERS[0],
      createdAt: new Date(),
      deadline,
      status: "INICIADA" as TaskStatus,
    })

    reset()
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-viceri-orange hover:bg-viceri-orange/80 font-bold ">
          <PlusCircle className="size-4" />
          Nova Tarefa
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova tarefa</DialogTitle>
          <DialogDescription>
            Preencha os detalhes da atividade para adicionar ao quadro.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              placeholder="Ex: Implementar Login"
              {...register("title")}
            />
            {errors.title && (
              <span className="text-xs text-destructive">{errors.title.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="deadline" className="text-sm font-medium">
              Prazo de Entrega
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-4 size-4 text-muted-foreground" />
              <Input
                id="deadline"
                type="date"
                className="pl-11"
                {...register("deadline")}
              />
            </div>
            {errors.deadline && (
              <span className="text-xs text-destructive">{errors.deadline.message}</span>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Detalhes técnicos da tarefa..."
              {...register("description")}
            />
            {errors.description && (
              <span className="text-xs text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Salvar Tarefa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}