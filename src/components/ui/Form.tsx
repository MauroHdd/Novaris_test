import { AlertCircle, Check } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const base =
  'w-full rounded-2xl border bg-white/[0.02] px-4 py-3.5 text-[15px] text-platinum placeholder:text-mist/70 transition-colors ' +
  'focus:outline-none focus:ring-0 focus:border-champagne/70 focus:bg-white/[0.04]'

function wrapCls(error?: string) {
  return `${base} ${error ? 'border-red-400/60' : 'border-line hover:border-white/20'}`
}

export function Field({ label, htmlFor, required, error, hint, children }: { label: string; htmlFor: string; required?: boolean; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 flex items-center gap-1 text-[13px] font-medium text-silver">
        {label}{required && <span className="text-champagne" aria-hidden>*</span>}
        {!required && <span className="text-mist">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 flex items-center gap-1.5 text-xs text-red-300" role="alert"><AlertCircle size={13} />{error}</p>
      ) : hint ? <p className="mt-2 text-xs text-mist">{hint}</p> : null}
    </div>
  )
}

export function Input({ error, ...p }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input {...p} aria-invalid={!!error} aria-describedby={error ? `${p.id}-error` : undefined} className={wrapCls(error)} />
}

export function Textarea({ error, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea {...p} aria-invalid={!!error} aria-describedby={error ? `${p.id}-error` : undefined} className={`${wrapCls(error)} min-h-[150px] resize-y`} />
}

export function Select({ error, children, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <select {...p} aria-invalid={!!error} className={`${wrapCls(error)} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`}
      style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A9ADB5' stroke-width='1.5'><path d='M6 9l6 6 6-6'/></svg>\")" }}>
      {children}
    </select>
  )
}

export function Checkbox({ id, checked, onChange, error, children }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="group flex cursor-pointer items-start gap-3">
        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          checked ? 'border-champagne bg-champagne text-ink' : error ? 'border-red-400/60' : 'border-white/25 group-hover:border-white/40'}`}>
          {checked && <Check size={13} strokeWidth={3} />}
        </span>
        <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error} />
        <span className="text-[13px] leading-relaxed text-silver">{children}</span>
      </label>
      {error && <p className="ml-8 mt-1.5 flex items-center gap-1.5 text-xs text-red-300" role="alert"><AlertCircle size={13} />{error}</p>}
    </div>
  )
}
