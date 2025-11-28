import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useLocation } from 'react-router-dom'
import { getPastBookings, deleteBooking } from '../utils/bookings'
import { Booking } from '../types'

export default function PastBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const location = useLocation()

  const loadBookings = () => {
    const past = getPastBookings()
    // Sort by date and time (most recent first)
    past.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('/')
      const [dayB, monthB, yearB] = b.date.split('/')
      const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA))
      const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB))
      if (dateA.getTime() !== dateB.getTime()) {
        return dateB.getTime() - dateA.getTime() // Reverse order for past bookings
      }
      return b.time.localeCompare(a.time)
    })
    setBookings(past)
  }

  useEffect(() => {
    loadBookings()
  }, [location])

  const handleDelete = (bookingId: number) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(bookingId)
      loadBookings() // Reload the list
    }
  }
  return (
    <div className="flex h-screen bg-purple-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">

          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <Link
              to="/bookings/upcoming"
              className="px-6 py-3 text-white rounded-lg font-bold text-xl hover:bg-purple-medium/50"
            >
              Upcoming
            </Link>
            <Link
              to="/bookings/past"
              className="px-6 py-3 bg-purple-button text-white rounded-lg font-bold text-xl underline"
            >
              Past
            </Link>
            <Link
              to="/bookings/new"
              className="px-6 py-3 text-white rounded-lg font-bold text-xl hover:bg-purple-medium/50"
            >
              New
            </Link>
          </div>

          {/* Table */}
          <div className="bg-purple-table-bg rounded-xl p-6">
            <div className="bg-purple-table-header rounded-xl p-6 mb-4">
              <div className="grid grid-cols-7 gap-4 text-white font-bold text-2xl">
                <div>#</div>
                <div>Doctor Name</div>
                <div>Date</div>
                <div>Time</div>
                <div>Category</div>
                <div>Type of visit</div>
                <div>Action</div>
              </div>
            </div>

            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-gray-600 font-bold text-xl">
                  No past bookings.
                </div>
              ) : (
                bookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className="grid grid-cols-7 gap-4 text-black font-bold text-xl p-4 items-center"
                  >
                    <div>{index + 1}</div>
                    <div>{booking.doctorName}</div>
                    <div>{booking.date}</div>
                    <div>{booking.time}</div>
                    <div>{booking.category}</div>
                    <div>{booking.typeOfVisit}</div>
                    <div>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Delete booking"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Button */}
          <Link
            to="/bookings/new"
            className="fixed bottom-8 right-8 bg-purple-table-header text-white rounded-xl px-8 py-4 hover:bg-purple-button transition-colors"
          >
            <span className="text-4xl font-bold">+</span>
          </Link>
        </main>
      </div>
    </div>
  )
}

