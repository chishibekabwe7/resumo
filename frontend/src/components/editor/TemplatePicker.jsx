import { templateRegistry } from '../../templates'

function TemplatePicker({ value, onChange }) {
  const current = templateRegistry.find((template) => template.id === value)

  return (
    <label className="text-sm font-medium text-slate-700">
      Template
      <select
        className="ml-2 min-h-11 rounded-lg border border-slate-300 px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {templateRegistry.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <span className="mt-1 block text-xs text-slate-500">{current?.description}</span>
    </label>
  )
}

export default TemplatePicker
