import { Reminder } from '../types'

const REMINDERS_STORAGE_KEY = 'healthEase_reminders'

// Get all reminders from localStorage
export function getReminders(): Reminder[] {
  const remindersJson = localStorage.getItem(REMINDERS_STORAGE_KEY)
  if (!remindersJson) {
    // Initialize with mock data if empty
    const initialReminders: Reminder[] = [
      {
        id: 1,
        doctorName: 'Sophia-Rose Wiss',
        dueDate: '30/11/2025',
        notes: 'Avoid eating or drinking for 12 hours before the appointment.',
      },
      {
        id: 2,
        doctorName: 'Marc Smith',
        dueDate: '09/12/2025',
        notes: 'Bring previous medical reports and any current medications.',
      },
      {
        id: 3,
        doctorName: 'Tory Lanes',
        dueDate: '14/12/2025',
        notes: 'Arrive 15 minutes early for pre-appointment checks.',
      },
    ]
    saveReminders(initialReminders)
    return initialReminders
  }
  return JSON.parse(remindersJson)
}

// Save reminders to localStorage
function saveReminders(reminders: Reminder[]): void {
  localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders))
}

// Add a new reminder
export function addReminder(reminderData: Omit<Reminder, 'id'>): Reminder {
  const reminders = getReminders()
  const newReminder: Reminder = {
    id: Date.now(),
    ...reminderData,
  }
  reminders.push(newReminder)
  saveReminders(reminders)
  return newReminder
}

// Format date from Date object to DD/MM/YYYY
export function formatReminderDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Delete a reminder by ID
export function deleteReminder(reminderId: number): void {
  const reminders = getReminders()
  const filteredReminders = reminders.filter((reminder) => reminder.id !== reminderId)
  saveReminders(filteredReminders)
}

