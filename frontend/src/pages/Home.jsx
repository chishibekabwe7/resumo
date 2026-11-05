import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-20">
      <div className="max-w-3xl">
        <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-brand-green">AI-assisted resume builder</p>
        <h1 className="text-5xl font-bold tracking-tight text-brand-blue sm:text-6xl">
          Build more resumes. Land more interviews.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Create polished, tailored resumes from your details and get ready to apply with confidence.
        </p>
        <Link className="mt-8 inline-flex rounded-full bg-brand-green px-6 py-3 font-semibold text-slate-950 hover:bg-brand-green/90" to="/login">
          Get Started
        </Link>
      </div>
    </section>
  )
}

export default Home
