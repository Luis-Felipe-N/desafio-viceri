import { LogOut } from 'lucide-react'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Badge } from './ui/badge'

import { useAuth } from '@/context/auth-content'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { AuthPromptDialog } from './feature/auth-prompt-dialog'
import { CreateTaskDialog } from './feature/create-task'

export function AppNavbar() {

  const { user, isAuthenticated, logout } = useAuth()
  const displayName = user?.name ?? 'Visitante'
  const displaySquad = user?.squad ?? 'Sem squad'
  const displayEmail = user?.email ?? 'anonimo@viceri.com'

  return (
    <header className="md:px-6 ps-3 mx-auto py-4 max-w-7xl">
      <div className="flex items-center justify-between gap-4">
        <img src="https://viceri.com.br/wp-content/uploads/2022/06/viceri-seidor-logo.svg" alt="Logo" width={170} />

        <div className='flex h-14 gap-4 items-center'>
          <CreateTaskDialog />
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 h-full rounded-xl hover:bg-white/50 px-4 ps-6 py-4"
                >
                  <div className="grid text-end text-sm py-4">
                    <span className="text-viceri-blue font-semibold">{displayName}</span>
                    <span className="truncate text-xs text-viceri-muted-blue/70">{displaySquad}</span>
                  </div>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage
                      src={user?.imageUrl || undefined}
                      alt={displayName}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg bg-viceri-blue/10 text-viceri-blue font-semibold text-sm">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 space-y-4 rounded-xl shadow-none border-none">
                <div className='text-end'>
                  <p className="text-sm font-semibold text-foreground">{displayName}</p>
                  <p className="text-xs text-muted-foreground">{displayEmail}</p>
                  <Badge variant="outline" className="mt-2 inline-flex items-center gap-1 text-[11px]">
                    {displaySquad}
                  </Badge>
                </div>


                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 text-destructive hover:bg-destructive/10"
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  Sair
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <AuthPromptDialog />
          )}
        </div>
      </div>
    </header>
  )
}
