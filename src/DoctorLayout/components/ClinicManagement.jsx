import React, { useState } from 'react';
import { Building2, Clock, MapPin, Phone, Calendar, Users } from 'lucide-react';
import WorkHoursModal from './WorkHoursModal';

export default function ClinicManagement() {
  const [activeClinic, setActiveClinic] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);


  
  const clinics = [
    {
      id: 1,
      name: 'عيادة الشفاء - الرئيسية',
      address: 'شارع الملك عبدالله، عمان',
      phone: '+962 6 123 4567',
      hours: '9:00 ص - 5:00 م',
      workingDays: 'السبت - الخميس'
    },
    {
      id: 2,
      name: 'عيادة الشفاء - الفرع الثاني',
      address: 'شارع الجامعة، إربد',
      phone: '+962 2 765 4321',
      hours: '10:00 ص - 6:00 م',
      workingDays: 'الأحد - الخميس'
    }
  ];


  const handleSaveWorkHours = (updatedHours) => {
    console.log("Updated Work Hours:", updatedHours);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">إدارة العيادات</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          إضافة عيادة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinics List */}
        <div className="lg:col-span-1 space-y-4">
          {clinics.map((clinic, index) => (
            <button
              key={clinic.id}
              onClick={() => setActiveClinic(index)}
              className={`w-full text-right p-4 rounded-xl border ${
                activeClinic === index
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/20'
              }`}
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                  <Building2 className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
                  <p className="text-sm text-gray-500">{clinic.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Clinic Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {clinics[activeClinic].name}
              </h2>
              <p className="text-gray-500">تفاصيل العيادة وإعدادات الجدول</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MapPin className="text-gray-400" size={20} />
                  <span className="text-gray-600">{clinics[activeClinic].address}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Phone className="text-gray-400" size={20} />
                  <span className="text-gray-600">{clinics[activeClinic].phone}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="text-gray-400" size={20} />
                  <span className="text-gray-600">{clinics[activeClinic].hours}</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="text-gray-400" size={20} />
                  <span className="text-gray-600">{clinics[activeClinic].workingDays}</span>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">إحصائيات سريعة</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Users className="text-indigo-600" size={20} />
                      <span className="text-gray-600">المرضى اليوم</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Clock className="text-indigo-600" size={20} />
                      <span className="text-gray-600">وقت الانتظار</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">15 دقيقة</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">إعدادات الجدول</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                  onClick={() => setModalOpen(true)}
                  className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50"
                >
                  <Clock className="mx-auto mb-2 text-indigo-600" size={24} />
                  <span className="text-gray-600">ساعات العمل</span>
                </button>
                <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
                  <Calendar className="mx-auto mb-2 text-indigo-600" size={24} />
                  <span className="text-gray-600">العطل والإجازات</span>
                </button>
                <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
                  <Users className="mx-auto mb-2 text-indigo-600" size={24} />
                  <span className="text-gray-600">الموظفين</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
       <WorkHoursModal
  clincName={clinics[activeClinic].name} // إصلاح هنا
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveWorkHours}
      />
    </div>
  );

}