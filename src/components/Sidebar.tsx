import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/bookings/upcoming', label: 'Bookings' },
  { path: '/reminders', label: 'Reminders' },
  { path: '/manage-bookings', label: 'Manage Bookings' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  
  const getActivePath = () => {
    if (location.pathname.startsWith('/bookings')) return '/bookings/upcoming'
    if (location.pathname.startsWith('/reminders')) return '/reminders'
    return location.pathname
  }

  const activePath = getActivePath()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="w-[300px] bg-purple-sidebar h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-white text-5xl font-bold">HealthEase</h1>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => {
          const isActive = activePath === item.path || 
            (item.path === '/bookings/upcoming' && location.pathname.startsWith('/bookings'))
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-8 py-6 text-white text-2xl hover:bg-purple-sidebar-dark transition-colors ${
                isActive
                  ? 'bg-purple-sidebar-dark underline'
                  : ''
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="block w-full text-left px-8 py-4 text-white text-2xl hover:bg-purple-sidebar-dark transition-colors rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

