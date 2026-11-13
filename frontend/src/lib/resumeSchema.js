const TEMPLATE_DEFAULT = 'classic'

function newId() {
  return crypto.randomUUID()
}

function emptyExperience() {
  return {
    id: newId(),
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: [''],
  }
}

function emptyEducation() {
  return {
    id: newId(),
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    details: '',
  }
}

function emptyProject() {
  return {
    id: newId(),
    name: '',
    link: '',
    description: '',
  }
}

export function createEmptyResume() {
  return {
    id: newId(),
    title: 'Untitled Resume',
    template: TEMPLATE_DEFAULT,
    updatedAt: new Date().toISOString(),
    personal: {
      fullName: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      photo: null,
    },
    summary: '',
    experience: [emptyExperience()],
    education: [emptyEducation()],
    skills: [],
    projects: [emptyProject()],
  }
}

export function createEmptyExperience() {
  return emptyExperience()
}

export function createEmptyEducation() {
  return emptyEducation()
}

export function createEmptyProject() {
  return emptyProject()
}

export const resumeTemplateOptions = [
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'bold', label: 'Bold' },
]
