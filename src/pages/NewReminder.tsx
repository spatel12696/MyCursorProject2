import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addReminder, formatReminderDate } from '../utils/reminders'

const doctors = [
  { id: 1, name: 'Tory Lanes' },
  { id: 2, name: 'Marc Smith' },
  { id: 3, name: 'Sophia-Rose Wiss' },
  { id: 4, name: 'Joe Jones' },
]

const reminderSchema = z.object({
  doctorName: z.string().min(1, 'Doctor name is required'),
  dueDate: z.date({ required_error: 'Due date is required' }),
  notes: z.string().min(10, 'Notes must be at least 10 characters'),
})

type ReminderFormData = z.infer<typeof reminderSchema>

export default function NewReminder() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState('')

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
  })

  const notes = watch('notes') || ''

  const onSubmit = (data: ReminderFormData) => {
    try {
      // Format the date
      const formattedDate = formatReminderDate(data.dueDate)

      // Add reminder
      addReminder({
        doctorName: data.doctorName,
        dueDate: formattedDate,
        notes: data.notes,
      })

      // Redirect to reminders list
      navigate('/reminders')
    } catch (err) {
      console.error('Failed to save reminder:', err)
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
              to="/reminders"
              className="px-6 py-3 text-white rounded-lg font-bold text-xl hover:bg-purple-medium/50"
            >
              All Reminders
            </Link>
            <button className="px-6 py-3 bg-purple-button text-white rounded-lg font-bold text-xl underline">
              New Reminder
            </button>
          </div>

          <div className="bg-purple-table-bg rounded-xl p-8">
            <div className="mb-6">
              <button className="bg-purple-table-header text-white rounded-2xl px-6 py-3 font-bold text-xl hover:bg-purple-button transition-colors">
                <Link to="/reminders">← Back</Link>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-black font-bold text-3xl mb-4">Doctor Name</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => {
                    setSelectedDoctor(e.target.value)
                    setValue('doctorName', e.target.value, { shouldValidate: true })
                  }}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-light italic"
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
                {errors.doctorName && (
                  <p className="text-red-600 text-sm mt-1">{errors.doctorName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Due Date</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date)
                    if (date) setValue('dueDate', date)
                  }}
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl"
                  placeholderText="Select the date"
                  wrapperClassName="w-full"
                />
                {errors.dueDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.dueDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-black font-bold text-3xl mb-4">Note</label>
                <textarea
                  value={notes}
                  onChange={(e) => setValue('notes', e.target.value, { shouldValidate: true })}
                  rows={8}
                  className="w-full bg-purple-table-header text-white rounded-2xl px-6 py-4 text-xl placeholder-white/70 resize-none"
                  placeholder="Enter note"
                />
                {errors.notes && (
                  <p className="text-red-600 text-sm mt-1">{errors.notes.message}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Link
                  to="/reminders"
                  className="px-8 py-4 bg-gray-400 text-white rounded-xl font-bold text-xl hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-8 py-4 bg-purple-button text-white rounded-xl font-bold text-xl hover:bg-purple-sidebar-dark transition-colors"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

