type Squard = 'Frontend' | 'Backend' | 'Fullstack' | 'Design' | 'QA'

export interface User {
  id: string
  name: string
  email: string
  squad: Squard
  imageUrl?: string
}