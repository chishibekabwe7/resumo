// TODO: Connect these stubs to the backend AI service.
export async function improveSummaryWithAi(summary) {
  const text = summary.trim()
  return Promise.resolve(
    text
      ? `Results-focused professional with a track record of delivering clear outcomes and strong collaboration.`
      : 'Results-focused professional with strong communication, ownership, and consistent delivery.'
  )
}

// TODO: Connect these stubs to the backend AI service.
export async function improveExperienceBulletWithAi(bullet) {
  const text = bullet.trim()
  return Promise.resolve(
    text
      ? `${text.replace(/\.$/, '')} with measurable impact and clear ownership.`
      : 'Led cross-functional work that improved delivery speed and quality outcomes.'
  )
}

// TODO: Connect these stubs to the backend AI service.
export async function tailorResumeToJob(jobDescription) {
  const text = jobDescription.trim()
  if (!text) {
    return Promise.resolve({
      summary: 'Paste a job description to generate tailored suggestions.',
    })
  }

  return Promise.resolve({
    summary: 'Tailored profile: aligns experience and skills to the job requirements and expected outcomes.',
  })
}
