import { Link, useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/bookings/upcoming': 'Upcoming Bookings',
  '/bookings/past': 'Past Bookings',
  '/bookings/new': 'New Booking',
  '/reminders': 'Reminders',
  '/reminders/new': 'Add Reminder',
  '/manage-bookings': 'Manage Bookings',
}

export default function Header() {
  const location = useLocation()
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/bookings')) {
      if (location.pathname === '/bookings/new') return pageTitles['/bookings/new']
      if (location.pathname === '/bookings/past') return pageTitles['/bookings/past']
      return pageTitles['/bookings/upcoming']
    }
    if (location.pathname.startsWith('/reminders')) {
      if (location.pathname === '/reminders/new') return pageTitles['/reminders/new']
      return pageTitles['/reminders']
    }
    return pageTitles[location.pathname] || 'HealthEase'
  }

  return (
    <header className="bg-purple-dark border-b border-white/20 px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-4xl font-normal">{getPageTitle()}</h1>
        <div className="border-t border-white flex-1 mx-8"></div>
        <Link to="/dashboard">
          <div className="w-15 h-15 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-light to-purple-medium"></div>
          </div>
        </Link>
      </div>
    </header>
  )
}
