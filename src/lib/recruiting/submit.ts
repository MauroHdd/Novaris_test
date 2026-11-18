import { backendConnected, demoMode } from '../env'
import { createApplication } from './store'
import type { ApplicationInput } from './types'

/**
 * Public entry point for the careers application.
 * - Backend connected (Stage 9): inserted into Supabase `applications` (applicants may insert, never read).
 * - Demo mode: kept in this browser so the recruiting dashboard can be tried.
 * - Otherwise: not stored; the confirmation page says so.
 */
export async function submitApplication(input: ApplicationInput): Promise<{ ok: true; stored: 'backend' | 'demo' | 'none' } | { ok: false; error: string }> {
  if (backendConnected) {
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/applications`, {
        method: 'POST',
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          first_name: input.firstName, last_name: input.lastName, phone: input.phone, email: input.email,
          city: input.city, state: input.state, position_id: input.positionId, previous_employment: input.previousEmployment,
          sales_experience: input.salesExperience, insurance_experience: input.insuranceExperience,
          financial_experience: input.financialExperience, current_employment_status: input.currentEmploymentStatus,
          why_novaris: input.whyNovaris, preferred_contact: input.preferredContact,
          interview_availability: input.interviewAvailability, availability_notes: input.availabilityNotes,
          consent_privacy: input.consentPrivacy, consent_contact: input.consentContact, consent_marketing: input.consentMarketing,
        }),
      })
      if (!res.ok) return { ok: false, error: 'We could not submit your application. Please try again.' }
      return { ok: true, stored: 'backend' }
    } catch {
      return { ok: false, error: 'Network error. Please check your connection and try again.' }
    }
  }
  await new Promise((r) => setTimeout(r, 800))
  if (demoMode) { await createApplication(input); return { ok: true, stored: 'demo' } }
  return { ok: true, stored: 'none' }
}
