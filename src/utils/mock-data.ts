import type { Task } from "@/types/task"

const getRelativeDate = (daysOffset: number) => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return date
}

export const MOCK_TASKS: Task[] = [
  {
    id: 't-01',
    title: 'Definir contrato de escopo',
    owner: 'PMO',
    description: 'Fechar alinhamentos com diretoria e stakeholders chave.',
    deadline: getRelativeDate(2),
    status: 'INICIADA',
  },
  {
    id: 't-02',
    title: 'Configurar estrutura inicial',
    owner: 'Frontend',
    description: 'Base do projeto com Vite, Tailwind e padrões compartilhados.',
    deadline: getRelativeDate(-1),
    status: 'CONCLUIDA',
  },
  {
    id: 't-03',
    title: 'Implementar Context API',
    owner: 'Produto',
    description: 'Criar camada de estado global para tasks e filtros.',
    deadline: getRelativeDate(1),
    status: 'INICIADA',
  },
  {
    id: 't-04',
    title: 'Integração com pagamentos',
    owner: 'Backend',
    description: 'Rota de conciliação aguardando credenciais da financeira.',
    deadline: getRelativeDate(5),
    status: 'BLOQUEADA',
  },
  {
    id: 't-05',
    title: 'Criar testes críticos',
    owner: 'QA',
    description: 'Mapear casos de falha para fluxos prioritários.',
    deadline: getRelativeDate(3),
    status: 'INICIADA',
  },
]
