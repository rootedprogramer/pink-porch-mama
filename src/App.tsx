import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Nav from './components/Nav'
import Flamingo from './components/Flamingo'
import Home from './pages/Home'
import Move from './pages/Move'
import Learn from './pages/Learn'
import Journal from './pages/Journal'
import Flock from './pages/Flock'
import Tonight from './pages/Tonight'
import CheckIn from './pages/CheckIn'
import Me from './pages/Me'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'

function AppRoutes() {
  const { user, loading, profile } = useAuth()
  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FDF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Flamingo size={56} />
    </div>
  )
  if (!user) return <Auth />
  if (!profile) return <Onboarding />
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/move" element={<Move />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/flock" element={<Flock />} />
        <Route path="/tonight" element={<Tonight />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/me" element={<Me />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Nav />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
