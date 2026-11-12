function Field({ label, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="min-h-11 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
    />
  )
}

function PersonalForm({ personal, onChange, templateSupportsPhoto, photoSlot }) {
  return (
    <div className="space-y-3">
      <Field label="Full name">
        <Input
          value={personal.fullName}
          autoComplete="name"
          onChange={(event) => onChange('fullName', event.target.value)}
        />
        {!personal.fullName.trim() && (
          <p className="mt-1 text-xs text-amber-700">Add your name so employers know whose resume this is.</p>
        )}
      </Field>
      <Field label="Role">
        <Input value={personal.role} autoComplete="organization-title" onChange={(event) => onChange('role', event.target.value)} />
      </Field>
      <Field label="Email">
        <Input type="email" value={personal.email} autoComplete="email" onChange={(event) => onChange('email', event.target.value)} />
      </Field>
      <Field label="Phone">
        <Input type="tel" value={personal.phone} autoComplete="tel" onChange={(event) => onChange('phone', event.target.value)} />
      </Field>
      <Field label="Location">
        <Input value={personal.location} autoComplete="address-level2" onChange={(event) => onChange('location', event.target.value)} />
      </Field>
      <Field label="Website">
        <Input type="url" value={personal.website} autoComplete="url" onChange={(event) => onChange('website', event.target.value)} />
      </Field>
      <Field label="LinkedIn">
        <Input type="url" value={personal.linkedin} onChange={(event) => onChange('linkedin', event.target.value)} />
      </Field>
      <Field label="GitHub">
        <Input type="url" value={personal.github} onChange={(event) => onChange('github', event.target.value)} />
      </Field>
      {photoSlot}
      {!templateSupportsPhoto && (
        <p className="text-xs text-slate-500">This template does not show a profile photo.</p>
      )}
    </div>
  )
}

export default PersonalForm
