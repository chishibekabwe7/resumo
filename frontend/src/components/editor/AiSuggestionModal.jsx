import { useEffect } from 'react'

function AiSuggestionModal({ open, title, beforeText, afterText, onUse, onKeep, loading, error }) {
  useEffect(() => {
    function onEscape(event) {
      if (event.key === 'Escape') {
        onKeep()
      }
    }

    if (!open) {
      return undefined
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [onKeep, open])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-labelledby="ai-suggestion-title">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-5 shadow-xl">
        <h2 id="ai-suggestion-title" className="text-lg font-semibold text-slate-900">{title}</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-600">Loading suggestion...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-700">{error}</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Your text</h3>
              <p className="mt-1 whitespace-pre-wrap rounded-lg border border-slate-200 p-3 text-sm text-slate-700">{beforeText || 'No text yet.'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Suggestion</h3>
              <p className="mt-1 whitespace-pre-wrap rounded-lg border border-slate-200 p-3 text-sm text-slate-700">{afterText || 'No suggestion available.'}</p>
            </div>
          </div>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onKeep}>Keep mine</button>
          <button type="button" className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white" onClick={onUse} disabled={loading || !afterText}>Use suggestion</button>
        </div>
      </div>
    </div>
  )
}

export default AiSuggestionModal
