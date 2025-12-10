import type { Task } from "@/types/task"


const getRelativeDateLabel = (daysOffset: number) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return formatter.format(date)
}

export const MOCK_TASKS: Task[] = [
  {
    id: 't-01',
    title: 'Definir contrato de escopo',
    owner: 'PMO',
    initials: 'PM',
    description: 'Fechar alinhamentos com diretoria e stakeholders chave.',
    due: getRelativeDateLabel(2),
    status: 'INICIADA',
  },
  {
    id: 't-02',
    title: 'Configurar estrutura inicial',
    owner: 'Frontend',
    initials: 'FE',
    description: 'Base do projeto com Vite, Tailwind e padrões compartilhados.',
    due: getRelativeDateLabel(-1),
    status: 'CONCLUIDA',
  },
  {
    id: 't-03',
    title: 'Implementar Context API',
    owner: 'Produto',
    initials: 'PD',
    description: 'Criar camada de estado global para tasks e filtros.',
    due: getRelativeDateLabel(1),
    status: 'INICIADA',
  },
  {
    id: 't-04',
    title: 'Integração com pagamentos',
    owner: 'Backend',
    initials: 'BE',
    description: 'Rota de conciliação aguardando credenciais da financeira.',
    due: getRelativeDateLabel(5),
    status: 'BLOQUEADA',
  },
  {
    id: 't-05',
    title: 'Criar testes críticos',
    owner: 'QA',
    initials: 'QA',
    description: 'Mapear casos de falha para fluxos prioritários.',
    due: getRelativeDateLabel(3),
    status: 'INICIADA',
  },
]
