import { useState } from 'react'

function EditorLayout({ left, right }) {
  const [tab, setTab] = useState('edit')

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 md:items-start">
      <div className="rounded-2xl bg-slate-100 p-2 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold ${tab === 'edit' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600'}`} onClick={() => setTab('edit')}>Edit</button>
          <button type="button" className={`min-h-11 rounded-xl px-3 py-2 text-sm font-semibold ${tab === 'preview' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600'}`} onClick={() => setTab('preview')}>Preview</button>
        </div>
      </div>

      <div className={tab === 'preview' ? 'hidden md:block' : 'block'}>{left}</div>
      <div className={tab === 'edit' ? 'hidden md:block' : 'block'}>{right}</div>
    </div>
  )
}

export default EditorLayout
