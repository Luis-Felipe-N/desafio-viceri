import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate, useSearch } from '@tanstack/react-router'

export function TaskFilter() {
  const navigate = useNavigate({ from: '/tasks' })
  const searchParams = useSearch({ from: '/tasks' }) as { query?: string; filter?: FilterMode }

  const [localSearch, setLocalSearch] = useState(searchParams.query || '')

  useEffect(() => {
    setLocalSearch(searchParams.query || '')
  }, [searchParams.query])

  const filterOptions: Array<{ label: string; mode: FilterMode }> = [
    { label: 'Todas', mode: 'all' },
    { label: 'Atrasadas', mode: 'overdue' },
    { label: 'Iniciadas', mode: 'started' },
    { label: 'Concluídas', mode: 'finished' },
    { label: 'Bloqueadas', mode: 'blocked' },
  ]

  let timeOutSearch: any;

  const handleSearchChange = (value: string) => {
    setLocalSearch(value)

    const timeoutId = setTimeout(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          query: value || undefined,
        }),
        replace: true,
      })
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  const handleFilterChange = (mode: FilterMode) => {
    navigate({
      search: (prev) => ({
        ...prev,
        filter: mode,
      }),
    })
  }

  const activeFilter = searchParams.filter || 'all'

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col gap-4">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-3 top-4 size-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por título, descrição ou responsável..."
            className="pl-9 pr-9"
            value={localSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {localSearch && (
            <button
              type="button"
              className="absolute right-3 top-4 text-muted-foreground hover:text-foreground"
              onClick={() => handleSearchChange('')}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.mode

            return (
              <Button
                key={option.mode}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className="relative h-8"
                onClick={() => handleFilterChange(option.mode)}
              >
                {option.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}