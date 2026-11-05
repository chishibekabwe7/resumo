import { Link } from 'react-router-dom'
import logo from '../assets/resumo-logo-color.png'

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" aria-label="Resumo home">
          <img src={logo} alt="Resumo" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link className="hover:text-brand-blue" to="/dashboard">Dashboard</Link>
          <Link className="hover:text-brand-blue" to="/editor">Editor</Link>
          <Link className="rounded-full bg-brand-blue px-4 py-2 text-white hover:bg-brand-blue/90" to="/login">Log in</Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
