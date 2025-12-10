import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const routeTitles: Record<
  string,
  {
    label: string
  }
> = {
  '/': {
    label: 'dashboard',
  },
  '/tasks': {
    label: 'tasks',
  },
}

export const Route = createRootRoute({
  component: () => {
    const pathname = useRouterState({
      select: (state) => state.location.pathname,
    })
    const current = routeTitles[pathname] ?? routeTitles['/']

    return (
      <>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6">
              <SidebarTrigger className="-ml-1" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {current.label}
                </span>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-6 p-6">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </>
    )
  },
})
