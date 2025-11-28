import { useState } from 'react'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { addBooking, formatDate, formatTime } from '../utils/bookings'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const doctors = [
  { id: 1, name: 'Tory Lanes' },
  { id: 2, name: 'Marc Smith' },
  { id: 3, name: 'Sophia-Rose Wiss' },
  { id: 4, name: 'Joe Jones' },
]

const categories = [
  'General blood analysis',
  'Kidney function test',
  'X-ray examination',
  'Cardiology assessment',
  'Physical examination',
  'Follow-up consultation',
]

const visitTypes = [
  'Chronic care visit',
  'Follow up visit',
  'New consultation',
  'Emergency visit',
  'Routine checkup',
]

export default function NewBooking() {
  const navigate = useNavigate()
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [category, setCategory] = useState('')
  const [typeOfVisit, setTypeOfVisit] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!selectedDoctor || !selectedDate || !selectedTime || !category || !typeOfVisit) {
      setError('Please fill in all fields')
      return
    }

    try {
      // Format date and time
      const formattedDate = formatDate(selectedDate.toISOString().split('T')[0])
      const formattedTime = formatTime(selectedTime)

      // Add booking
      addBooking({
        doctorName: selectedDoctor,
        date: formattedDate,
        time: formattedTime,
        category,
        typeOfVisit,
      })

      // Redirect to upcoming bookings
      navigate('/bookings/upcoming')
    } catch (err) {
      setError('Failed to save booking. Please try again.')
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
              className="px-6 py-3 text-white rounded-lg font-bold text-xl hover:bg-purple-medium/50"
            >
              Past
            </Link>
            <Link
              to="/bookings/new"
              className="px-6 py-3 bg-purple-button text-white rounded-lg font-bold text-xl underline"
            >
              New
            </Link>
          </div>

          <div className="bg-purple-table-bg rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-black font-bold text-3xl mb-4">Doctor Name</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-light"
                >
                  <option value="" disabled className="text-gray-400">
                    Select a doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option
                      key={doctor.id}
                      value={doctor.name}
                      className="bg-purple-table-header text-white"
                    >
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl"
                  placeholderText="Select the date"
                  wrapperClassName="w-full"
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl"
                />
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-light"
                >
                  <option value="" disabled className="text-gray-400">
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                      className="bg-purple-table-header text-white"
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Type of visit</label>
                <select
                  value={typeOfVisit}
                  onChange={(e) => setTypeOfVisit(e.target.value)}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-light"
                >
                  <option value="" disabled className="text-gray-400">
                    Select type of visit
                  </option>
                  {visitTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      className="bg-purple-table-header text-white"
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-500/20 text-red-300 rounded-xl p-4 text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <Link
                  to="/bookings/upcoming"
                  className="px-8 py-4 bg-gray-400 text-white rounded-xl font-bold text-xl hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-8 py-4 bg-purple-button text-white rounded-xl font-bold text-xl hover:bg-purple-sidebar-dark transition-colors"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

