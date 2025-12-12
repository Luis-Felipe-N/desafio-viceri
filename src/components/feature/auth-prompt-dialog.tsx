import { useState, type FormEvent } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"
import { useAuth } from "@/context/auth-content"

const SQUADS: User['squad'][] = ["Frontend", "Backend", "Fullstack", "Design", "QA"]

export function AuthPromptDialog() {
  const { login } = useAuth()
  const [name, setName] = useState("")
  const [squad, setSquad] = useState<User['squad'] | "">("")

  const disableSubmit = name.trim().length < 2 || !squad

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (disableSubmit || !squad) return

    login(name.trim(), squad)
  }

  const handleAnonymous = () => {
    login("Anônimo", "Fullstack")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Entrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Identifique-se para continuar</DialogTitle>
          <DialogDescription>
            Informe seu nome e squad ou continue como anônimo para testar o board.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="auth-name" className="text-sm font-medium">
              Nome completo
            </label>
            <Input
              id="auth-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Joana Martins"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="auth-squad" className="text-sm font-medium">
              Squad
            </label>
            <select
              id="auth-squad"
              value={squad}
              onChange={(event) => setSquad(event.target.value as User['squad'])}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="" hidden>
                Escolha o squad
              </option>
              {SQUADS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" className="w-full sm:w-auto" disabled={disableSubmit}>
              Entrar
            </Button>
            <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={handleAnonymous}>
              Continuar como Anônimo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
