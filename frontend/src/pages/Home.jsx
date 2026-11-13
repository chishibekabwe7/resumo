import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createSampleResume } from '../lib/sampleResume'

const steps = ['Enter your details', 'Choose a template', 'Export and apply']

function Home({ createResume }) {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Resumo | Home'
  }, [])

  const handleBuild = () => {
    const resume = createResume()
    navigate(`/editor/${resume.id}`)
  }

  const handleTryExample = () => {
    const sample = createResume(createSampleResume())
    navigate(`/editor/${sample.id}`)
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-5xl">
          Build more resumes. Land more interviews.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
          Build a clear resume quickly, tailor it for each role, and export when you are ready.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-blue px-6 py-3 text-base font-semibold text-white hover:bg-brand-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={handleBuild}
          >
            Build my resume
          </button>
          <button
            type="button"
            className="min-h-11 rounded-lg px-2 py-2 text-sm font-semibold text-brand-blue underline-offset-4 hover:underline"
            onClick={handleTryExample}
          >
            Try with an example
          </button>
        </div>
      </div>

      <ol className="mt-8 grid gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 sm:grid-cols-3 sm:gap-4 sm:p-6">
        {steps.map((step, index) => (
          <li key={step} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-xs font-semibold text-slate-900">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Home
