/**
 * Form submission layer. Every public form posts through here so the backend can be
 * connected in one place (Stage 9: Supabase table + email notification function).
 *
 * Until VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are configured, submissions are
 * NOT stored anywhere. The UI says so honestly ("preview mode").
 */

export type ContactSubmission = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  inquiryType: string
  message: string
  consentContact: boolean
  consentMarketing: boolean
  submittedAt: string
}

export const backendConnected = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function submitContact(data: ContactSubmission): Promise<{ ok: true; stored: boolean } | { ok: false; error: string }> {
  if (!backendConnected) {
    await new Promise((r) => setTimeout(r, 700)) // keep the UX realistic in preview
    return { ok: true, stored: false }
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        first_name: data.firstName, last_name: data.lastName, email: data.email, phone: data.phone || null,
        company: data.company || null, inquiry_type: data.inquiryType, message: data.message,
        consent_contact: data.consentContact, consent_marketing: data.consentMarketing, submitted_at: data.submittedAt,
      }),
    })
    if (!res.ok) return { ok: false, error: 'We could not send your message. Please try again.' }
    return { ok: true, stored: true }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' }
  }
}

export const validators = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  /** US-style phone: 10 digits, optional +1 */
  phone: (v: string) => {
    const d = v.replace(/\D/g, '')
    return d.length === 10 || (d.length === 11 && d.startsWith('1'))
  },
}

export function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}
