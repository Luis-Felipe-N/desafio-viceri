type Squard = 'Frontend' | 'Backend' | 'Fullstack' | 'Design' | 'QA'

export interface User {
  id: string
  name: string
  email: string
  squard: Squard
  imageUrl?: string
}