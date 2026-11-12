import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createEmptyResume } from '../lib/resumeSchema'

const STORAGE_KEY = 'resumo.resumes'
const SAVE_DELAY_MS = 450

function readStoredResumes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function touchUpdatedAt(resume) {
  return {
    ...resume,
    updatedAt: new Date().toISOString(),
  }
}

export function useResumes() {
  const [resumes, setResumes] = useState(() => {
    const stored = readStoredResumes()
    return stored.length > 0 ? stored : [createEmptyResume()]
  })
  const [saveStatus, setSaveStatus] = useState('Saved')
  const saveTimeout = useRef(null)

  useEffect(() => {
    setSaveStatus('Saving...')

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current)
    }

    saveTimeout.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
      setSaveStatus('Saved')
    }, SAVE_DELAY_MS)

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current)
      }
    }
  }, [resumes])

  const createResume = useCallback(() => {
    const resume = createEmptyResume()
    setResumes((prev) => [resume, ...prev])
    return resume
  }, [])

  const updateResume = useCallback((id, updater) => {
    let nextResume = null

    setResumes((prev) =>
      prev.map((resume) => {
        if (resume.id !== id) {
          return resume
        }

        const base = typeof updater === 'function' ? updater(resume) : { ...resume, ...updater }
        nextResume = touchUpdatedAt(base)
        return nextResume
      })
    )

    return nextResume
  }, [])

  const duplicateResume = useCallback((id) => {
    let created = null

    setResumes((prev) => {
      const source = prev.find((resume) => resume.id === id)
      if (!source) {
        return prev
      }

      created = {
        ...source,
        id: createEmptyResume().id,
        title: `${source.title} Copy`,
        updatedAt: new Date().toISOString(),
      }

      return [created, ...prev]
    })

    return created
  }, [])

  const deleteResume = useCallback((id) => {
    setResumes((prev) => {
      const next = prev.filter((resume) => resume.id !== id)
      return next.length > 0 ? next : [createEmptyResume()]
    })
  }, [])

  const sortedResumes = useMemo(
    () => [...resumes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [resumes]
  )

  return {
    resumes: sortedResumes,
    saveStatus,
    createResume,
    updateResume,
    duplicateResume,
    deleteResume,
  }
}
