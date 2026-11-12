import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useToast } from './components/Toast'
import { useResumes } from './hooks/useResumes'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function EditorCreateRedirect({ createResume }) {
  const navigate = useNavigate()

  useEffect(() => {
    const resume = createResume()
    navigate(`/editor/${resume.id}`, { replace: true })
  }, [createResume, navigate])

  return null
}

function App() {
  const { pushToast } = useToast()
  const resumeState = useResumes((message) => {
    pushToast({ type: 'error', message })
  })

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home {...resumeState} />} />
          <Route path="/dashboard" element={<Dashboard {...resumeState} />} />
          <Route path="/editor" element={<EditorCreateRedirect createResume={resumeState.createResume} />} />
          <Route path="/editor/:id" element={<Editor {...resumeState} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
