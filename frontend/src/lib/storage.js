export const STORAGE_KEY = 'resumo.resumes'

function parseResumes(value) {
  if (!value) {
    return []
  }

  const parsed = JSON.parse(value)
  return Array.isArray(parsed) ? parsed : []
}

export function loadResumes() {
  try {
    return parseResumes(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

function isQuotaError(error) {
  return error instanceof DOMException &&
    (error.code === 22 || error.code === 1014 || error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
}

export function saveResumes(resumes, { onStorageFull } = {}) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
    return { ok: true }
  } catch (error) {
    if (isQuotaError(error)) {
      onStorageFull?.('Storage is full. Your photo may be too large. Try removing or replacing it.')
    }
    return { ok: false, error }
  }
}
