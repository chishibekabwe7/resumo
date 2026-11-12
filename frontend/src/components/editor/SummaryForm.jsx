function SummaryForm({ value, onChange, onImprove, onGenerate, loadingImprove, loadingGenerate }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Summary
        <textarea
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded-lg border border-brand-blue px-3 py-2 text-sm font-semibold text-brand-blue"
          onClick={onImprove}
          disabled={loadingImprove}
        >
          {loadingImprove ? 'Loading...' : 'Improve with AI'}
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
          onClick={onGenerate}
          disabled={loadingGenerate}
        >
          {loadingGenerate ? 'Generating...' : 'Generate summary'}
        </button>
      </div>
    </div>
  )
}

export default SummaryForm
