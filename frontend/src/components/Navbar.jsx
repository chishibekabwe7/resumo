import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/resumo-logo-color.png'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6" aria-label="Main">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Resumo home">
            <img src={logo} alt="Resumo" className="h-10 w-auto" />
          </Link>

          <button
            type="button"
            className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-controls="navbar-mobile"
            aria-expanded={isOpen}
          >
            Menu
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/dashboard"
              className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              My Resumes
            </Link>
            <button
              type="button"
              className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Sign in
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="navbar-mobile" className="mt-3 space-y-2 border-t border-slate-200 pt-3 md:hidden">
            <Link
              to="/dashboard"
              className="block min-h-11 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              My Resumes
            </Link>
            <button
              type="button"
              className="block min-h-11 w-full rounded-lg border border-slate-300 px-3 py-3 text-left text-sm font-medium text-slate-700"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </button>
          </div>
        )}
      </nav>
      {/* TODO: Connect Sign in button to Supabase Auth. */}
    </header>
  )
}

export default Navbar
