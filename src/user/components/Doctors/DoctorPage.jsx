import {
    ArrowLeft,
    Calendar as CalendarIcon,
    MapPin,
    Phone,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import useFetchBookedClinicSlots from "../../hooks/useFetchBookedClinicSlots";
import useFetchDoctorById from "../../hooks/useFetchDoctorById";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import Loading from "../Loading";

function DoctorPage() {
    useEffect(() => {
        window.scrollTo(0, 0); // إعادة التمرير إلى الأعلى عند تحميل الصفحة
    }, []);
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { doctor, loading: doctorLoading, error: doctorError } = useFetchDoctorById(doctorId);

    const [viewOnlineBooking, setViewOnlineBooking] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { bookedSlots, loading: slotsLoading, error: slotsError } = useFetchBookedClinicSlots(
        selectedClinic?.id
    );

    console.log("bookedSlots كامل:", bookedSlots);
    const dateKey = selectedDate.toISOString().split("T")[0];
    console.log("تاريخ اليوم المختار:", dateKey);
    console.log("الأوقات المحجوزة في هذا اليوم:", bookedSlots[dateKey] || []);



    const handleClinicSelection = (clinic) => {
        setSelectedClinic(clinic);
        setSelectedDate(new Date());
        setSelectedTimeSlot(null);
    };

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

    const handleBookingConfirmation = () => {
        alert(`تم حجز الموعد: ${selectedTimeSlot}`);
        setIsModalOpen(false);
    };


    const normalizeTime = (time) => {
        const [timePart, period] = time.split(" "); // تقسيم الوقت إلى HH:MM و AM/PM
        const [hours, minutes] = timePart.split(":").map(Number);
        const isPM = period === "PM" || period === "مساءً"; // دعم الصيغتين الإنجليزية والعربية
        const adjustedHours = isPM ? (hours % 12) + 12 : hours; // تحويل إلى صيغة 24 ساعة
        return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    };


    const getAvailableTimeSlots = () => {
        if (viewOnlineBooking) {
            const dayOfWeek = selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
            });

            const onlineDay = doctor.onlineSchedule.find(
                (schedule) => schedule.day === dayOfWeek
            );

            return onlineDay
                ? generateTimeSlots(onlineDay, doctor.appointment_time || 15)
                : [];
        }

        if (!selectedClinic) return [];

        const dayMap = {
            Sunday: "الأحد",
            Monday: "الإثنين",
            Tuesday: "الثلاثاء",
            Wednesday: "الأربعاء",
            Thursday: "الخميس",
            Friday: "الجمعة",
            Saturday: "السبت",
        };
        const dayOfWeekArabic = dayMap[selectedDate.toLocaleDateString("en-US", { weekday: "long" })];

        const workingDay = selectedClinic.workingHours.find((wh) => wh.day === dayOfWeekArabic);

        if (!workingDay) return [];

        const availableSlots = generateTimeSlots(workingDay, selectedClinic.appointment_time);

        const dateKey = selectedDate.toISOString().split("T")[0];
        const bookedTimes = bookedSlots[dateKey] || [];

        // تطبيع الأوقات المحجوزة
        const normalizedBookedTimes = bookedTimes.map((time) => normalizeTime(time));

        console.log("Tile Date:", dateKey, "Normalized Booked Times:", normalizedBookedTimes);

        // استثناء الأوقات المحجوزة
        const filteredSlots = availableSlots.filter((slot) => {
            const normalizedSlot = normalizeTime(extractStartTime(slot));
            const isBooked = normalizedBookedTimes.includes(normalizedSlot);

            // طباعة إضافية للمقارنة
            console.log(`Comparing: Slot (${normalizedSlot}) with Booked Times (${normalizedBookedTimes}) -> Is Booked: ${isBooked}`);

            return !isBooked;
        });

        return filteredSlots;
    };

    const extractStartTime = (timeRange) => {
        if (!timeRange.includes("-")) return timeRange; // إذا لم يكن النطاق يتضمن "-"، نعتبره وقتًا فقط
        return timeRange.split("-")[0].trim(); // استخراج وقت البداية قبل "-"
    };

 


    const tileClassName = ({ date }) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) return "text-gray-400";

        const dayOfWeekArabic = normalizeText(date.toLocaleDateString("ar-EG", { weekday: "long" }));


        const isAvailable = viewOnlineBooking
            ? doctor.onlineSchedule.some((schedule) => normalizeText(schedule.day) === dayOfWeekArabic)
            : selectedClinic &&
            selectedClinic.workingHours.some((wh) => normalizeText(wh.day) === dayOfWeekArabic);


       

        return isAvailable
            ? "bg-green-100 hover:bg-green-200 text-green-900 font-semibold rounded-md"
            : "text-gray-400";
    };

    const normalizeText = (text) => text.trim().normalize("NFD").replace(/[\u064B-\u065F]/g, "");



    const formatTimeRangeToArabic = (timeRange) => {
        if (!timeRange || typeof timeRange !== "string" || !timeRange.includes("-")) {
            console.error("Invalid time range format:", timeRange);
            return "نطاق وقت غير صالح"; // إذا كان النطاق غير صحيح
        }

        // تقسيم النص إلى وقتين
        const [startTime, endTime] = timeRange.split("-").map((time) => time.trim());

        // تنسيق كل وقت بشكل منفصل
        const formatTime = (time) => {
            const [timePart, period] = time.split(" "); // تقسيم الوقت إلى HH:MM و AM/PM
            const [hours, minutes] = timePart.split(":").map(Number);
            const isPM = period === "PM";
            const adjustedHours = isPM ? (hours % 12) + 12 : hours; // تحويل إلى صيغة 24 ساعة
            const arabicPeriod = isPM ? "مساءً" : "صباحًا";
            return `${adjustedHours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${arabicPeriod}`;
        };

        // تنسيق البداية والنهاية
        const startFormatted = formatTime(startTime);
        const endFormatted = formatTime(endTime);

        return `${startFormatted} - ${endFormatted}`;
    };
    if (doctorLoading || slotsLoading) {
        return <Loading />;
    }
    if (doctorError || slotsError || !doctor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl text-red-500">
                    عذرًا، حدث خطأ أثناء تحميل البيانات.
                </p>
            </div>
        );
    }
    return (
        <div
            className="min-h-screen bg-gradient-to-r from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8"
            dir="rtl"
        >
            <div className="container mx-auto py-8">
                {/* زر العودة */}
                <button
                    className="mb-6 flex items-center text-white bg-mainColor hover:bg-blue-700 py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-5 w-5 mr-3" />
                    العودة إلى قائمة الأطباء
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* معلومات الطبيب */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-4"
                        />
                        <h1 className="text-2xl font-semibold text-center mb-2">
                            {doctor.name}
                        </h1>
                        <p className="text-lg text-muted-foreground text-center mb-2">
                            {doctor.speciality}
                        </p>
                        <p className="text-center text-gray-600">
                            <div className="text-center text-yellow-500 text-lg">
                                {Array.from({ length: Math.floor(doctor.rating) }, (_, index) => (
                                    <span key={index}>★</span> // نجمة ممتلئة
                                ))}
                                {doctor.rating % 1 >= 0.5 && <span>★</span>} {/* نصف نجمة إذا كان التقييم يحتوي على .5 */}
                                {Array.from({ length: 5 - Math.ceil(doctor.rating) }, (_, index) => (
                                    <span key={index} className="text-gray-300">★</span> // نجمة فارغة
                                ))}
                            </div>

                        </p>

                        {!viewOnlineBooking && (
                            <div className="mt-6">
                                {doctor.clinics.length > 0 && (
                                    <h2 className="text-2xl font-semibold mb-3 text-mainColor">
                                        {doctor.clinics.length === 1 ? "عيادة" : "العيادات"}
                                    </h2>
                                )}

                                <div className="space-y-4">
                                    {doctor.clinics.map((clinic, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 cursor-pointer border-2 rounded-lg ${selectedClinic?.id === clinic.id
                                                ? "border-blue-600"
                                                : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            onClick={() => handleClinicSelection(clinic)}
                                        >
                                            <h3 className="font-semibold mb-2">{clinic.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                <MapPin className="inline-block w-4 h-4 mr-1" />
                                                {clinic.address}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <Phone className="inline-block w-4 h-4 mr-1" />
                                                {clinic.phone}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* التقويم والمواعيد */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-mainColor">
                            <CalendarIcon className="h-5 w-5" />
                            {viewOnlineBooking
                                ? "المواعيد الإلكترونية"
                                : doctor.clinics.length > 0
                                    ? "مواعيد العيادة"
                                    : ""}
                        </h2>

                        {/* أزرار التبديل */}
                        <div className="flex gap-4 mb-4">
                            {doctor.clinics.length > 0 && ( // عرض زر مواعيد العيادة فقط إذا كانت هناك عيادات
                                <button
                                    className={`py-2 px-4 rounded-lg ${!viewOnlineBooking
                                        ? "bg-mainColor text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                    onClick={() => setViewOnlineBooking(false)}
                                >
                                    مواعيد العيادة
                                </button>
                            )}
                            <button
                                className={`py-2 px-4 rounded-lg ${viewOnlineBooking
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                                onClick={() => setViewOnlineBooking(true)}
                            >
                                المواعيد الإلكترونية
                            </button>
                        </div>

                        {/* التقويم */}
                        <Calendar
                            value={selectedDate}
                            onChange={(date) => {
                                console.log("التاريخ الذي تم إرساله من التقويم قبل التعديل:", date);
                                handleDateChange(date);
                            }}
                            tileDisabled={({ date }) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                            }}
                            tileClassName={tileClassName}
                            locale="ar-EG"
                            className="mb-4"
                        />




                        {/* عرض اليوم */}
                        <div className="mb-4 text-center">
                            <h3 className="text-lg font-semibold text-blue-900">
                                {selectedDate.toLocaleDateString("ar-EG", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </h3>
                        </div>

                        {/* الأوقات المتاحة */}
                        <div className="space-y-4">
                            {getAvailableTimeSlots().length > 0 ? (
                                <>
                                    <h3 className="text-lg font-semibold text-blue-900">الأوقات المتاحة</h3>
                                    <div className="max-h-60 overflow-y-auto space-y-3 px-2 border border-gray-300 rounded-md">
                                        {getAvailableTimeSlots().map((slot, index) => {
                                            const dateKey = selectedDate.toISOString().split("T")[0];
                                            const bookedTimes = bookedSlots[dateKey]?.map((time) =>
                                                normalizeTime(time)
                                            ) || [];

                                            const normalizedSlot = normalizeTime(extractStartTime(slot));
                                            const isBooked = bookedTimes.includes(normalizedSlot);

                                            return (
                                                <button
                                                    key={index}
                                                    className={`w-full py-3 px-6 text-center rounded-md border transition-all duration-200 ${isBooked
                                                            ? "bg-red-200 text-red-800 cursor-not-allowed shadow-md" // تنسيق خاص للأوقات المحجوزة
                                                            : selectedTimeSlot === slot
                                                                ? "bg-blue-600 text-white shadow-lg"
                                                                : "bg-gray-50 text-gray-800 hover:bg-blue-100 hover:text-blue-600"
                                                        }`}
                                                    onClick={() => !isBooked && handleTimeSlotSelection(slot)} // السماح بالتحديد فقط إذا لم يكن محجوزًا
                                                    disabled={isBooked} // تعطيل الزر إذا كان الوقت محجوزًا
                                                >
                                                    {formatTimeRangeToArabic(slot)}{" "}
                                                    {isBooked && <span className="ml-2 text-sm">(محجوز)</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500">لا توجد أوقات متاحة لهذا اليوم.</p>
                            )}
                        </div>






                        {/* زر الحجز الآن */}
                        {selectedTimeSlot && (
                            <div className="mt-4 text-center">
                                <button
                                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    احجز الآن
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* موديل التأكيد */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-xl font-semibold mb-4 text-blue-900">
                            تأكيد الحجز
                        </h3>
                        <p className="text-gray-600 mb-4">
                            هل أنت متأكد من حجز الموعد التالي؟
                        </p>
                        <p className="text-gray-800 font-semibold mb-4">
                            {selectedTimeSlot}
                        </p>
                        <div className="flex gap-4 justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                إلغاء
                            </button>
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                onClick={handleBookingConfirmation}
                            >
                                تأكيد
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DoctorPage;

