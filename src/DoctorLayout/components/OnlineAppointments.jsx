import React, { useState } from 'react';
import { Video, Calendar, Clock, Search } from 'lucide-react';

export default function OnlineAppointments() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">المواعيد الإلكترونية</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Online Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">المواعيد القادمة</h2>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  patient: 'سارة محمد',
                  time: '02:30 م',
                  date: 'اليوم',
                  status: 'قريباً'
                },
                {
                  id: 2,
                  patient: 'أحمد خالد',
                  time: '04:00 م',
                  date: 'اليوم',
                  status: 'في الانتظار'
                },
                {
                  id: 3,
                  patient: 'ليلى عمر',
                  time: '11:00 ص',
                  date: 'غداً',
                  status: 'مجدول'
                }
              ].map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/20"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Video className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{appointment.patient}</h4>
                      <p className="text-sm text-gray-500">{appointment.time} - {appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      appointment.status === 'قريباً' ? 'bg-green-50 text-green-600' :
                      appointment.status === 'في الانتظار' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-indigo-50 text-indigo-600'
                    }`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'قريباً' && (
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                        بدء الجلسة
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Online Consultation Hours */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">ساعات الاستشارة عن بعد</h2>
            <div className="space-y-4">
              {[
                { day: 'الأحد', hours: '10:00 ص - 2:00 م' },
                { day: 'الثلاثاء', hours: '1:00 م - 5:00 م' },
                { day: 'الخميس', hours: '9:00 ص - 1:00 م' }
              ].map((schedule, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border border-gray-100 hover:border-indigo-100"
                >
                  <h4 className="font-semibold text-gray-800">{schedule.day}</h4>
                  <p className="text-sm text-gray-500">{schedule.hours}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              تعديل المواعيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}