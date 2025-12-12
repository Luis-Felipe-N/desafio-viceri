import type { User } from "./user"

export type TaskStatus = 'started' | 'bloqued' | 'finished'

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