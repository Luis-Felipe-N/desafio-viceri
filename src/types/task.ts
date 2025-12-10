export type TaskStatus = 'INICIADA' | 'BLOQUEADA' | 'CONCLUIDA'

export type Task = {
  id: string
  title: string
  owner: string
  initials: string
  description: string
  due: string
  status: TaskStatus
}