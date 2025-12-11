import { Link, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Check, Home } from 'lucide-react'

import { cn } from '@/lib/utils'

const workspace = {
  name: 'Luis Felipe',
  squad: 'Frontend',
}

type NavItem = {
  title: string
  icon: LucideIcon
  to: string
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    icon: Home,
    to: '/',
  },
  {
    title: 'Tasks',
    icon: Check,
    to: '/tasks',
  },
]

export function AppNavbar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg font-semibold">
            LF
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{workspace.name}</p>
            <span className="text-xs text-muted-foreground">{workspace.squad}</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.to
            return (
              <Link
                key={item.title}
                to={item.to}
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                <item.icon className="size-4" />
                {item.title}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="text-right">
            <p className="font-medium">Luis Nunes</p>
            <span className="text-xs text-muted-foreground">Frontend Trainee</span>
          </div>
          <div className="bg-muted flex size-10 items-center justify-center rounded-full text-sm font-semibold">
            LN
          </div>
        </div>
      </div>
    </nav>
  )
}
