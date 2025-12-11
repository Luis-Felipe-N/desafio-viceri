import type { User } from "./user"

export type TaskStatus = 'INICIADA' | 'BLOQUEADA' | 'CONCLUIDA'

export type Task = {
  id: string
  title: string
  owner: User
  participants?: User[]
  createdAt: Date
  description: string
  deadline: Date
  status: TaskStatus
}