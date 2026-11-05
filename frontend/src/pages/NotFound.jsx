import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-brand-blue">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you requested does not exist.</p>
      <Link className="mt-8 inline-block text-brand-blue underline" to="/">Return home</Link>
    </section>
  )
}

export default NotFound
