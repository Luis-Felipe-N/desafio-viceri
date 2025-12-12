import type { User } from "@/types/user"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (name: string, squard: string) => void
  logout: () => void
}

const STORAGE_KEY = 'viceri-user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User)
    }
  }, [])

  const login = (name: string, squard: string) => {
    const createdUser: User = {
      id: crypto.randomUUID(),
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@viceri.com`,
      squard: squard as User['squard'],
      imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    }

    setUser(createdUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createdUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}