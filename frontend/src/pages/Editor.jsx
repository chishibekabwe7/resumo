import { Link } from 'react-router-dom'

function Editor() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-brand-blue">Resume Editor</h1>
      <p className="mt-4 text-slate-600">The guided resume editor is coming next.</p>
      <Link className="mt-8 inline-block text-brand-blue underline" to="/dashboard">Back to Dashboard</Link>
    </section>
  )
}

export default Editor
