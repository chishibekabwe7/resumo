import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function formatDate(isoDate) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(isoDate))
  } catch {
    return 'Recently'
  }
}

function Dashboard({ resumes, createResume, duplicateResume, deleteResume }) {
  const navigate = useNavigate()

  const visibleResumes = useMemo(
    () => resumes.filter((resume) => resume.title || resume.updatedAt),
    [resumes]
  )

  const handleCreate = () => {
    const created = createResume()
    navigate(`/editor/${created.id}`)
  }

  const handleDuplicate = (id) => {
    const duplicated = duplicateResume(id)
    if (duplicated) {
      navigate(`/editor/${duplicated.id}`)
    }
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete this resume? This cannot be undone.')
    if (!confirmed) {
      return
    }

    deleteResume(id)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">My Resumes</h1>
        <button
          type="button"
          className="min-h-11 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          onClick={handleCreate}
        >
          New resume
        </button>
      </div>

      {visibleResumes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">No resumes yet</h2>
          <p className="mt-2 text-sm text-slate-600">Start your first resume and keep editing as needed.</p>
          <button
            type="button"
            className="mt-5 min-h-11 rounded-xl bg-brand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={handleCreate}
          >
            Build my resume
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResumes.map((resume) => (
            <li key={resume.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <button
                type="button"
                className="w-full rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                onClick={() => navigate(`/editor/${resume.id}`)}
              >
                <p className="truncate text-base font-semibold text-slate-900">{resume.title || 'Untitled Resume'}</p>
                <p className="mt-1 text-sm text-slate-600">Last edited {formatDate(resume.updatedAt)}</p>
              </button>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  onClick={() => handleDuplicate(resume.id)}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  className="min-h-10 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() => handleDelete(resume.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Dashboard
