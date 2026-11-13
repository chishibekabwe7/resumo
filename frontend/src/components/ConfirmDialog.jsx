function ConfirmDialog({ open, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel }) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm" onClick={onCancel}>{cancelLabel}</button>
          <button type="button" className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
