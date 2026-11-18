import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { IntroSequence } from './components/layout/IntroSequence'
import { Navbar } from './components/layout/Navbar'
import { ScrollToTop } from './components/layout/ScrollToTop'
import ComingSoon from './pages/ComingSoon'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/home/HomePage'
import LegalPage, { LegalIndex } from './pages/LegalPage'
import ServicesPage from './pages/ServicesPage'
import ThankYouPage from './pages/ThankYouPage'

// In-memory routing is used only for the single-file preview build (VITE_PREVIEW=1);
// production uses clean URLs (see vercel.json for the SPA rewrite).
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter

const later: [string, string, string][] = [
  ['/careers', 'Your Next Opportunity Starts Here.', 'Stage 3 · Recruiting portal'],
  ['/partnerships', 'Partner With NOVARIS', 'Stage 8 · Partnership portal'],
  ['/academy/*', 'NOVARIS Academy', 'Stage 4–5 · Academy'],
]

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <IntroSequence />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact/thank-you" element={<ThankYouPage />} />
          <Route path="/legal" element={<LegalIndex />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          {later.map(([path, title, stage]) => (
            <Route key={path} path={path} element={<ComingSoon title={title} stage={stage} />} />
          ))}
          <Route path="*" element={<ComingSoon title="Page not found" stage="404" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
