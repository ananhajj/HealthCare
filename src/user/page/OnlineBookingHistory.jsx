import { Calendar, CheckCircle, Clock } from "lucide-react";
import { useContext, useState } from 'react';
import   { BookingCard } from '../components/BookingHistoryCard';
import { BookingContext } from '../context/BookingContext';

export default function OnlineBookingHistory() {
  const { onlineBooking: filteredBookings } = useContext(BookingContext); // استخدام البيانات من السياق
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAll, setShowAll] = useState(false);
console.log("before upcomingBookings",filteredBookings)

  // تصنيف الحجوزات
const upcomingBookings = filteredBookings.filter(
  booking => ['confirmed', 'pending'].includes(booking.status.trim().toLowerCase())
);
console.log(" after upcomingBookings",upcomingBookings)

  const completedBookings = filteredBookings.filter(
    booking => booking.status === 'completed'
  );

  const displayedBookings = (bookings) => showAll ? bookings : bookings.slice(0, 3);
   return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50" dir="rtl">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-blue-200">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">حجوزاتي</h1>
            <p className="text-gray-600 text-lg">إدارة مواعيدك الطبية بسهولة وكفاءة</p>
          </div>
          <div className="hidden md:flex items-center gap-3 text-blue-700 bg-blue-100 px-4 py-2 rounded-xl shadow-sm">
            <Calendar className="w-5 h-5" />
            <span className="font-medium text-lg">{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="w-full">
          <div className="grid w-full grid-cols-2 mb-8 bg-white/70 backdrop-blur-lg rounded-xl p-1.5 shadow-md border border-blue-200">
            <button 
              className={`text-lg rounded-lg transition-all duration-300 py-3 font-bold ${activeTab === 'upcoming' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <div className="flex items-center gap-2 justify-center">
                <Clock className="w-5 h-5" />
                <span>الحجوزات القادمة</span>
                {upcomingBookings.length > 0 && (
                  <span className="bg-blue-200 text-blue-900 px-2.5 py-0.5 rounded-full text-sm font-semibold">
                    {upcomingBookings.length}
                  </span>
                )}
              </div>
            </button>
            <button 
              className={`text-lg rounded-lg transition-all duration-300 py-3 font-bold ${activeTab === 'completed' ? 'bg-blue-700 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('completed')}
            >
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-5 h-5" />
                <span>الحجوزات المكتملة</span>
                {completedBookings.length > 0 && (
                  <span className="bg-blue-200 text-blue-900 px-2.5 py-0.5 rounded-full text-sm font-semibold">
                    {completedBookings.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          <div className="space-y-6 animate-in fade-in-50 duration-500">
            { (
              upcomingBookings.length > 0 ? (
                displayedBookings(upcomingBookings).map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-12 shadow-md border border-blue-200">
                  <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-900 text-xl font-semibold mb-2">لا توجد حجوزات قادمة</p>
                  <p className="text-gray-600">عندما تقوم بحجز موعد جديد، سيظهر هنا</p>
                </div>
              )
            )}
            {activeTab === 'completed' && (
              completedBookings.length > 0 ? (
                displayedBookings(completedBookings).map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <div className="text-center bg-white/70 backdrop-blur-lg rounded-2xl p-12 shadow-md border border-blue-200">
                  <Calendar className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-900 text-xl font-semibold mb-2">لا توجد حجوزات مكتملة</p>
                  <p className="text-gray-600">ستظهر هنا سجل زياراتك السابقة</p>
                </div>
              )
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-lg font-bold text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-full shadow-md transition-all duration-300">
              {showAll ? 'عرض أقل' : 'عرض المزيد'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
