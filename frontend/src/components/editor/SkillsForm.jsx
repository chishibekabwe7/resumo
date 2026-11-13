import { useState } from 'react'

function SkillsForm({ skills, onAdd, onRemove }) {
  const [value, setValue] = useState('')

  const addSkill = () => {
    const next = value.trim()
    if (!next) {
      return
    }
    onAdd(next)
    setValue('')
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Add a skill
        <input
          className="mt-1 min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ',') {
              event.preventDefault()
              addSkill()
            }
          }}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <button
            key={`${skill}-${index}`}
            type="button"
            className="min-h-10 rounded-full border border-slate-300 px-3 text-sm text-slate-700"
            onClick={() => onRemove(index)}
          >
            {skill} ×
          </button>
        ))}
      </div>
    </div>
  )
}

export default SkillsForm
