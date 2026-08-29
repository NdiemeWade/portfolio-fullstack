export interface Skill {
  id: string
  name: string
  category: string
  level: 'Advanced' | 'Intermediate' | 'Learning'
  description?: string
  icon_url?: string
  display_order?: number
}