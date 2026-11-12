function inputClassName() {
  return 'min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'
}

function ExperienceForm({ items, onChangeItem, onAdd, onRemove, onMove, onAddBullet, onChangeBullet, onRemoveBullet, onMoveBullet, onImproveBullet, loadingBulletKey }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <article key={item.id} className="space-y-3 rounded-xl border border-slate-200 p-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMove(item.id, -1)} disabled={index === 0}>Move up</button>
            <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMove(item.id, 1)} disabled={index === items.length - 1}>Move down</button>
            <button type="button" className="min-h-10 rounded-lg border border-red-200 px-3 text-xs text-red-700" onClick={() => onRemove(item.id)} disabled={items.length === 1}>Remove</button>
          </div>
          <label className="block text-sm font-medium text-slate-700">Company<input className={inputClassName()} value={item.company} onChange={(event) => onChangeItem(item.id, { company: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Title<input className={inputClassName()} value={item.title} onChange={(event) => onChangeItem(item.id, { title: event.target.value })} /></label>
          <label className="block text-sm font-medium text-slate-700">Location<input className={inputClassName()} value={item.location} onChange={(event) => onChangeItem(item.id, { location: event.target.value })} /></label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">Start date<input type="month" className={inputClassName()} value={item.startDate} onChange={(event) => onChangeItem(item.id, { startDate: event.target.value })} /></label>
            <label className="block text-sm font-medium text-slate-700">End date<input type="month" className={inputClassName()} value={item.endDate} onChange={(event) => onChangeItem(item.id, { endDate: event.target.value })} disabled={item.current} /></label>
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={item.current} onChange={(event) => onChangeItem(item.id, { current: event.target.checked, endDate: event.target.checked ? '' : item.endDate })} />I currently work here</label>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Bullets</p>
            {item.bullets.map((bullet, bulletIndex) => {
              const key = `${item.id}-${bulletIndex}`
              return (
                <div key={key} className="space-y-2 rounded-lg border border-slate-200 p-2">
                  <label className="block text-sm font-medium text-slate-700">Bullet {bulletIndex + 1}
                    <textarea className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20" rows={3} value={bullet} onChange={(event) => onChangeBullet(item.id, bulletIndex, event.target.value)} />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="min-h-10 rounded-lg border border-brand-blue px-3 text-xs font-semibold text-brand-blue" onClick={() => onImproveBullet(item.id, bulletIndex, bullet)} disabled={loadingBulletKey === key}>{loadingBulletKey === key ? 'Loading...' : 'Improve with AI'}</button>
                    <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMoveBullet(item.id, bulletIndex, -1)} disabled={bulletIndex === 0}>Up</button>
                    <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onMoveBullet(item.id, bulletIndex, 1)} disabled={bulletIndex === item.bullets.length - 1}>Down</button>
                    <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 text-xs" onClick={() => onRemoveBullet(item.id, bulletIndex)} disabled={item.bullets.length === 1}>Remove</button>
                  </div>
                </div>
              )
            })}
            <button type="button" className="min-h-10 rounded-lg border border-slate-300 px-3 py-2 text-sm" onClick={() => onAddBullet(item.id)}>Add bullet</button>
          </div>
        </article>
      ))}
      <button type="button" className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700" onClick={onAdd}>Add experience</button>
    </div>
  )
}

export default ExperienceForm
