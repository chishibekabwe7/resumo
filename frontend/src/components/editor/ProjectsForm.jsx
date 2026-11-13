function ProjectsForm({ items, onChangeItem, onAdd, onRemove }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
          <label className="block text-sm font-medium text-slate-700">Project name<input className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" value={item.name} onChange={(event) => onChangeItem(item.id, { name: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Link<input type="url" className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" value={item.link} onChange={(event) => onChangeItem(item.id, { link: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Description<textarea rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" value={item.description} onChange={(event) => onChangeItem(item.id, { description: event.target.value })} /></label>
          <button type="button" className="min-h-10 rounded-lg border border-red-200 px-3 text-xs text-red-700" onClick={() => onRemove(item.id)} disabled={items.length === 1}>Remove project</button>
        </article>
      ))}
      <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700" onClick={onAdd}>Add project</button>
    </div>
  )
}

export default ProjectsForm
