import { Link, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Check, Home } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const workspace = {
  name: 'Luis Felipe',
  squad: 'Frontend'
}

type NavItem = {
  title: string
  icon: LucideIcon
  to?: string
  href?: string
  badge?: string
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

export function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-lg font-semibold">
                  LF
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">{workspace.name}</span>
                  <span className="text-xs text-sidebar-foreground/70">{workspace.squad}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.to ? (
                    <SidebarMenuButton asChild isActive={pathname === item.to}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.href ?? '#'} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                  {item.badge ? (
                    <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#profile" className="flex items-center gap-2">
                <div className="bg-sidebar-primary/10 text-sidebar-primary flex size-8 items-center justify-center rounded-full font-semibold">
                  LN
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">Luis Nunes</span>
                  <span className="text-xs text-sidebar-foreground/70">Frontend Trainee</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
