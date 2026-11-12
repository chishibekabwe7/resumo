import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { useResumes } from './hooks/useResumes'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'
import Home from './pages/Home'

function App() {
  const resumeState = useResumes()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard {...resumeState} />} />
          <Route path="/editor" element={<Editor {...resumeState} />} />
          <Route path="/editor/:id" element={<Editor {...resumeState} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
