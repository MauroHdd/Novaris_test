# NOVARIS — Where Ambition Meets Execution

The NOVARIS digital headquarters: public website, recruiting portal, NOVARIS Academy, business dashboard, CRM and partnership portal.

**Stack:** React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide · React Router. Supabase (Postgres, Auth, Storage, Row Level Security) arrives in Stage 4/9 · hosted on Vercel · versioned on GitHub.

## Build status

| Stage | Scope | Status |
|---|---|---|
| 1 | Visual identity + complete homepage | ✅ Done |
| 2 | About, Services, Contact (+ confirmation), 7 legal placeholder pages | ✅ Done |
| 3 | Careers portal, 3-step application, recruiting dashboard & candidate profiles | ✅ Done |
| 4 | Employee authentication & accounts (Supabase Auth) | ⏳ Next |
| 5 | NOVARIS Academy + 9 training modules | ⏳ |
| 6 | Business management dashboard | ⏳ |
| 7 | CRM + lead distribution | ⏳ |
| 8 | Partnership portal | ⏳ |
| 9 | Database, permissions (RLS), backend functions | ⏳ |
| 10 | Full test pass + deployment | ⏳ |

Routes for later stages already exist and show a branded "being built" page, so navigation never breaks.

## Run it locally
```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # production build → dist/
npm run build:preview  # one self-contained preview file → dist-preview/index.html
```

## Before launch: things only you can provide
All editable content lives in **`src/content/site.ts`**. Anything marked `[PLACEHOLDER]` must be filled in or confirmed.

1. **Official logo.** Put the file in `public/brand/` (for example `novaris-logo.svg` or `.png`) and set `brand.logoSrc = '/brand/novaris-logo.svg'`. The hexagon "N" currently shown is a **placeholder, not the official logo**.
2. **Contact details:** email, phone and city/state.
3. **How each service is delivered.** Each service is tagged `direct` (provided by NOVARIS) or `licensed` (through appropriately licensed professionals and partners). Insurance and financial services default to `licensed`. Confirm this is accurate.
4. **Footer disclosure:** have counsel review the text in `footerDisclosure`.

5. **Mission statement** on the About page (marked placeholder).
6. **Legal documents.** All 7 are clearly marked drafts with section headings only. Counsel must write them.
7. **Leadership bios** (optional): add them to `about.leadership` in `src/content/pages.ts`. The section stays hidden while empty.

8. **Roles.** In `src/content/careers.ts`, set each role's `arrangements` (W-2, 1099, independent agent), `compensation` and `location` once they're legally confirmed. Until then the site says they're confirmed during hiring.

**Demo mode vs. live.** The preview build runs in *demo mode*: applications are saved only in that browser so the recruiting dashboard can be tried end to end, and the admin area shows a demo banner. On the live site (`npm run build`), the admin area is **locked** until secure sign-in (Stage 4) and the database (Stage 9) are connected. Never set `VITE_DEMO_MODE` on the public site.

**Contact form:** it validates and shows a confirmation, but until Supabase is connected (Stage 9) messages are **not stored or sent**. The confirmation page says so in preview mode.

No company history, licenses, partnerships or metrics have been invented. The site shows none until you supply them.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. At vercel.com, choose **Add New → Project**, import the repository and keep the defaults (framework: Vite; build command `npm run build`; output `dist`).
3. Click **Deploy**. `vercel.json` already rewrites every route to the app, so clean URLs like `/careers` work.
4. Optional: in **Settings → Domains**, add your own domain.

Supabase keys are added in Stage 4. Only the public *anon* key ever goes in the frontend (as `VITE_SUPABASE_ANON_KEY`); the service-role key stays in server-side functions.

## Project structure
```
src/
  content/site.ts          ← all editable copy, services, legal text
  components/brand/        ← LogoMark, Wordmark
  components/fx/           ← AuroraField (interactive background), Reveal, TiltCard
  components/layout/       ← IntroSequence, Navbar, Footer, ScrollToTop
  pages/home/              ← Hero + homepage sections
  pages/AboutPage.tsx      ← mission, values, operating model, divisions, compliance
  pages/ServicesPage.tsx   ← 5 detailed services with sticky index + delivery labels
  pages/ContactPage.tsx    ← validated contact form (separate contact & marketing consent)
  pages/ThankYouPage.tsx   ← confirmation page
  pages/LegalPage.tsx      ← Privacy, Terms, Cookies, Applicant Privacy, Marketing Consent,
                             Data Retention, Disclosures (placeholders for counsel)
  content/pages.ts         ← all copy for the pages above
  lib/forms.ts             ← one place where forms connect to the backend (Stage 9)
  components/ui/           ← PageHero, SectionHead, Placeholder, form fields
  content/careers.ts       ← roles (classification & pay set per role), hiring steps, form options
  pages/careers/           ← Careers page, ApplyPage (3 steps), SubmittedPage
  pages/admin/             ← AdminLayout (locked unless demo mode), recruiting dashboard, candidate profile
  lib/recruiting/          ← types, data store (demo: this browser only), submit
  lib/env.ts               ← backendConnected / demoMode flags
  pages/ComingSoon.tsx     ← placeholder for routes built in later stages
supabase/migrations/       ← database schema with Row Level Security (applied in Stage 9)
```

## Design system (summary)
- **Colors:** ink `#040405`, onyx `#0A0A0C`, graphite `#121317`, platinum `#E8E7E4`, silver `#A9ADB5`, champagne `#D2BC8A` (accent only, used sparingly).
- **Type:** Michroma (brand display, wide tracking) · Manrope (headings) · Inter (body).
- **Motion:** one easing curve `[0.22, 1, 0.36, 1]`, blur-to-sharp reveals, restrained metallic light sweeps. Everything respects *reduced motion*.
- **Surfaces:** glass panels with hairline platinum borders, subtle grain, light sweeps on hover.
