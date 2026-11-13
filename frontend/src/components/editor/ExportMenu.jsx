import { useState } from 'react'

function ExportMenu({ onExport }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        className="min-h-11 rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        Export
      </button>
      {open && (
        <ul className="absolute right-0 z-20 mt-2 min-w-44 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
          {['pdf', 'html', 'png'].map((type) => (
            <li key={type}>
              <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100" onClick={() => {
                onExport(type)
                setOpen(false)
              }}>{type.toUpperCase()}</button>
            </li>
          ))}
          <li>
            <button type="button" className="w-full cursor-not-allowed rounded-md px-3 py-2 text-left text-sm text-slate-400" disabled>
              DOCX (Coming soon)
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ExportMenu
