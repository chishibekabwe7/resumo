function renderLines(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function ResumePreview({ resume }) {
  const details = resume.personalDetails
  const skills = resume.skills.map((skill) => skill.trim()).filter(Boolean)

  return (
    <section className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
      <div className="mx-auto aspect-[210/297] w-full min-w-[320px] max-w-[760px] bg-white p-5 text-slate-900 shadow-sm md:p-8">
        <header className="border-b border-slate-200 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-brand-blue">{details.fullName || 'Your Name'}</h1>
              <p className="mt-1 text-sm font-medium text-slate-700">{details.role || 'Professional Title'}</p>
              <p className="mt-2 text-xs text-slate-600">
                {[details.email, details.phone, details.location].filter(Boolean).join(' • ') ||
                  'email@example.com • +123 456 7890 • City, Country'}
              </p>
              {details.links && <p className="mt-1 text-xs text-slate-600">{details.links}</p>}
            </div>
            {details.photo && (
              <img src={details.photo} alt="Profile" className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20" />
            )}
          </div>
        </header>

        <main className="mt-4 space-y-4 text-sm">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Summary</h2>
            <p className="mt-1 leading-6 text-slate-700">
              {resume.summary || 'Add a short professional summary that highlights your impact.'}
            </p>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Experience</h2>
            <div className="mt-2 space-y-3">
              {resume.experience.map((item) => {
                const bullets = item.bullets.map((bullet) => bullet.trim()).filter(Boolean)
                return (
                  <article key={item.id}>
                    <p className="font-semibold text-slate-900">{item.role || 'Role'}{item.company ? `, ${item.company}` : ''}</p>
                    <p className="text-xs text-slate-500">{[item.startDate, item.endDate || 'Present', item.location].filter(Boolean).join(' • ')}</p>
                    {bullets.length > 0 && (
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-700">
                        {bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Education</h2>
            <div className="mt-2 space-y-2">
              {resume.education.map((item) => (
                <article key={item.id}>
                  <p className="font-semibold text-slate-900">{item.degree || 'Degree'}{item.school ? `, ${item.school}` : ''}</p>
                  <p className="text-xs text-slate-500">{[item.startDate, item.endDate, item.location].filter(Boolean).join(' • ')}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Skills</h2>
            <p className="mt-1 text-slate-700">{skills.length > 0 ? skills.join(' • ') : 'Add your key skills.'}</p>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-blue">Projects</h2>
            <div className="mt-2 space-y-2">
              {resume.projects
                .filter((project) => project.name || project.description || project.link)
                .map((project) => (
                  <article key={project.id}>
                    <p className="font-semibold text-slate-900">{project.name || 'Project name'}</p>
                    <p className="text-slate-700">{renderLines(project.description).join(' ')}</p>
                    {project.link && <p className="text-xs text-slate-500">{project.link}</p>}
                  </article>
                ))}
            </div>
          </section>
        </main>
      </div>
    </section>
  )
}

export default ResumePreview
