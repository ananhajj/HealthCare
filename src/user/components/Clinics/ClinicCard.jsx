import React from "react";
import { Calendar, MapPin, User } from "lucide-react";
import { formatScheduleArabic } from "../../utils/scheduleFormatter";

export const ClinicCard = ({ clinic, onBooking }) => {
    console.log("clinic",clinic);
    const formattedSchedule = clinic.schedule ? clinic.schedule : ["غير محدد"];
    return (
        <div className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            {/* الصورة */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                    {clinic.doctor && clinic.doctor.avatar ? (
                        <img
                            src={clinic.doctor.avatar}
                            alt={clinic.doctor.full_name || "صورة الطبيب"}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 sm:border-6 border-white shadow-md"
                        />
                    ) : (
                        <img
                            src="https://via.placeholder.com/64" // صورة افتراضية عند عدم وجود صورة
                            alt="صورة افتراضية"
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 sm:border-6 border-white shadow-md"
                        />
                    )}
                </div>
                <div>
                    {/* اسم العيادة */}
                    <h3 className="text-xl font-bold text-blue-900">{clinic.ar_name}</h3>
                    <p className="text-m text-gray-800">عيادة</p>
                </div>
            </div>

            {/* التفاصيل */}
            <div className="space-y-4 text-gray-600">
                {/* الطبيب */}
                <p className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">الطبيب:</span>
                    {clinic.doctor?.full_name || "غير محدد"}
                </p>

                {/* العنوان */}
                <p className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold">العنوان:</span>
                    {clinic.address
                        ? `${clinic.address.address_line_1 || ""}، ${clinic.address.address_line_2 || ""}، ${clinic.address.address_line_3 || ""}`
                        : `عنوان غير محدد`}
                </p>

                {/* الجدول */}
                <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                        <span className="font-semibold">الجدول:</span>
                        <ol className="list-disc pl-5 text-sm mt-1">
                            {clinic.schedule?.length > 0
                                ? formatScheduleArabic(clinic.schedule).map((entry, index) => (
                                    <li key={index} className="font-semibold text-blue-900">
                                        {entry}
                                    </li>
                                ))
                                : "غير متوفر"}
                        </ol>
                    </div>
                </div>
            </div>

            {/* زر الحجز */}
            <div className="mt-6">
                <button
                    onClick={() => onBooking(clinic.id)}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                >
                    <Calendar className="w-5 h-5 ml-2" />
                    حجز موعد
                </button>
            </div>
        </div>
    );

};
