import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import AiSuggestionModal from '../components/editor/AiSuggestionModal'
import EditorLayout from '../components/editor/EditorLayout'
import EducationForm from '../components/editor/EducationForm'
import ExperienceForm from '../components/editor/ExperienceForm'
import ExportMenu from '../components/editor/ExportMenu'
import PersonalForm from '../components/editor/PersonalForm'
import ProjectsForm from '../components/editor/ProjectsForm'
import SectionAccordion from '../components/editor/SectionAccordion'
import SkillsForm from '../components/editor/SkillsForm'
import SummaryForm from '../components/editor/SummaryForm'
import TailorModal from '../components/editor/TailorModal'
import TemplatePicker from '../components/editor/TemplatePicker'
import { useToast } from '../components/Toast'
import { createEmptyEducation, createEmptyExperience, createEmptyProject } from '../lib/resumeSchema'

function moveInArray(items, index, delta) {
  const target = index + delta
  if (target < 0 || target >= items.length) {
    return items
  }

  const next = [...items]
  const [value] = next.splice(index, 1)
  next.splice(target, 0, value)
  return next
}

function Editor({ getResume, updateResume, saveState }) {
  const { id } = useParams()
  const { pushToast } = useToast()
  const resume = getResume(id)
  const [openSection, setOpenSection] = useState('personal')
  const [showAiMenu, setShowAiMenu] = useState(false)
  const [showTailorModal, setShowTailorModal] = useState(false)
  const [tailorText, setTailorText] = useState('')
  const [tailorResult, setTailorResult] = useState(null)
  const [suggestionModal, setSuggestionModal] = useState({ open: false, field: null, before: '', after: '' })

  const templateSupportsPhoto = useMemo(() => resume?.template !== 'classic', [resume?.template])

  if (!resume) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h1 className="text-xl font-semibold text-slate-900">Resume not found</h1>
        <p className="mt-2 text-sm text-slate-600">This resume does not exist anymore.</p>
        <Link to="/dashboard" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
          Go to dashboard
        </Link>
      </section>
    )
  }

  const patchResume = (patch) => {
    updateResume(resume.id, patch)
  }

  const updatePersonal = (field, value) => {
    patchResume((current) => ({
      ...current,
      personal: {
        ...current.personal,
        [field]: value,
      },
    }))
  }

  const editExperience = (entryId, patch) => {
    patchResume((current) => ({
      ...current,
      experience: current.experience.map((entry) => (entry.id === entryId ? { ...entry, ...patch } : entry)),
    }))
  }

  const moveExperience = (entryId, delta) => {
    patchResume((current) => {
      const index = current.experience.findIndex((entry) => entry.id === entryId)
      return {
        ...current,
        experience: moveInArray(current.experience, index, delta),
      }
    })
  }

  const removeExperience = (entryId) => {
    patchResume((current) => ({
      ...current,
      experience: current.experience.length > 1 ? current.experience.filter((entry) => entry.id !== entryId) : current.experience,
    }))
  }

  const updateBullet = (entryId, bulletIndex, value) => {
    patchResume((current) => ({
      ...current,
      experience: current.experience.map((entry) => {
        if (entry.id !== entryId) {
          return entry
        }
        return {
          ...entry,
          bullets: entry.bullets.map((bullet, index) => (index === bulletIndex ? value : bullet)),
        }
      }),
    }))
  }

  const moveBullet = (entryId, bulletIndex, delta) => {
    patchResume((current) => ({
      ...current,
      experience: current.experience.map((entry) => {
        if (entry.id !== entryId) {
          return entry
        }
        return {
          ...entry,
          bullets: moveInArray(entry.bullets, bulletIndex, delta),
        }
      }),
    }))
  }

  const removeBullet = (entryId, bulletIndex) => {
    patchResume((current) => ({
      ...current,
      experience: current.experience.map((entry) => {
        if (entry.id !== entryId) {
          return entry
        }
        return {
          ...entry,
          bullets: entry.bullets.length > 1 ? entry.bullets.filter((_, index) => index !== bulletIndex) : entry.bullets,
        }
      }),
    }))
  }

  const moveEducation = (entryId, delta) => {
    patchResume((current) => {
      const index = current.education.findIndex((entry) => entry.id === entryId)
      return {
        ...current,
        education: moveInArray(current.education, index, delta),
      }
    })
  }

  const updateEducation = (entryId, patch) => {
    patchResume((current) => ({
      ...current,
      education: current.education.map((entry) => (entry.id === entryId ? { ...entry, ...patch } : entry)),
    }))
  }

  const removeEducation = (entryId) => {
    patchResume((current) => ({
      ...current,
      education: current.education.length > 1 ? current.education.filter((entry) => entry.id !== entryId) : current.education,
    }))
  }

  const updateProject = (entryId, patch) => {
    patchResume((current) => ({
      ...current,
      projects: current.projects.map((entry) => (entry.id === entryId ? { ...entry, ...patch } : entry)),
    }))
  }

  const removeProject = (entryId) => {
    patchResume((current) => ({
      ...current,
      projects: current.projects.length > 1 ? current.projects.filter((entry) => entry.id !== entryId) : current.projects,
    }))
  }

  return (
    <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
      <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/dashboard" className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">Back</Link>
            <label className="text-sm font-medium text-slate-700">Resume title
              <input className="ml-2 min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm" value={resume.title} onChange={(event) => patchResume({ title: event.target.value })} />
            </label>
            <p className="text-xs font-medium text-slate-500">{saveState === 'saving' ? 'Saving...' : 'Saved'}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <TemplatePicker value={resume.template} onChange={(template) => patchResume({ template })} />
            <div className="relative">
              <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700" onClick={() => setShowAiMenu((prev) => !prev)} aria-expanded={showAiMenu}>AI</button>
              {showAiMenu && (
                <div className="absolute right-0 z-20 mt-2 min-w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                  <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100" onClick={() => {
                    setShowTailorModal(true)
                    setShowAiMenu(false)
                  }}>Tailor to a job</button>
                </div>
              )}
            </div>
            <ExportMenu onExport={(type) => pushToast({ message: `${type.toUpperCase()} export is not ready yet.` })} />
          </div>
        </div>
      </div>

      <EditorLayout
        left={(
          <div className="space-y-3">
            <SectionAccordion id="personal" title="Personal details" hint="Add your contact details and profile." openSection={openSection} onToggle={setOpenSection}>
              <PersonalForm
                personal={resume.personal}
                onChange={updatePersonal}
                templateSupportsPhoto={templateSupportsPhoto}
                photoSlot={<p className="text-sm text-slate-500">Photo upload will be enabled in the next part.</p>}
              />
            </SectionAccordion>

            <SectionAccordion id="summary" title="Summary" hint="Write a short role-focused profile." openSection={openSection} onToggle={setOpenSection}>
              <SummaryForm
                value={resume.summary}
                onChange={(summary) => patchResume({ summary })}
                onImprove={() => setSuggestionModal({ open: true, field: 'summary', before: resume.summary, after: resume.summary })}
                onGenerate={() => setSuggestionModal({ open: true, field: 'summary', before: resume.summary, after: resume.summary })}
              />
            </SectionAccordion>

            <SectionAccordion id="experience" title="Experience" hint="Highlight your role impact with bullets." openSection={openSection} onToggle={setOpenSection}>
              <ExperienceForm
                items={resume.experience}
                onChangeItem={editExperience}
                onAdd={() => patchResume((current) => ({ ...current, experience: [...current.experience, createEmptyExperience()] }))}
                onRemove={removeExperience}
                onMove={moveExperience}
                onAddBullet={(entryId) => editExperience(entryId, { bullets: [...(resume.experience.find((entry) => entry.id === entryId)?.bullets || []), ''] })}
                onChangeBullet={updateBullet}
                onRemoveBullet={removeBullet}
                onMoveBullet={moveBullet}
                onImproveBullet={(entryId, bulletIndex, bullet) => setSuggestionModal({ open: true, field: { entryId, bulletIndex }, before: bullet, after: bullet })}
              />
            </SectionAccordion>

            <SectionAccordion id="education" title="Education" hint="List your education history." openSection={openSection} onToggle={setOpenSection}>
              <EducationForm
                items={resume.education}
                onChangeItem={updateEducation}
                onAdd={() => patchResume((current) => ({ ...current, education: [...current.education, createEmptyEducation()] }))}
                onRemove={removeEducation}
                onMove={moveEducation}
              />
            </SectionAccordion>

            <SectionAccordion id="skills" title="Skills" hint="Add concise skills as chips." openSection={openSection} onToggle={setOpenSection}>
              <SkillsForm
                skills={resume.skills}
                onAdd={(skill) => patchResume((current) => ({ ...current, skills: [...current.skills, skill] }))}
                onRemove={(index) => patchResume((current) => ({ ...current, skills: current.skills.filter((_, skillIndex) => skillIndex !== index) }))}
              />
            </SectionAccordion>

            <SectionAccordion id="projects" title="Projects" hint="Optional: add selected project work." openSection={openSection} onToggle={setOpenSection}>
              <ProjectsForm
                items={resume.projects}
                onChangeItem={updateProject}
                onAdd={() => patchResume((current) => ({ ...current, projects: [...current.projects, createEmptyProject()] }))}
                onRemove={removeProject}
              />
            </SectionAccordion>
          </div>
        )}
        right={<ResumePreview resume={resume} />}
      />

      <TailorModal
        open={showTailorModal}
        value={tailorText}
        onChange={setTailorText}
        onClose={() => setShowTailorModal(false)}
        onRun={() => {
          setTailorResult({ suggestions: [], missingKeywords: [] })
        }}
        result={tailorResult}
        onApplySuggestion={() => {}}
      />

      <AiSuggestionModal
        open={suggestionModal.open}
        title="AI suggestion"
        beforeText={suggestionModal.before}
        afterText={suggestionModal.after}
        onKeep={() => setSuggestionModal({ open: false, field: null, before: '', after: '' })}
        onUse={() => {
          if (suggestionModal.field === 'summary') {
            patchResume({ summary: suggestionModal.after })
          } else if (suggestionModal.field) {
            updateBullet(suggestionModal.field.entryId, suggestionModal.field.bulletIndex, suggestionModal.after)
          }
          setSuggestionModal({ open: false, field: null, before: '', after: '' })
        }}
      />
    </section>
  )
}

export default Editor
