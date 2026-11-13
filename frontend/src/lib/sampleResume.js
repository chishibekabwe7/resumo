import { createEmptyResume } from './resumeSchema'

export function createSampleResume() {
  const resume = createEmptyResume()

  return {
    ...resume,
    title: 'Alex Sample Resume',
    personal: {
      fullName: 'Alex Sample',
      role: 'Product Operations Specialist',
      email: 'alex.sample@example.com',
      phone: '+1 555 010 2000',
      location: 'Nairobi, Kenya',
      website: 'https://alexsample.dev',
      linkedin: 'linkedin.com/in/alexsample',
      github: 'github.com/alexsample',
      photo: null,
    },
    summary:
      'Detail-focused operations specialist who improves team workflows, simplifies reporting, and keeps projects on schedule across distributed teams.',
    experience: [
      {
        id: crypto.randomUUID(),
        company: 'Maple River Labs',
        title: 'Product Operations Specialist',
        location: 'Remote',
        startDate: '2022-03',
        endDate: '',
        current: true,
        bullets: [
          'Built a weekly planning system that reduced missed tasks across three squads.',
          'Maintained release notes and internal documentation used by support and onboarding teams.',
          'Coordinated cross-team check-ins and removed blockers before release deadlines.',
        ],
      },
      {
        id: crypto.randomUUID(),
        company: 'Northbridge Digital',
        title: 'Operations Coordinator',
        location: 'Kampala, Uganda',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        bullets: [
          'Standardized intake forms and improved response times for incoming client requests.',
          'Prepared monthly performance summaries for leadership and project leads.',
        ],
      },
    ],
    education: [
      {
        id: crypto.randomUUID(),
        school: 'East Africa Institute of Technology',
        degree: 'BSc',
        field: 'Information Systems',
        startDate: '2015-09',
        endDate: '2019-05',
        details: 'Focused on systems analysis, communication, and project planning.',
      },
    ],
    skills: ['Workflow design', 'Project coordination', 'Documentation', 'Cross-team communication'],
    projects: [
      {
        id: crypto.randomUUID(),
        name: 'Ops Handbook Refresh',
        link: 'https://alexsample.dev/ops-handbook',
        description: 'Reorganized internal process guides into a searchable handbook used by onboarding hires.',
      },
    ],
    updatedAt: new Date().toISOString(),
  }
}
