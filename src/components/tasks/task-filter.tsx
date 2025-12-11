import { useState, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { useTasks } from '@/context/task-content'

type FilterMode = 'all' | 'overdue' | 'iniciada' | 'concluida' | 'bloqueada'

export function TaskFilter() {
  const { tasks } = useTasks()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterMode>('all')

  const filterOptions: Array<{ label: string; mode: FilterMode }> = [
    { label: 'Todas', mode: 'all' },
    { label: 'Atrasadas', mode: 'overdue' },
    { label: 'Iniciadas', mode: 'iniciada' },
    { label: 'Concluídas', mode: 'concluida' },
    { label: 'Bloqueadas', mode: 'bloqueada' },
  ]

  const getOverdueCount = useCallback(() => {
    const now = new Date()
    return tasks.filter((task) => task.deadline < now && task.status !== 'CONCLUIDA').length
  }, [tasks])

  const getTasksByFilter = useCallback(() => {
    let filtered = tasks

    if (activeFilter === 'overdue') {
      const now = new Date()
      filtered = tasks.filter(
        (task) => task.deadline < now && task.status !== 'CONCLUIDA'
      )
    } else if (activeFilter !== 'all') {
      const statusMap: Record<FilterMode, string> = {
        all: '',
        overdue: '',
        iniciada: 'INICIADA',
        concluida: 'CONCLUIDA',
        bloqueada: 'BLOQUEADA',
      }
      const status = statusMap[activeFilter]
      if (status) {
        filtered = tasks.filter((task) => task.status === status)
      }
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term) ||
          task.owner.toLowerCase().includes(term)
      )
    }

    return filtered
  }, [tasks, activeFilter, searchTerm])

  const filteredTasks = getTasksByFilter()
  const overdueCount = getOverdueCount()

  return (
    <div className="space-y-4">
      <div className="border-b pb-4">
        <form className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-2 w-full md:max-w-xl">
            <label htmlFor="search" className="text-sm font-medium">
              Buscar
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 size-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Pesquisar por título, descrição ou responsável..."
                className="pl-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {filteredTasks.length} resultado{filteredTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.mode
          const count = option.mode === 'overdue' ? overdueCount : null

          return (
            <Button
              key={option.mode}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className="relative"
              onClick={() => setActiveFilter(option.mode)}
            >
              {option.label}
              {count !== null && count > 0 && (
                <Badge
                  variant="secondary"
                  className="absolute -top-2 -right-2 size-5 p-0 flex items-center justify-center text-xs"
                >
                  {count}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}