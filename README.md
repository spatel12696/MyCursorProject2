# HealthEase - Patient Health Appointment Scheduler

A modern, responsive web application for managing patient health appointments, built with React, TypeScript, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Signup and Login pages with form validation
- 📅 **Appointment Management**: View upcoming and past bookings
- ➕ **New Bookings**: Create new appointments
- 🔔 **Reminders**: Manage appointment reminders with notes
- 👨‍⚕️ **Doctor Selection**: Browse and select from available doctors
- 📆 **Calendar Integration**: Select dates and time slots for appointments

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React DatePicker** - Date/time selection

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MyCursorProject
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/      # Reusable components (Sidebar, Header, Layout)
├── pages/          # Page components
│   ├── Signup.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── UpcomingBookings.tsx
│   ├── PastBookings.tsx
│   ├── NewBooking.tsx
│   ├── Reminders.tsx
│   ├── NewReminder.tsx
│   └── ManageBookings.tsx
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component with routing
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design

The application follows a purple-themed design system inspired by healthcare aesthetics, with:
- Dark purple backgrounds
- Light purple/pink accents
- Clean, modern UI components
- Responsive layout with sidebar navigation

## Features in Detail

### Authentication
- Signup form with validation (first name, last name, email, password)
- Login form with email and password
- Password confirmation matching
- Form validation using Zod schemas

### Bookings
- View upcoming appointments in a table format
- View past appointments
- Create new bookings
- Filter and sort appointments

### Reminders
- List all reminders with doctor names and due dates
- Create new reminders with notes
- Date picker for due dates

### Manage Bookings
- Calendar view for date selection
- Doctor cards with specialties and rates
- Time slot selection
- Search functionality for doctors

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication with JWT
- [ ] Real-time appointment notifications
- [ ] Email reminders
- [ ] Appointment rescheduling
- [ ] Patient profile management
- [ ] Doctor availability calendar
- [ ] Payment integration

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.

