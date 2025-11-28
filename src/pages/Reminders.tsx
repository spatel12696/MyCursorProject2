import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useLocation } from 'react-router-dom'
import { getReminders, deleteReminder } from '../utils/reminders'
import { Reminder } from '../types'

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const location = useLocation()

  const loadReminders = () => {
    const allReminders = getReminders()
    // Sort by due date
    allReminders.sort((a, b) => {
      const [dayA, monthA, yearA] = a.dueDate.split('/')
      const [dayB, monthB, yearB] = b.dueDate.split('/')
      const dateA = new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA))
      const dateB = new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB))
      return dateA.getTime() - dateB.getTime()
    })
    setReminders(allReminders)
  }

  useEffect(() => {
    // Load reminders whenever the component mounts or location changes
    loadReminders()
  }, [location])

  const handleDelete = (reminderId: number) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(reminderId)
      loadReminders() // Reload the list
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
            <button className="px-6 py-3 bg-purple-button text-white rounded-lg font-bold text-xl underline">
              All Reminders
            </button>
            <Link
              to="/reminders/new"
              className="px-6 py-3 text-white rounded-lg font-bold text-xl hover:bg-purple-medium/50"
            >
              New Reminder
            </Link>
          </div>

          {/* Table */}
          <div className="bg-purple-table-bg rounded-xl p-6">
            <div className="bg-purple-table-header rounded-xl p-6 mb-4">
              <div className="grid grid-cols-5 gap-4 text-white font-bold text-2xl">
                <div>#</div>
                <div>Doctor Name</div>
                <div>Due</div>
                <div>Notes</div>
                <div>Action</div>
              </div>
            </div>

            <div className="space-y-4">
              {reminders.length === 0 ? (
                <div className="text-center py-8 text-gray-600 font-bold text-xl">
                  No reminders yet. Click the + button to create one!
                </div>
              ) : (
                reminders.map((reminder, index) => (
                  <div
                    key={reminder.id}
                    className="grid grid-cols-5 gap-4 text-black font-bold text-xl p-4 items-center"
                  >
                    <div>{index + 1}</div>
                    <div>{reminder.doctorName}</div>
                    <div>{reminder.dueDate}</div>
                    <div>{reminder.notes}</div>
                    <div>
                      <button
                        onClick={() => handleDelete(reminder.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Delete reminder"
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
            to="/reminders/new"
            className="fixed bottom-8 right-8 bg-purple-table-header text-white rounded-xl px-8 py-4 hover:bg-purple-button transition-colors"
          >
            <span className="text-4xl font-bold">+</span>
          </Link>
        </main>
      </div>
    </div>
  )
}

