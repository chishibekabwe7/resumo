import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-brand-blue">Dashboard</h1>
      <p className="mt-4 text-slate-600">Your saved resumes will appear here.</p>
      <Link className="mt-8 inline-block text-brand-blue underline" to="/editor">Open the editor</Link>
    </section>
  )
}

export default Dashboard
