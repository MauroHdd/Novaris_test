/** Runtime flags. */
export const backendConnected = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

/**
 * Demo mode: the single-file preview (VITE_PREVIEW) or an explicit VITE_DEMO_MODE=1.
 * Data is kept only in the current browser so every screen can be tried end to end.
 * Never enable demo mode on the live public site.
 */
export const demoMode = Boolean(import.meta.env.VITE_PREVIEW || import.meta.env.VITE_DEMO_MODE)
