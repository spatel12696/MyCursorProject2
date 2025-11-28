import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { getBookings, getUpcomingBookings } from '../utils/bookings';
import { getReminders } from '../utils/reminders';
import { Booking, Reminder } from '../types';

const doctors = [
  { id: 1, name: 'Tory Lanes', specialty: 'Radiologist' },
  { id: 2, name: 'Marc Smith', specialty: 'Nephrologist' },
  { id: 3, name: 'Sophia-Rose Wiss', specialty: 'Internist' },
  { id: 4, name: 'Joe Jones', specialty: 'Cardiologist' },
];

export default function Dashboard() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAllBookings(getBookings());
    setUpcomingBookings(getUpcomingBookings());
    setReminders(getReminders());
  }, []);

  const nextBooking = upcomingBookings.length > 0
    ? [...upcomingBookings].sort((a, b) => {
        const [da, ma, ya] = a.date.split('/');
        const [db, mb, yb] = b.date.split('/');
        return new Date(+ya, +ma-1, +da).getTime() - new Date(+yb,+mb-1,+db).getTime();
      })[0]
    : null;

  const nextReminders = reminders
    .sort((a,b)=>{
      const [da,ma,ya] = a.dueDate.split('/');
      const [db,mb,yb] = b.dueDate.split('/');
      return new Date(+ya,+ma-1,+da).getTime() - new Date(+yb,+mb-1,+db).getTime();
    })
    .slice(0,2);

  return (
    <div className="flex h-screen bg-purple-dark overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-light/80 to-purple-medium/70 shadow">
              <div className="flex items-center space-x-4">
                <svg className="w-9 h-9 text-purple-button" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v6c0 1.657 1.343 3 3 3s3-1.343 3-3v-6c0-1.657-1.343-3-3-3zm6 3V7c0-3.314-2.686-6-6-6S6 3.686 6 7v4m-2 4v2a4 4 0 004 4h4a4 4 0 004-4v-2"/></svg>
                <div>
                  <p className="text-lg opacity-70 font-semibold">Total Bookings</p>
                  <div className="text-3xl font-bold text-purple-header">{allBookings.length}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-lighter/90 to-purple-sidebar/70 shadow">
              <div className="flex items-center space-x-4">
                <svg className="w-9 h-9 text-purple-header" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m0 0a1 1 0 012 0v4m-2 0h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <div>
                  <p className="text-lg opacity-70 font-semibold">Upcoming</p>
                  <div className="text-3xl font-bold text-purple-header">{upcomingBookings.length}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-light/90 to-purple-header/60 shadow">
              <div className="flex items-center space-x-4">
                <svg className="w-9 h-9 text-purple-button" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M19.095 14.095A7.972 7.972 0 0020 12c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 4.072 3.054 7.436 7 7.938"/></svg>
                <div>
                  <p className="text-lg opacity-70 font-semibold">Reminders</p>
                  <div className="text-3xl font-bold text-purple-header">{reminders.length}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-button to-purple-header/70 shadow">
              <div className="flex items-center space-x-4">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a7 7 0 00-14 0v2h5"/></svg>
                <div>
                  <p className="text-lg opacity-70 font-semibold">Doctors</p>
                  <div className="text-3xl font-bold text-white">{doctors.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Upcoming Booking */}
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-2">
              <div className="rounded-2xl p-7 bg-gradient-to-br from-purple-light/70 to-purple-sidebar/90 shadow flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <svg className="w-7 h-7 text-purple-button mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m0 0a1 1 0 012 0v4m-2 0h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="text-xl font-bold text-purple-header">Next Booking</span>
                </div>
                {nextBooking ? (
                  <div className="space-y-3">
                    <div><span className="font-semibold">Doctor:</span> <span className="font-bold text-lg text-purple-header">{nextBooking.doctorName}</span></div>
                    <div className="flex gap-8">
                      <span><span className="font-semibold">Date:</span> {nextBooking.date}</span>
                      <span><span className="font-semibold">Time:</span> {nextBooking.time}</span>
                    </div>
                    <div className="flex gap-8">
                      <span><span className="font-semibold">Category:</span> {nextBooking.category}</span>
                      <span><span className="font-semibold">Type:</span> {nextBooking.typeOfVisit}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-lg font-bold mt-4">No upcoming bookings.</div>
                )}
                <button
                  onClick={() => navigate('/bookings/upcoming')}
                  className="mt-5 self-end px-6 py-2 bg-purple-button text-white text-lg font-bold rounded-2xl hover:bg-purple-sidebar-dark transition">
                  View All
                </button>
              </div>
            </div>
            {/* Quick reminders */}
            <div className="flex flex-col gap-4">
              <div className="text-white text-xl font-bold mb-2">Reminders</div>
              {nextReminders.length === 0 ? (
                <div className="rounded-2xl bg-purple-sidebar/80 p-4 text-center text-gray-200">No upcoming reminders.</div>
              ) : (
                nextReminders.map((rem, i) => (
                  <div key={rem.id} className="rounded-2xl bg-purple-table-header p-5">
                    <div className="font-bold">{rem.doctorName}</div>
                    <div className="opacity-90 mb-1">Due: {rem.dueDate}</div>
                    <div className="text-sm text-white/70 line-clamp-2">{rem.notes}</div>
                  </div>
                ))
              )}
              <button
                onClick={() => navigate('/reminders')}
                className="mt-2 px-4 py-2 bg-purple-button text-white font-bold rounded-2xl hover:bg-purple-sidebar-dark transition"
              >
                View All
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-end mt-10">
            <button
              onClick={() => navigate('/bookings/new')}
              className="bg-purple-button text-white text-xl font-bold px-8 py-4 rounded-2xl transition hover:bg-purple-sidebar-dark shadow-lg"
            >
              Book Appointment
            </button>
            <button
              onClick={() => navigate('/reminders/new')}
              className="bg-purple-sidebar-dark text-white text-xl font-bold px-8 py-4 rounded-2xl transition hover:bg-purple-header shadow-lg"
            >
              Add Reminder
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

