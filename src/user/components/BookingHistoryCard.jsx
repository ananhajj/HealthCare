import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Video } from "lucide-react";

const combineDateAndTime = (date, time) => {
  const [day, month, year] = date.split('-'); // تقسيم التاريخ
  const [hours, minutes] = time.split(':'); // تقسيم الوقت
  return new Date(year, month - 1, day, hours, minutes); // إنشاء كائن تاريخ صحيح
};


export function  BookingCard({ booking }) {
  const [canStartCall, setCanStartCall] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const bookingDateTime = combineDateAndTime(booking.bookingDate, booking.bookingTime);
      const now = new Date();
      const difference = bookingDateTime - now;

      setCanStartCall(now >= bookingDateTime && booking.status === 'confirmed');

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`);
      } else {
        setTimeLeft('حان موعد المكالمة');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [booking]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'completed':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const handleStartCall = () => {
    if (!canStartCall) {
      alert('عذراً، لا يمكن بدء المكالمة قبل موعد الحجز');
      return;
    }
    console.log('Starting video call...');
  };

  return (
    <div className="w-full p-6 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 group">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
            <img
              src={booking.image}
              alt={booking.doctorName}
              className="object-cover w-full h-full"
            />
          </div>
          <span className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-md ${getStatusColor(booking.status)}`}>
            {booking.status === 'confirmed' ? <CheckCircle className="w-4 h-4" /> : booking.status === 'pending' ? <Clock className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}</span>
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{booking.doctorName}</h3>
            <p className="text-blue-600 font-medium">{booking.specialization}</p>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{`${booking.bookingDate} ${booking.bookingTime}`}</span>
            </div>
            {booking.status !== 'completed' && (
              <p className="text-blue-600 font-medium flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {timeLeft}
              </p>
            )}
          </div>
          {booking.status !== 'completed' && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleStartCall}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-lg font-medium transition-all ${
                  canStartCall ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!canStartCall}
              >
                <Video className="w-5 h-5" />
                {canStartCall ? 'بدء المكالمة' : 'غير متاح الآن'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 