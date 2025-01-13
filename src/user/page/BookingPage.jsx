import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ar from "date-fns/locale/ar";
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Phone,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useFetchClinicById from "../hooks/useFetchClinicById";

registerLocale("ar", ar);

function BookingPage() {
    const { clinicId } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const {clinic,loading ,error}=useFetchClinicById(clinicId);

    console.log("clinic:id", clinicId)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        notes: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const availableSlots = {
        "2024-03-25": [
            { time: "09:00", duration: 30 },
            { time: "11:00", duration: 45 },
        ],
        "2024-03-26": [
            { time: "10:00", duration: 30 },
            { time: "14:00", duration: 30 },
        ],
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
    };

    const handleTimeSlotSelection = (time) => {
        setSelectedTimeSlot(time);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTimeSlot) {
            alert("يرجى اختيار تاريخ ووقت قبل تأكيد الحجز.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleBookingConfirmation = () => {
        alert(`تم تأكيد الحجز بتاريخ ${selectedDate.toLocaleDateString("ar-EG")} في الساعة ${selectedTimeSlot}.`);
        setIsModalOpen(false);
    };

    const getAvailableTimeSlots = () => {
        if (!selectedDate) return [];
        const formattedDate = selectedDate.toISOString().split("T")[0];
        return availableSlots[formattedDate] || [];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4" dir="rtl">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">
                    حجز موعد
                </h1>

                {/* التقويم */}
                <div className="mb-6">
                    <h2 className="text-bold font-bold text-blue-900 flex items-center gap-2 mb-4">
                        <CalendarIcon className="w-6 h-6 text-blue-300" />
                        اختر التاريخ
                    </h2>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        inline
                        locale="ar"
                        highlightDates={[
                            new Date("2024-03-25"),
                            new Date("2024-03-26"),
                        ]}
                        dayClassName={(date) => {
                            const formattedDate = date.toISOString().split("T")[0];
                            return availableSlots[formattedDate]
                                ? "bg-green-200 text-green-800"
                                : "bg-gray-100 text-gray-500";
                        }}
                        calendarClassName="rounded-lg shadow-md border border-gray-300"
                    />
                </div>

                {/* الأوقات المتاحة */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-900 flex items-center gap-2 mb-4">
                        <Clock className="w-6 h-6 text-blue-300" />
                        الأوقات المتاحة
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {getAvailableTimeSlots().length > 0 ? (
                            getAvailableTimeSlots().map(({ time, duration }) => {
                                const timeParts = time.split(":");
                                const hour = parseInt(timeParts[0], 10);
                                const isAM = hour < 12;
                                const formattedTime = `${hour % 12 || 12}:${timeParts[1]} ${isAM ? "صباحًا" : "مساءً"}`;
                                return (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSlotSelection(time)}
                                        className={`py-2 px-3 rounded-lg font-medium border text-center transition ${selectedTimeSlot === time
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-50 hover:bg-blue-100 hover:text-blue-900 border-gray-300"
                                            }`}
                                    >
                                        <span>{formattedTime}</span>
                                        <br />
                                        <span className="text-sm text-gray-500">{duration} دقيقة</span>
                                    </button>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 col-span-full text-center">
                                لا توجد أوقات متاحة لهذا التاريخ.
                            </p>
                        )}
                    </div>
                </div>

                {/* نموذج الحجز */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">الاسم الكامل</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
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
                                التاريخ: {selectedDate.toLocaleDateString("ar-EG")}
                                <br />
                                الوقت: {selectedTimeSlot}
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
        </div>
    );
}

export default BookingPage;
