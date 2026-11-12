const DEFAULT_TEMPLATE = 'classic'

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `resume-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createEntryId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}

export function createEmptyResume() {
  const now = new Date().toISOString()

  return {
    id: createId(),
    title: 'Untitled Resume',
    template: DEFAULT_TEMPLATE,
    updatedAt: now,
    personalDetails: {
      fullName: '',
      role: '',
      email: '',
      phone: '',
      location: '',
      links: '',
      photo: '',
    },
    summary: '',
    experience: [
      {
        id: createEntryId('exp'),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        location: '',
        bullets: [''],
      },
    ],
    education: [
      {
        id: createEntryId('edu'),
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        location: '',
      },
    ],
    skills: [''],
    projects: [
      {
        id: createEntryId('proj'),
        name: '',
        description: '',
        link: '',
      },
    ],
  }
}

export const resumeTemplateOptions = [
  {
    value: DEFAULT_TEMPLATE,
    label: 'Classic',
  },
]
