function inputClassName() {
  return 'min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'
}

function EducationForm({ items, onChangeItem, onAdd, onRemove, onMove }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <article key={item.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMove(item.id, -1)} disabled={index === 0}>Move up</button>
            <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMove(item.id, 1)} disabled={index === items.length - 1}>Move down</button>
            <button type="button" className="min-h-10 rounded-lg border border-red-200 px-3 text-xs text-red-700" onClick={() => onRemove(item.id)} disabled={items.length === 1}>Remove</button>
          </div>
          <label className="block text-sm font-medium text-slate-700">School<input className={inputClassName()} value={item.school} onChange={(event) => onChangeItem(item.id, { school: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Degree<input className={inputClassName()} value={item.degree} onChange={(event) => onChangeItem(item.id, { degree: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Field<input className={inputClassName()} value={item.field} onChange={(event) => onChangeItem(item.id, { field: event.target.value })} /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">Start date<input type="month" className={inputClassName()} value={item.startDate} onChange={(event) => onChangeItem(item.id, { startDate: event.target.value })} /></label>
            <label className="block text-sm font-medium text-slate-700">End date<input type="month" className={inputClassName()} value={item.endDate} onChange={(event) => onChangeItem(item.id, { endDate: event.target.value })} /></label>
          </div>
          <label className="block text-sm font-medium text-slate-700">Details<textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" rows={3} value={item.details} onChange={(event) => onChangeItem(item.id, { details: event.target.value })} /></label>
        </article>
      ))}
      <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700" onClick={onAdd}>Add education</button>
    </div>
  )
}

export default EducationForm
