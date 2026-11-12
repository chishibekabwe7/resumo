import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import {
  improveExperienceBulletWithAi,
  improveSummaryWithAi,
  tailorResumeToJob,
} from '../lib/ai'
import { exportDocx, exportHtml, exportPdf, exportPng } from '../lib/export'
import { resumeTemplateOptions } from '../lib/resumeSchema'

function Section({ id, title, openSection, onToggle, children }) {
  const isOpen = openSection === id

  return (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <button
        type="button"
        className="flex min-h-12 w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="text-slate-500">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="space-y-4 border-t border-slate-100 px-4 py-4">{children}</div>}
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <input
        {...props}
        className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
      />
    </label>
  )
}

function Textarea({ label, rows = 4, ...props }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <textarea
        {...props}
        rows={rows}
        className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
      />
    </label>
  )
}

function Editor({ resumes, saveStatus, createResume, updateResume }) {
  const navigate = useNavigate()
  const { id: resumeId } = useParams()
  const creationHandled = useRef(false)

  const [openSection, setOpenSection] = useState('personal')
  const [mobileTab, setMobileTab] = useState('edit')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showTailorModal, setShowTailorModal] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [loadingSummaryAi, setLoadingSummaryAi] = useState(false)
  const [loadingTailorAi, setLoadingTailorAi] = useState(false)
  const [activeBulletAi, setActiveBulletAi] = useState('')

  useEffect(() => {
    if (resumeId || creationHandled.current) {
      return
    }

    creationHandled.current = true
    const created = createResume()
    navigate(`/editor/${created.id}`, { replace: true })
  }, [createResume, navigate, resumeId])

  const resume = useMemo(
    () => resumes.find((item) => item.id === resumeId) ?? null,
    [resumeId, resumes]
  )

  useEffect(() => {
    if (!resumeId || resume || creationHandled.current) {
      return
    }

    creationHandled.current = true
    const created = createResume()
    navigate(`/editor/${created.id}`, { replace: true })
  }, [createResume, navigate, resume, resumeId])

  if (!resume) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-sm text-slate-600">Loading editor...</p>
      </section>
    )
  }

  const updateCurrentResume = (updater) => {
    updateResume(resume.id, updater)
  }

  const updatePersonal = (field, value) => {
    updateCurrentResume((current) => ({
      ...current,
      personalDetails: {
        ...current.personalDetails,
        [field]: value,
      },
    }))
  }

  const updateExperience = (entryId, updater) => {
    updateCurrentResume((current) => ({
      ...current,
      experience: current.experience.map((item) => (item.id === entryId ? updater(item) : item)),
    }))
  }

  const updateEducation = (entryId, updater) => {
    updateCurrentResume((current) => ({
      ...current,
      education: current.education.map((item) => (item.id === entryId ? updater(item) : item)),
    }))
  }

  const updateProject = (entryId, updater) => {
    updateCurrentResume((current) => ({
      ...current,
      projects: current.projects.map((item) => (item.id === entryId ? updater(item) : item)),
    }))
  }

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const dataUrl = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.readAsDataURL(file)
    })

    updatePersonal('photo', dataUrl)
  }

  const handleImproveSummary = async () => {
    setLoadingSummaryAi(true)
    const improved = await improveSummaryWithAi(resume.summary)
    updateCurrentResume((current) => ({
      ...current,
      summary: improved,
    }))
    setLoadingSummaryAi(false)
  }

  const handleImproveBullet = async (entryId, bulletIndex, currentValue) => {
    const key = `${entryId}-${bulletIndex}`
    setActiveBulletAi(key)
    const improved = await improveExperienceBulletWithAi(currentValue)

    updateExperience(entryId, (entry) => ({
      ...entry,
      bullets: entry.bullets.map((bullet, index) => (index === bulletIndex ? improved : bullet)),
    }))

    setActiveBulletAi('')
  }

  const handleTailor = async () => {
    setLoadingTailorAi(true)
    const tailored = await tailorResumeToJob(jobDescription)
    updateCurrentResume((current) => ({
      ...current,
      summary: tailored.summary,
    }))
    setLoadingTailorAi(false)
    setShowTailorModal(false)
  }

  const exportItems = [
    { label: 'PDF', action: exportPdf },
    { label: 'DOCX', action: exportDocx },
    { label: 'HTML', action: exportHtml },
    { label: 'PNG', action: exportPng },
  ]

  return (
    <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="text-sm font-medium text-slate-700">
            Resume title
            <input
              value={resume.title}
              onChange={(event) =>
                updateCurrentResume((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 md:w-72"
            />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-sm font-medium text-slate-700">
              Template
              <select
                value={resume.template}
                onChange={(event) =>
                  updateCurrentResume((current) => ({
                    ...current,
                    template: event.target.value,
                  }))
                }
                className="ml-0 mt-1 min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 sm:ml-2 sm:mt-0"
              >
                {resumeTemplateOptions.map((template) => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              onClick={() => setShowTailorModal(true)}
            >
              Tailor to a job
            </button>

            <div className="relative">
              <button
                type="button"
                className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                onClick={() => setShowExportMenu((prev) => !prev)}
                aria-expanded={showExportMenu}
              >
                Export
              </button>

              {showExportMenu && (
                <ul className="absolute right-0 z-10 mt-2 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                  {exportItems.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                        onClick={() => {
                          item.action(resume)
                          setShowExportMenu(false)
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="text-xs font-medium text-slate-500">{saveStatus}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 md:items-start">
        <div className="rounded-2xl bg-slate-100 p-2 md:hidden">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold ${
                mobileTab === 'edit' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600'
              }`}
              onClick={() => setMobileTab('edit')}
            >
              Edit
            </button>
            <button
              type="button"
              className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold ${
                mobileTab === 'preview' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600'
              }`}
              onClick={() => setMobileTab('preview')}
            >
              Preview
            </button>
          </div>
        </div>

        <div className={`space-y-3 ${mobileTab === 'preview' ? 'hidden md:block' : 'block'}`}>
          <Section id="personal" title="Personal details" openSection={openSection} onToggle={setOpenSection}>
            <Input label="Full name" value={resume.personalDetails.fullName} onChange={(event) => updatePersonal('fullName', event.target.value)} />
            <Input label="Role" value={resume.personalDetails.role} onChange={(event) => updatePersonal('role', event.target.value)} />
            <Input label="Email" type="email" value={resume.personalDetails.email} onChange={(event) => updatePersonal('email', event.target.value)} />
            <Input label="Phone" value={resume.personalDetails.phone} onChange={(event) => updatePersonal('phone', event.target.value)} />
            <Input label="Location" value={resume.personalDetails.location} onChange={(event) => updatePersonal('location', event.target.value)} />
            <Input label="Links" placeholder="LinkedIn, portfolio, GitHub" value={resume.personalDetails.links} onChange={(event) => updatePersonal('links', event.target.value)} />
            <label className="block text-sm font-medium text-slate-700">
              Profile photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-brand-green file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-900"
              />
            </label>
          </Section>

          <Section id="summary" title="Summary" openSection={openSection} onToggle={setOpenSection}>
            <Textarea label="Professional summary" value={resume.summary} onChange={(event) => updateCurrentResume((current) => ({ ...current, summary: event.target.value }))} />
            <button
              type="button"
              className="min-h-11 rounded-lg border border-brand-blue px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 disabled:opacity-60"
              onClick={handleImproveSummary}
              disabled={loadingSummaryAi}
            >
              {loadingSummaryAi ? 'Improving...' : 'Improve with AI'}
            </button>
          </Section>

          <Section id="experience" title="Experience" openSection={openSection} onToggle={setOpenSection}>
            {resume.experience.map((entry) => (
              <article key={entry.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
                <Input label="Company" value={entry.company} onChange={(event) => updateExperience(entry.id, (current) => ({ ...current, company: event.target.value }))} />
                <Input label="Role" value={entry.role} onChange={(event) => updateExperience(entry.id, (current) => ({ ...current, role: event.target.value }))} />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input label="Start date" value={entry.startDate} onChange={(event) => updateExperience(entry.id, (current) => ({ ...current, startDate: event.target.value }))} />
                  <Input label="End date" value={entry.endDate} onChange={(event) => updateExperience(entry.id, (current) => ({ ...current, endDate: event.target.value }))} />
                </div>
                <Input label="Location" value={entry.location} onChange={(event) => updateExperience(entry.id, (current) => ({ ...current, location: event.target.value }))} />

                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">Bullet points</p>
                  {entry.bullets.map((bullet, bulletIndex) => {
                    const aiKey = `${entry.id}-${bulletIndex}`
                    return (
                      <div key={aiKey} className="space-y-2 rounded-lg border border-slate-200 p-2">
                        <Textarea
                          label={`Bullet ${bulletIndex + 1}`}
                          rows={3}
                          value={bullet}
                          onChange={(event) =>
                            updateExperience(entry.id, (current) => ({
                              ...current,
                              bullets: current.bullets.map((currentBullet, index) =>
                                index === bulletIndex ? event.target.value : currentBullet
                              ),
                            }))
                          }
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="min-h-10 rounded-lg border border-brand-blue px-3 text-xs font-semibold text-brand-blue hover:bg-brand-blue/5 disabled:opacity-60"
                            onClick={() => handleImproveBullet(entry.id, bulletIndex, bullet)}
                            disabled={activeBulletAi === aiKey}
                          >
                            {activeBulletAi === aiKey ? 'Improving...' : 'Improve with AI'}
                          </button>
                          <button
                            type="button"
                            className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                            onClick={() =>
                              updateExperience(entry.id, (current) => ({
                                ...current,
                                bullets: current.bullets.filter((_, index) => index !== bulletIndex),
                              }))
                            }
                            disabled={entry.bullets.length === 1}
                          >
                            Remove bullet
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  <button
                    type="button"
                    className="min-h-10 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    onClick={() =>
                      updateExperience(entry.id, (current) => ({
                        ...current,
                        bullets: [...current.bullets, ''],
                      }))
                    }
                  >
                    Add bullet
                  </button>
                </div>

                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() =>
                    updateCurrentResume((current) => ({
                      ...current,
                      experience:
                        current.experience.length > 1
                          ? current.experience.filter((item) => item.id !== entry.id)
                          : current.experience,
                    }))
                  }
                  disabled={resume.experience.length === 1}
                >
                  Remove experience
                </button>
              </article>
            ))}

            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              onClick={() =>
                updateCurrentResume((current) => ({
                  ...current,
                  experience: [
                    ...current.experience,
                    {
                      id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                      company: '',
                      role: '',
                      startDate: '',
                      endDate: '',
                      location: '',
                      bullets: [''],
                    },
                  ],
                }))
              }
            >
              Add experience
            </button>
          </Section>

          <Section id="education" title="Education" openSection={openSection} onToggle={setOpenSection}>
            {resume.education.map((entry) => (
              <article key={entry.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
                <Input label="School" value={entry.school} onChange={(event) => updateEducation(entry.id, (current) => ({ ...current, school: event.target.value }))} />
                <Input label="Degree" value={entry.degree} onChange={(event) => updateEducation(entry.id, (current) => ({ ...current, degree: event.target.value }))} />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input label="Start date" value={entry.startDate} onChange={(event) => updateEducation(entry.id, (current) => ({ ...current, startDate: event.target.value }))} />
                  <Input label="End date" value={entry.endDate} onChange={(event) => updateEducation(entry.id, (current) => ({ ...current, endDate: event.target.value }))} />
                </div>
                <Input label="Location" value={entry.location} onChange={(event) => updateEducation(entry.id, (current) => ({ ...current, location: event.target.value }))} />
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() =>
                    updateCurrentResume((current) => ({
                      ...current,
                      education:
                        current.education.length > 1
                          ? current.education.filter((item) => item.id !== entry.id)
                          : current.education,
                    }))
                  }
                  disabled={resume.education.length === 1}
                >
                  Remove education
                </button>
              </article>
            ))}

            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              onClick={() =>
                updateCurrentResume((current) => ({
                  ...current,
                  education: [
                    ...current.education,
                    {
                      id: `edu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                      school: '',
                      degree: '',
                      startDate: '',
                      endDate: '',
                      location: '',
                    },
                  ],
                }))
              }
            >
              Add education
            </button>
          </Section>

          <Section id="skills" title="Skills" openSection={openSection} onToggle={setOpenSection}>
            {resume.skills.map((skill, index) => (
              <div key={`skill-${index}`} className="flex gap-2">
                <Input
                  label={`Skill ${index + 1}`}
                  value={skill}
                  onChange={(event) =>
                    updateCurrentResume((current) => ({
                      ...current,
                      skills: current.skills.map((currentSkill, skillIndex) =>
                        skillIndex === index ? event.target.value : currentSkill
                      ),
                    }))
                  }
                />
                <button
                  type="button"
                  className="mt-6 h-11 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  onClick={() =>
                    updateCurrentResume((current) => ({
                      ...current,
                      skills: current.skills.filter((_, skillIndex) => skillIndex !== index),
                    }))
                  }
                  disabled={resume.skills.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              onClick={() =>
                updateCurrentResume((current) => ({
                  ...current,
                  skills: [...current.skills, ''],
                }))
              }
            >
              Add skill
            </button>
          </Section>

          <Section id="projects" title="Projects (optional)" openSection={openSection} onToggle={setOpenSection}>
            {resume.projects.map((entry) => (
              <article key={entry.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
                <Input label="Project name" value={entry.name} onChange={(event) => updateProject(entry.id, (current) => ({ ...current, name: event.target.value }))} />
                <Textarea label="Description" rows={3} value={entry.description} onChange={(event) => updateProject(entry.id, (current) => ({ ...current, description: event.target.value }))} />
                <Input label="Link" value={entry.link} onChange={(event) => updateProject(entry.id, (current) => ({ ...current, link: event.target.value }))} />
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50"
                  onClick={() =>
                    updateCurrentResume((current) => ({
                      ...current,
                      projects:
                        current.projects.length > 1
                          ? current.projects.filter((item) => item.id !== entry.id)
                          : current.projects,
                    }))
                  }
                  disabled={resume.projects.length === 1}
                >
                  Remove project
                </button>
              </article>
            ))}

            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              onClick={() =>
                updateCurrentResume((current) => ({
                  ...current,
                  projects: [
                    ...current.projects,
                    {
                      id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                      name: '',
                      description: '',
                      link: '',
                    },
                  ],
                }))
              }
            >
              Add project
            </button>
          </Section>
        </div>

        <div className={`${mobileTab === 'edit' ? 'hidden md:block' : 'block'}`}>
          <ResumePreview resume={resume} />
        </div>
      </div>

      {showTailorModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Tailor to a job</h2>
            <p className="mt-1 text-sm text-slate-600">Paste a job description to generate tailored suggestions.</p>
            <Textarea
              label="Job description"
              rows={8}
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
            />
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setShowTailorModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 disabled:opacity-60"
                onClick={handleTailor}
                disabled={loadingTailorAi}
              >
                {loadingTailorAi ? 'Applying...' : 'Apply suggestions'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Editor
