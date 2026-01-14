import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateEvent from './pages/CreateEvent'
import EventPage from './pages/EventPage'
import AdminPage from './pages/AdminPage'
import ReadonlyPage from './pages/ReadonlyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/admin/:adminId" element={<AdminPage />} />
      <Route path="/readonly/:id" element={<ReadonlyPage />} />
    </Routes>
  )
}

export default App
