import { Link, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import { Check, Home } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { is } from 'zod/v4/locales'

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
    <header className="md:px-6 mx-auto py-4 max-w-7xl">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-2 md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigation.map((link) => (
                    <NavigationMenuItem key={link.title} className="w-full">
                      <NavigationMenuLink
                        href={link.to}
                        className="py-1.5"

                      >
                        {link.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
        <Link to="/" className="flex flex-1   not-only-of-type:not-visited: items-center gap-3">
          <img src="https://viceri.com.br/wp-content/uploads/2022/06/viceri-seidor-logo.svg" alt="Logo" width={170} />
        </Link>

        <NavigationMenu className="max-md:hidden flex-1">
          <NavigationMenuList className="gap-2">
            {navigation.map((link) => {
              const isActive = pathname === link.to

              return (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink
                    active={isActive}
                    href={link.to}
                    className={cn(
                      "text-viceri-blue px-4 rounded-md hover:text-primary border-b-primary h-full justify-center border-y-2 border-transparent py-1.5 font-medium",
                      isActive && 'bg-viceri-orange text-white font-bold',
                    )}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>

              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center flex-1 justify-end gap-2">
          USUÁrio
        </div>
      </div>
    </header>
  )
}
