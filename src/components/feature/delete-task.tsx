import { Trash2 } from "lucide-react"
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
import { useTasks } from "@/context/task-content"

interface DeleteTaskDialogProps {
  id: string
}

export function DeleteTaskDialog({ id }: DeleteTaskDialogProps) {
  const { deleteTask } = useTasks()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Botão mais discreto, só mostra o ícone */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
          <span className="sr-only">Deletar tarefa</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir tarefa?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a tarefa do quadro.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={() => deleteTask(id)}>
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}