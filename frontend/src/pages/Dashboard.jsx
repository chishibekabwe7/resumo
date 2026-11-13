import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { createSampleResume } from '../lib/sampleResume'

function formatDate(iso) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso))
}

function Dashboard({ resumes, createResume, duplicateResume, deleteResume }) {
  const navigate = useNavigate()
  const [pendingDelete, setPendingDelete] = useState(null)

  useEffect(() => {
    document.title = 'Resumo | Dashboard'
  }, [])

  const sorted = useMemo(
    () => [...resumes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [resumes]
  )

  const handleNew = () => {
    const resume = createResume()
    navigate(`/editor/${resume.id}`)
  }

  const handleTryExample = () => {
    const resume = createResume(createSampleResume())
    navigate(`/editor/${resume.id}`)
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">My Resumes</h1>
        <button
          type="button"
          className="min-h-11 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue/90"
          onClick={handleNew}
        >
          New resume
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-900">No resumes yet</h2>
          <p className="mt-2 text-sm text-slate-600">Create your first resume or open a fictional example.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button type="button" className="min-h-11 rounded-xl bg-brand-blue px-4 py-2 text-sm font-semibold text-white" onClick={handleNew}>Build my resume</button>
            <button type="button" className="min-h-11 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700" onClick={handleTryExample}>Try with an example</button>
          </div>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((resume) => (
            <li key={resume.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h2 className="truncate text-base font-semibold text-slate-900">{resume.title || 'Untitled Resume'}</h2>
              <p className="mt-1 text-sm text-slate-600">Template: {resume.template}</p>
              <p className="mt-1 text-sm text-slate-600">Last edited {formatDate(resume.updatedAt)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" className="min-h-10 rounded-lg bg-brand-blue px-3 text-sm font-medium text-white" onClick={() => navigate(`/editor/${resume.id}`)}>Open</button>
                <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700" onClick={() => {
                  const item = duplicateResume(resume.id)
                  if (item) navigate(`/editor/${item.id}`)
                }}>Duplicate</button>
                <button type="button" className="min-h-10 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-700" onClick={() => setPendingDelete(resume.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete resume"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteResume(pendingDelete)
          }
          setPendingDelete(null)
        }}
      />
    </section>
  )
}

export default Dashboard
