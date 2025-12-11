export type TaskStatus = 'INICIADA' | 'BLOQUEADA' | 'CONCLUIDA'

export type Task = {
  id: string
  title: string
  owner: string
  description: string
  deadline: Date
  status: TaskStatus
}