import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { IntroSequence } from './components/layout/IntroSequence'
import { Navbar } from './components/layout/Navbar'
import { ScrollToTop } from './components/layout/ScrollToTop'
import ComingSoon from './pages/ComingSoon'
import HomePage from './pages/home/HomePage'

// In-memory routing is used only for the single-file preview build (VITE_PREVIEW=1);
// production uses clean URLs (see vercel.json for the SPA rewrite).
const Router = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter

const later: [string, string, string][] = [
  ['/about', 'About Us', 'Stage 2 · Public website'],
  ['/services', 'Services', 'Stage 2 · Public website'],
  ['/careers', 'Your Next Opportunity Starts Here.', 'Stage 3 · Recruiting portal'],
  ['/partnerships', 'Partner With NOVARIS', 'Stage 8 · Partnership portal'],
  ['/contact', 'Contact', 'Stage 2 · Public website'],
  ['/academy/*', 'NOVARIS Academy', 'Stage 4–5 · Academy'],
  ['/legal/*', 'Legal', 'Stage 2 · Placeholders'],
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
