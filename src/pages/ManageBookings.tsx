import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

interface Doctor {
  id: number
  name: string
  specialty: string
  rate: string
  photo: string
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Tory Lanes',
    specialty: 'Radiologist',
    rate: '$20/Hour',
    photo: '👨‍⚕️',
  },
  {
    id: 2,
    name: 'Marc Smith',
    specialty: 'Nephrologist',
    rate: '$40/Hour',
    photo: '👨‍⚕️',
  },
  {
    id: 3,
    name: 'Sophia-Rose Wiss',
    specialty: 'Internist',
    rate: '$30/Hour',
    photo: '👩‍⚕️',
  },
  {
    id: 4,
    name: 'Joe Jones',
    specialty: 'Cardiologist',
    rate: '$60/Hour',
    photo: '👨‍⚕️',
  },
]

const timeSlots = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
]

export default function ManageBookings() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBookNow = (doctorId: number) => {
    // Navigate to booking page with selected doctor and time
    navigate(`/bookings/new?doctor=${doctorId}&time=${selectedTime}&date=${selectedDate.toISOString()}`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="flex h-screen bg-purple-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">

          <div className="bg-purple-table-bg rounded-xl p-8">
            <div className="mb-6">
              <h2 className="text-white text-3xl font-bold mb-4">Booking Appointments</h2>
              
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <h3 className="text-white text-2xl font-bold self-center">Doctor List</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Doctor"
                  className="bg-white/99 rounded-2xl px-4 py-2 text-black placeholder-gray-500 text-sm"
                />
                <button className="bg-white rounded-2xl px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Calendar */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-3xl font-normal text-gray-800">
                      {formatDate(selectedDate)}
                    </h3>
                  </div>
                  <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-white text-3xl font-bold mb-4">Available Times</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`bg-white rounded-2xl px-6 py-4 text-xl font-bold transition-colors ${
                          selectedTime === time
                            ? 'bg-purple-button text-white'
                            : 'text-black hover:bg-gray-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Doctor Cards */}
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="bg-white/92 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-40 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center text-6xl">
                          {doctor.photo}
                        </div>
                        <h3 className="text-2xl font-bold text-black mb-2">{doctor.name}</h3>
                        <p className="text-gray-600 text-lg mb-2">{doctor.specialty}</p>
                        <p className="text-gray-600 text-lg mb-4">{doctor.rate}</p>
                        <button
                          onClick={() => handleBookNow(doctor.id)}
                          className="w-full bg-purple-button text-white rounded-2xl px-6 py-3 font-bold text-xl hover:bg-purple-sidebar-dark transition-colors"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

