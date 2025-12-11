import type { Task } from "@/types/task"
import { MOCK_USERS } from "./mock-user"

const getRelativeDate = (daysOffset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date
}

const user = (id: string) => {
  return MOCK_USERS.find((user) => user.id === id)!
}

export const MOCK_TASKS: Task[] = [
  {
    id: 't-01',
    title: 'Definir contrato de escopo',
    owner: user('u-01'),
    participants: [user('u-02'), user('u-03')],
    createdAt: getRelativeDate(-5),
    description: 'Fechar alinhamentos com diretoria e stakeholders chave.',
    deadline: getRelativeDate(2),
    status: 'INICIADA',
  },
  {
    id: 't-02',
    title: 'Configurar estrutura inicial',
    owner: user('u-02'),
    participants: [user('u-04')],
    createdAt: getRelativeDate(-10),
    description: 'Base do projeto com Vite, Tailwind e padrões compartilhados.',
    deadline: getRelativeDate(-1),
    status: 'CONCLUIDA',
  },
  {
    id: 't-03',
    title: 'Implementar Context API',
    owner: user('u-03'),
    participants: [user('u-01'), user('u-05')],
    createdAt: getRelativeDate(-3),
    description: 'Criar camada de estado global para tasks e filtros.',
    deadline: getRelativeDate(1),
    status: 'INICIADA',
  },
  {
    id: 't-04',
    title: 'Integração com pagamentos',
    owner: user('u-04'),
    participants: [user('u-02')],
    createdAt: getRelativeDate(-7),
    description: 'Rota de conciliação aguardando credenciais da financeira.',
    deadline: getRelativeDate(5),
    status: 'BLOQUEADA',
  },
  {
    id: 't-05',
    title: 'Criar testes críticos',
    owner: user('u-05'),
    participants: [],
    createdAt: getRelativeDate(-2),
    description: 'Mapear casos de falha para fluxos prioritários.',
    deadline: getRelativeDate(3),
    status: 'INICIADA',
  },
]
