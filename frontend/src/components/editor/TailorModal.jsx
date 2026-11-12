import { useEffect } from 'react'

function TailorModal({ open, value, onChange, onClose, onRun, loading, error, result, onApplySuggestion }) {
  useEffect(() => {
    function onEscape(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (!open) {
      return undefined
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [onClose, open])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-labelledby="tailor-modal-title">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-5 shadow-xl">
        <h2 id="tailor-modal-title" className="text-lg font-semibold text-slate-900">Tailor to a job</h2>
        <label className="mt-3 block text-sm font-medium text-slate-700">
          Job description
          <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" rows={8} value={value} onChange={(event) => onChange(event.target.value)} />
        </label>
        <div className="mt-3 flex justify-end gap-2">
          <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onClose}>Cancel</button>
          <button type="button" className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white" onClick={onRun} disabled={loading}>{loading ? 'Running...' : 'Run tailoring'}</button>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        {result && (
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Suggestions</h3>
              <ul className="mt-2 space-y-2">
                {result.suggestions.map((item, index) => (
                  <li key={`${item.section}-${index}`} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <p className="font-medium text-slate-900">{item.section}</p>
                    <p className="mt-1 text-slate-600">{item.before}</p>
                    <p className="mt-1 text-slate-800">{item.after}</p>
                    <button type="button" className="mt-2 min-h-10 rounded-lg border border-brand-blue px-3 text-xs font-semibold text-brand-blue" onClick={() => onApplySuggestion(item)}>Apply</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Missing keywords</h3>
              <p className="mt-1 text-sm text-slate-600">{result.missingKeywords.join(', ') || 'None'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TailorModal
