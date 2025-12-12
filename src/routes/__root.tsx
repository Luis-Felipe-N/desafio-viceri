import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { AppNavbar } from '@/components/app-navbar'
import { TaskProvider } from '@/context/task-content'
import { AuthProvider } from '@/context/auth-content'

function RootComponent() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <div className="relative min-h-screen bg-background">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-viceri-blue/30 via-viceri-orange/10 to-transparent blur-3xl" />
            <div className="relative z-10">
              <AppNavbar />
              <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-1 flex-col gap-6">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>
        </TaskProvider>
      </AuthProvider>

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
}

export const Route = createRootRoute({
  component: RootComponent,
})
