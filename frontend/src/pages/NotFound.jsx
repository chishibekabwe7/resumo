import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  useEffect(() => {
    document.title = 'Resumo | Not found'
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The page you requested does not exist.</p>
      <Link to="/" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white">
        Back home
      </Link>
    </section>
  )
}

export default NotFound
