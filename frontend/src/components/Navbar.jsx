import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/resumo-logo-color.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Resumo home" className="flex items-center">
            <img src={logo} alt="Resumo" className="h-10 w-auto" />
          </Link>

          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <Link className="rounded-md px-2 py-1 hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue" to="/dashboard">
              My Resumes
            </Link>
            <button
              type="button"
              className="rounded-md border border-slate-300 px-3 py-2 hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Sign in
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-nav" className="mt-3 space-y-2 border-t border-slate-200 pt-3 md:hidden">
            <Link
              className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              to="/dashboard"
              onClick={() => setIsOpen(false)}
            >
              My Resumes
            </Link>
            <button
              type="button"
              className="w-full rounded-lg border border-slate-300 px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </button>
          </div>
        )}
      </nav>
      {/* TODO: Wire Sign in to Supabase Auth. */}
    </header>
  )
}

export default Navbar
