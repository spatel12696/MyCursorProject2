import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import UpcomingBookings from './pages/UpcomingBookings'
import PastBookings from './pages/PastBookings'
import NewBooking from './pages/NewBooking'
import Reminders from './pages/Reminders'
import NewReminder from './pages/NewReminder'
import ManageBookings from './pages/ManageBookings'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppRoutes() {
  const { isAuthenticated, setIsAuthenticated } = useAuth()

  return (
    <Routes>
        <Route
          path="/signup"
          element={
            <Signup
              setIsAuthenticated={(value) => {
                setIsAuthenticated(value)
              }}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={(value) => {
                setIsAuthenticated(value)
              }}
            />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings/upcoming" element={<UpcomingBookings />} />
            <Route path="/bookings/past" element={<PastBookings />} />
            <Route path="/bookings/new" element={<NewBooking />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/reminders/new" element={<NewReminder />} />
            <Route path="/manage-bookings" element={<ManageBookings />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App

