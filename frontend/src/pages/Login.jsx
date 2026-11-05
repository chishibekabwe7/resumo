import { Link } from 'react-router-dom'

function Login() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-brand-blue">Log in to Resumo</h1>
      <p className="mt-4 text-slate-600">Authentication will be connected in a future step.</p>
      <Link className="mt-8 inline-block text-brand-blue underline" to="/">Back to Home</Link>
    </section>
  )
}

export default Login
