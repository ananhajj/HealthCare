import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Search, Plus } from 'lucide-react';

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المواعيد</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2 space-x-reverse">
          <Plus size={20} />
          <span>موعد جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4">
          <div className="text-center p-4">
            {/* Calendar Component would go here */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <CalendarIcon className="mx-auto mb-2" size={24} />
              <p className="text-gray-600">التقويم</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 mb-4">المواعيد المتاحة</h3>
            {['09:00 ص', '10:30 ص', '11:00 ص', '12:30 م'].map((time) => (
              <button
                key={time}
                className="w-full text-right px-4 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث عن موعد..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                patient: 'محمد أحمد',
                time: '09:30 ص',
                type: 'كشف',
                status: 'مؤكد'
              },
              {
                id: 2,
                patient: 'فاطمة علي',
                time: '10:00 ص',
                type: 'متابعة',
                status: 'في الانتظار'
              },
              {
                id: 3,
                patient: 'خالد محمود',
                time: '11:30 ص',
                type: 'استشارة',
                status: 'جديد'
              }
            ].map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/20"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Clock className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{appointment.patient}</h4>
                    <p className="text-sm text-gray-500">{appointment.time} - {appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    appointment.status === 'مؤكد' ? 'bg-green-50 text-green-600' :
                    appointment.status === 'في الانتظار' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {appointment.status}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800">تعديل</button>
                  <button className="text-red-600 hover:text-red-800">إلغاء</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}