export interface Booking {
  id: number
  doctorName: string
  date: string
  time: string
  category: string
  typeOfVisit: string
  status?: string
}

export interface Reminder {
  id: number
  doctorName: string
  dueDate: string
  notes: string
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  rate: string
  photo: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

