import BoldTemplate from './BoldTemplate'
import ClassicTemplate from './ClassicTemplate'
import ModernTemplate from './ModernTemplate'

export const templateRegistry = [
  { id: 'classic', name: 'Classic', description: 'ATS-friendly single column', supportsPhoto: false, Component: ClassicTemplate },
  { id: 'modern', name: 'Modern', description: 'Two-column with sidebar', supportsPhoto: true, Component: ModernTemplate },
  { id: 'bold', name: 'Bold', description: 'Strong visual header', supportsPhoto: true, Component: BoldTemplate },
]
