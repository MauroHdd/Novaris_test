import { BrowserRouter, MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { IntroSequence } from './components/layout/IntroSequence'
import { Navbar } from './components/layout/Navbar'
import { ScrollToTop } from './components/layout/ScrollToTop'
import AboutPage from './pages/AboutPage'
import AdminLayout, { AdminComingSoon } from './pages/admin/AdminLayout'
import CandidateProfile from './pages/admin/recruiting/CandidateProfile'
import RecruitingDashboard from './pages/admin/recruiting/RecruitingDashboard'
import ApplyPage from './pages/careers/ApplyPage'
import CareersPage from './pages/careers/CareersPage'
import SubmittedPage from './pages/careers/SubmittedPage'
import ComingSoon from './pages/ComingSoon'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/home/HomePage'
import LegalPage, { LegalIndex } from './pages/LegalPage'
import ServicesPage from './pages/ServicesPage'
import ThankYouPage from './pages/ThankYouPage'

// In-memory routing is used only for the single-file preview build (VITE_PREVIEW=1);
// production uses clean URLs (see vercel.json for the SPA rewrite).
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter

function PublicLayout() {
  return (
    <>
      <IntroSequence />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply" element={<ApplyPage />} />
          <Route path="/careers/submitted" element={<SubmittedPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/thank-you" element={<ThankYouPage />} />
          <Route path="/legal" element={<LegalIndex />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/partnerships" element={<ComingSoon title="Partner With NOVARIS" stage="Stage 8 · Partnership portal" />} />
          <Route path="/academy/*" element={<ComingSoon title="NOVARIS Academy" stage="Stage 4–5 · Academy" />} />
          <Route path="*" element={<ComingSoon title="Page not found" stage="404" />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminComingSoon title="Business Overview" stage={6} />} />
          <Route path="recruiting" element={<RecruitingDashboard />} />
          <Route path="recruiting/:id" element={<CandidateProfile />} />
          <Route path="employees" element={<AdminComingSoon title="Employees" stage={6} />} />
          <Route path="academy" element={<AdminComingSoon title="Academy Administration" stage={5} />} />
          <Route path="leads" element={<AdminComingSoon title="Leads & CRM" stage={7} />} />
          <Route path="partnerships" element={<AdminComingSoon title="Partnerships" stage={8} />} />
          <Route path="reports" element={<AdminComingSoon title="Reports" stage={6} />} />
        </Route>
      </Routes>
    </Router>
  )
}
