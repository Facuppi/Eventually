import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const CreateEvent = lazy(() => import('./pages/CreateEvent'))
const EventPage = lazy(() => import('./pages/EventPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const ReadonlyPage = lazy(() => import('./pages/ReadonlyPage'))

// Loading skeleton component
function PageSkeleton() {
  return (
    <div className="page skeleton-page">
      <div className="skeleton-header">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
      </div>
      <div className="container">
        <div className="skeleton skeleton-card"></div>
      </div>
      <style>{`
        .skeleton-page {
          min-height: 100vh;
          background: var(--bg-primary);
        }
        .skeleton-header {
          text-align: center;
          padding: 3rem 2rem;
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-tertiary) 25%,
            var(--bg-hover) 50%,
            var(--bg-tertiary) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius-md);
        }
        .skeleton-title {
          width: 200px;
          height: 40px;
          margin: 0 auto 1rem;
        }
        .skeleton-subtitle {
          width: 300px;
          height: 20px;
          margin: 0 auto;
        }
        .skeleton-card {
          max-width: 600px;
          height: 400px;
          margin: 0 auto;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/admin/:adminId" element={<AdminPage />} />
        <Route path="/results/:readonlyId" element={<ReadonlyPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
