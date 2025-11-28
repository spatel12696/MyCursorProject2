# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## First Steps

1. **Sign up for an account:**
   - Click "Signup" on the login page
   - Fill in your details (first name, last name, email, password)
   - Click "Create account"

2. **Explore the application:**
   - **Dashboard**: Main landing page after login
   - **Bookings**: View and manage your appointments
   - **Reminders**: Set reminders for upcoming appointments
   - **Manage Bookings**: Browse doctors and book appointments

## Features Overview

### Authentication
- Signup and Login pages with form validation
- Password confirmation matching
- Email format validation

### Bookings
- **Upcoming Bookings**: View your scheduled appointments
- **Past Bookings**: Review your appointment history
- **New Booking**: Create a new appointment

### Reminders
- View all your reminders
- Create new reminders with notes
- Date picker for due dates

### Manage Bookings
- Calendar view for date selection
- Browse available doctors
- Select time slots
- Search and filter doctors

## Tech Stack Summary

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zod + React Hook Form** for form validation
- **React DatePicker** for date selection

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Header.tsx   # Top navigation bar
│   ├── Sidebar.tsx  # Side navigation menu
│   └── Layout.tsx   # Layout wrapper
├── pages/          # Page components
│   ├── Signup.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── ... (other pages)
├── types/          # TypeScript definitions
├── App.tsx         # Main app with routing
└── main.tsx        # Entry point
```

## Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
- Purple theme colors are defined in the `colors` section

### Styling
- Global styles: `src/index.css`
- Component styles: Use Tailwind classes
- Custom CSS: Add to `src/index.css` in the `@layer` sections

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add menu item in `src/components/Sidebar.tsx`
4. Add page title in `src/components/Header.tsx`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Port already in use
If port 5173 is in use, Vite will automatically try the next available port.

### Module not found errors
Run `npm install` again to ensure all dependencies are installed.

### Type errors
Make sure TypeScript is configured correctly in `tsconfig.json`.

## Next Steps

- Connect to a backend API
- Add user authentication with JWT
- Implement real data fetching
- Add more validation rules
- Enhance the calendar component
- Add appointment notifications

Happy coding! 🚀

