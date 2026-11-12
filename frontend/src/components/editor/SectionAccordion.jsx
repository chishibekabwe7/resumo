function SectionAccordion({ id, title, hint, openSection, onToggle, children }) {
  const isOpen = openSection === id

  return (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <h2>
        <button
          type="button"
          className="flex min-h-12 w-full items-center justify-between rounded-2xl px-4 py-3 text-left"
          aria-expanded={isOpen}
          onClick={() => onToggle(id)}
        >
          <span>
            <span className="block text-sm font-semibold text-slate-900">{title}</span>
            <span className="mt-1 block text-xs text-slate-500">{hint}</span>
          </span>
          <span className="text-slate-500">{isOpen ? '−' : '+'}</span>
        </button>
      </h2>
      {isOpen && <div className="space-y-4 border-t border-slate-100 px-4 py-4">{children}</div>}
    </section>
  )
}

export default SectionAccordion
