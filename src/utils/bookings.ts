import { Booking } from '../types'

const BOOKINGS_STORAGE_KEY = 'healthEase_bookings'

// Get all bookings from localStorage
export function getBookings(): Booking[] {
  const bookingsJson = localStorage.getItem(BOOKINGS_STORAGE_KEY)
  if (!bookingsJson) {
    // Initialize with mock data if empty
    const initialBookings: Booking[] = [
      {
        id: 1,
        doctorName: 'Sophia-Rose Wiss',
        date: '01/12/2025',
        time: '11:30 AM',
        category: 'General blood analysis',
        typeOfVisit: 'Chronic care visit',
      },
      {
        id: 2,
        doctorName: 'Marc Smith',
        date: '10/12/2025',
        time: '02:30 PM',
        category: 'Kidney function test',
        typeOfVisit: 'Follow up visit',
      },
      {
        id: 3,
        doctorName: 'Tory Lanes',
        date: '15/12/2025',
        time: '12:30 PM',
        category: 'X-ray examination',
        typeOfVisit: 'Follow up visit',
      },
    ]
    saveBookings(initialBookings)
    return initialBookings
  }
  return JSON.parse(bookingsJson)
}

// Save bookings to localStorage
function saveBookings(bookings: Booking[]): void {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings))
}

// Add a new booking
export function addBooking(bookingData: Omit<Booking, 'id'>): Booking {
  const bookings = getBookings()
  const newBooking: Booking = {
    id: Date.now(),
    ...bookingData,
  }
  bookings.push(newBooking)
  saveBookings(bookings)
  return newBooking
}

// Get upcoming bookings (date >= today)
export function getUpcomingBookings(): Booking[] {
  const bookings = getBookings()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return bookings.filter((booking) => {
    // Parse date in format DD/MM/YYYY
    const [day, month, year] = booking.date.split('/')
    const bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    bookingDate.setHours(0, 0, 0, 0)
    return bookingDate >= today
  })
}

// Get past bookings (date < today)
export function getPastBookings(): Booking[] {
  const bookings = getBookings()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return bookings.filter((booking) => {
    // Parse date in format DD/MM/YYYY
    const [day, month, year] = booking.date.split('/')
    const bookingDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    bookingDate.setHours(0, 0, 0, 0)
    return bookingDate < today
  })
}

// Format date from YYYY-MM-DD to DD/MM/YYYY
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Format time from HH:MM to HH:MM AM/PM
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

// Delete a booking by ID
export function deleteBooking(bookingId: number): void {
  const bookings = getBookings()
  const filteredBookings = bookings.filter((booking) => booking.id !== bookingId)
  saveBookings(filteredBookings)
}

