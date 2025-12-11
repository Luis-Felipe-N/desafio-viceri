interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string) => Promise<void>
  logout: () => void
}