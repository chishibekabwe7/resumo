import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEmptyResume } from '../lib/resumeSchema'
import { loadResumes, saveResumes } from '../lib/storage'

const SAVE_DELAY_MS = 400

function touchUpdatedAt(resume) {
  return {
    ...resume,
    updatedAt: new Date().toISOString(),
  }
}

export function useResumes(onStorageFull) {
  const [resumes, setResumes] = useState(() => {
    const stored = loadResumes()
    return stored.length > 0 ? stored : []
  })
  const [saveState, setSaveState] = useState('saved')
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    setSaveState('saving')

    timeoutRef.current = window.setTimeout(() => {
      const result = saveResumes(resumes, {
        onStorageFull,
      })
      setSaveState(result.ok ? 'saved' : 'error')
    }, SAVE_DELAY_MS)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [onStorageFull, resumes])

  const getResume = useCallback(
    (id) => resumes.find((resume) => resume.id === id) ?? null,
    [resumes]
  )

  const createResume = useCallback((seed) => {
    const base = seed ? { ...seed, id: crypto.randomUUID() } : createEmptyResume()
    const resume = touchUpdatedAt(base)
    setResumes((prev) => [resume, ...prev])
    return resume
  }, [])

  const updateResume = useCallback((id, patch) => {
    setResumes((prev) =>
      prev.map((resume) => {
        if (resume.id !== id) {
          return resume
        }

        const next = typeof patch === 'function' ? patch(resume) : { ...resume, ...patch }
        return touchUpdatedAt(next)
      })
    )
  }, [])

  const duplicateResume = useCallback((id) => {
    const source = resumes.find((resume) => resume.id === id)
    if (!source) {
      return null
    }

    const duplicate = touchUpdatedAt({
      ...source,
      id: crypto.randomUUID(),
      title: `${source.title || 'Untitled Resume'} (copy)`,
    })

    setResumes((prev) => [duplicate, ...prev])
    return duplicate
  }, [resumes])

  const deleteResume = useCallback((id) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
  }, [])

  const sortedResumes = useMemo(
    () => [...resumes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [resumes]
  )

  return {
    resumes: sortedResumes,
    saveState,
    getResume,
    createResume,
    updateResume,
    duplicateResume,
    deleteResume,
  }
}
