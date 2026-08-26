export type ProjectCategory = 'All' | 'Web' | 'AI' | 'Data' | 'Backend' | 'SaaS'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  shortDescription: string
  image: string
  technologies: string[]
  githubUrl?: string
  demoUrl?: string
  
  // Champs pour la vue détaillée (modal ou page produit)
  context?: string
  problem?: string
  solution?: string
  role?: string
  challenges?: string
  learnings?: string
  results?: string
}