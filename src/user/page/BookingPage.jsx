import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import useFetchClinicById from "../hooks/useFetchClinicById";
import useFetchBookedClinicSlots from "../hooks/useFetchBookedClinicSlots";
import Loading from "../components/Loading";
 

const dayMap = {
    Sunday: "الأحد",
    Monday: "الإثنين",
    Tuesday: "الثلاثاء",
    Wednesday: "الأربعاء",
    Thursday: "الخميس",
    Friday: "الجمعة",
    Saturday: "السبت",
};

function BookingPage() {
    const { clinicId } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showSlots, setShowSlots] = useState(false); // حالة للتحكم في الإظهار/الإخفاء

    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const { clinic, loading: getClinicLoading, error: getClinicError } = useFetchClinicById(clinicId);
    const [formData, setFormData] = useState({ name: "", phone: "" });
    const { bookedSlots, loading: slotsLoading, error: slotsError } = useFetchBookedClinicSlots(clinicId)
     
    if (getClinicLoading || slotsLoading) {
        return <Loading />;
    }
    console.log("bookedSlots",bookedSlots);
    const handleDateChange = (date) => {
        console.log("التاريخ المستلم في handleDateChange قبل التعديل:", date);

        // ضبط التاريخ ليكون في منتصف الليل في التوقيت المحلي
        const adjustedDate = new Date(date);
        adjustedDate.setHours(12, 0, 0, 0); // ضمان استخدام وقت وسط اليوم لتفادي الفروقات الزمنية

        console.log("التاريخ المستلم في handleDateChange بعد التعديل:", adjustedDate);

        setSelectedDate(adjustedDate);
        setSelectedTimeSlot(null);
    };


    const handleTimeSlotSelection = (slot) => {
        setSelectedTimeSlot(slot);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTimeSlot) {
            alert("يرجى اختيار تاريخ ووقت قبل تأكيد الحجز.");
            return;
        }
        alert(`تم تأكيد الحجز بتاريخ ${selectedDate.toLocaleDateString("ar-EG")} في الساعة ${selectedTimeSlot}.`);
    };

    const generateTimeSlots = (workingDay, interval, bookedTimes = []) => {
        const slots = [];
        const [startHour, startMinute] = workingDay.start_time.split(":").map(Number);
        const [endHour, endMinute] = workingDay.end_time.split(":").map(Number);

        let current = new Date();
        current.setHours(startHour, startMinute, 0, 0);

        const end = new Date();
        end.setHours(endHour, endMinute, 0, 0);

        const normalizedBookedTimes = bookedTimes.map(normalizeTime); // تطبيع الأوقات المحجوزة

        while (current < end) {
            const next = new Date(current.getTime() + interval * 60000);
            const startTime = current.toTimeString().slice(0, 5); // وقت البداية
            const endTime = next.toTimeString().slice(0, 5); // وقت النهاية

            const isBooked = normalizedBookedTimes.includes(startTime); // التحقق من الحجز
            slots.push({ start: startTime, end: endTime, isBooked });

            current = next;
        }
        return slots;
    };

    const normalizeTime = (time) => {
        const [timePart, period] = time.split(" "); // تقسيم الوقت إلى HH:MM و AM/PM
        const [hours, minutes] = timePart.split(":").map(Number);
        const isPM = period === "PM" || period === "مساءً"; // دعم الصيغتين الإنجليزية والعربية
        const adjustedHours = isPM ? (hours % 12) + 12 : hours; // تحويل إلى صيغة 24 ساعة
        return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };

    const getAvailableTimeSlots = () => {
        if (!clinic || !clinic.workingHours) return [];
        const dayOfWeek = dayMap[selectedDate.toLocaleDateString("en-US", { weekday: "long" })];
        const workingDay = clinic.workingHours.find((wh) => wh.day === dayOfWeek);

        if (!workingDay) return [];

        const dateKey = selectedDate.toISOString().split("T")[0];
        const bookedTimes = (bookedSlots[dateKey] || []).map(normalizeTime); // الأوقات المحجوزة

        return generateTimeSlots(workingDay, clinic.appointment_time || 15, bookedTimes);
    };



    const formatTime = (time) => {
        const [hour, minute] = time.split(":").map(Number);
        const isAM = hour < 12;
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${isAM ? "صباحًا" : "مساءً"}`;
    };

    const tileClassName = ({ date }) => {
        if (!clinic || !clinic.workingHours) return "";
        const dayOfWeek = dayMap[date.toLocaleDateString("en-US", { weekday: "long" })];
        const isAvailable = clinic.workingHours.some((wh) => wh.day === dayOfWeek);
        return isAvailable ? "bg-green-100 text-green-900" : "text-gray-400";
    };
  
    if (slotsError || getClinicError || !clinic) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-red-500">
                    عذرًا، حدث خطأ أثناء تحميل البيانات.
                </p>
            </div>
        );
    }
    
 
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4" dir="rtl">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">حجز موعد</h1>

                <ul className="list-none text-right mb-6 space-y-4">
                    <li className="text-lg">
                        <span className="font-semibold text-gray-800">اسم العيادة:</span> {clinic.name}
                    </li>
                    <li className="text-lg">
                        <span className="font-semibold text-gray-800">العنوان:</span> {clinic.address}
                    </li>
                    <li className="text-lg">
                        <span className="font-semibold text-gray-800">رقم الهاتف:</span> {clinic.phone}
                    </li>
                </ul>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <CalendarIcon className="w-6 h-6 text-blue-500" />
                        اختر التاريخ
                    </h2>
                    <Calendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        tileDisabled={({ date }) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                        }}
                        tileClassName={tileClassName}
                        locale="ar-EG"
                        className="mb-4"
                    />
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-500" />
                        الأوقات المتاحة
                    </h2>
                    <button
                        onClick={() => setShowSlots((prev) => !prev)} // تحديث حالة العرض
                        className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        {showSlots ? "إخفاء الأوقات" : "إظهار الأوقات"}
                    </button>
                    {showSlots && ( // عرض الأوقات فقط إذا كانت الحالة مفعّلة
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {getAvailableTimeSlots().length > 0 ? (
                                getAvailableTimeSlots().map((slot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !slot.isBooked && handleTimeSlotSelection(`${slot.start}-${slot.end}`)}
                                        className={`py-3 px-4 rounded-lg font-medium border text-center transition ${slot.isBooked
                                            ? "bg-red-200 text-red-800 border-red-500 cursor-not-allowed"
                                            : selectedTimeSlot === `${slot.start}-${slot.end}`
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-50 hover:bg-blue-100 hover:text-blue-900 border-gray-300"
                                            }`}
                                        disabled={slot.isBooked}
                                    >
                                        {formatTime(slot.start)} - {formatTime(slot.end)}
                                        {slot.isBooked && <span className="block text-sm text-red-600">محجوز</span>}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full text-center">لا توجد أوقات متاحة لهذا التاريخ.</p>
                            )}
                        </div>
                    )}
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">الاسم الكامل</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        تأكيد الحجز
                    </button>
                </form>
            </div>
        </div>
    );
}

export default BookingPage;
