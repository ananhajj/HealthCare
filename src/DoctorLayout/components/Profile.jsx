import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Camera } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-6 space-x-reverse mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="text-indigo-600" size={40} />
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
              <Camera size={16} className="text-gray-600" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">د. أحمد محمد</h1>
            <p className="text-gray-500">أخصائي طب عام</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-gray-800 mb-4">المعلومات الشخصية</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="text-gray-400" size={20} />
                <span className="text-gray-600">dr.ahmad@example.com</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="text-gray-400" size={20} />
                <span className="text-gray-600">+962 7 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="text-gray-400" size={20} />
                <span className="text-gray-600">عمان، الأردن</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Calendar className="text-gray-400" size={20} />
                <span className="text-gray-600">انضم في يناير 2020</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-4">التخصصات والشهادات</h2>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-800">بكالوريوس الطب والجراحة</p>
                <p className="text-sm text-gray-500">جامعة العلوم والتكنولوجيا، 2015</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-800">ماجستير طب الأسرة</p>
                <p className="text-sm text-gray-500">الجامعة الأردنية، 2018</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h2 className="font-semibold text-gray-800 mb-4">الإعدادات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
              <User className="mx-auto mb-2 text-indigo-600" size={24} />
              <span className="text-gray-600">تعديل الملف الشخصي</span>
            </button>
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
              <FileText className="mx-auto mb-2 text-indigo-600" size={24} />
              <span className="text-gray-600">الوثائق والشهادات</span>
            </button>
            <button className="p-4 text-center rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
              <Calendar className="mx-auto mb-2 text-indigo-600" size={24} />
              <span className="text-gray-600">تفضيلات المواعيد</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">الأمان والخصوصية</h2>
        <div className="space-y-4">
          <button className="w-full text-right p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
            <h3 className="font-semibold text-gray-800">تغيير كلمة المرور</h3>
            <p className="text-sm text-gray-500">قم بتحديث كلمة المرور الخاصة بك بشكل دوري</p>
          </button>
          <button className="w-full text-right p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
            <h3 className="font-semibold text-gray-800">التحقق بخطوتين</h3>
            <p className="text-sm text-gray-500">قم بتفعيل طبقة حماية إضافية لحسابك</p>
          </button>
          <button className="w-full text-right p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50">
            <h3 className="font-semibold text-gray-800">إعدادات الخصوصية</h3>
            <p className="text-sm text-gray-500">تحكم في من يمكنه رؤية معلوماتك</p>
           </button>
        </div>
      </div>
    </div>
  );
}