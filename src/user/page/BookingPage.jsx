import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { clinics } from '../components/data/clinics';  // أو من الـ API إذا كان متوفرًا
import Loading from '../components/Loading';
import { Calendar, Clock, User, Phone, MessageSquare, Building2 } from 'lucide-react';

function BookingPage() {
    const { clinicId } = useParams();  // الحصول على clinicId من الـ URL
    const [clinic, setClinic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // إضافة حالة تحميل
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        notes: ''
    });
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);  // حالة تأكيد الحجز

    // بيانات المواعيد المتاحة
    const availableSlots = {
        "2024-03-25": [
            { time: "09:00", duration: 30 },
            { time: "10:00", duration: 30 },
            { time: "11:00", duration: 45 },
            { time: "14:00", duration: 30 },
            { time: "15:00", duration: 30 }
        ],
        "2024-03-26": [
            { time: "09:00", duration: 30 },
            { time: "11:00", duration: 45 },
            { time: "13:00", duration: 30 },
            { time: "14:00", duration: 30 },
            { time: "16:00", duration: 30 }
        ],
        "2024-03-27": [
            { time: "10:00", duration: 30 },
            { time: "11:00", duration: 45 },
            { time: "13:00", duration: 30 },
            { time: "15:00", duration: 30 },
            { time: "16:00", duration: 30 }
        ]
    };

    useEffect(() => {
        setIsLoading(true);  // تعيين حالة التحميل إلى true عند بداية التحميل

        // تحويل clinicId إلى عدد صحيح
        const clinicIdInt = parseInt(clinicId, 10);  // التحويل إلى عدد صحيح باستخدام parseInt
        console.log("clinicIdInt", clinicIdInt);

        // تحميل بيانات العيادة بناءً على clinicId
        const selectedClinic = clinics.find(clinic => clinic.id === clinicIdInt);
        console.log("clinic", selectedClinic)

        if (selectedClinic) {
            setClinic(selectedClinic);
        } else {
            // التعامل مع حالة عدم العثور على العيادة
            setClinic(null);
        }

        setIsLoading(false);  // تعيين حالة التحميل إلى false بعد الانتهاء من التحميل
    }, [clinicId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmation = window.confirm(
            `تأكيد حجزك؟\nالوقت: ${selectedTime}\nالمدة: ${availableSlots[selectedDate].find(slot => slot.time === selectedTime).duration} دقيقة`
        );

        if (confirmation) {
            setIsSubmitted(true);
        } else {
            alert('تم إلغاء الحجز.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading) {
        return <Loading />;  // عرض شاشة التحميل
    }

    if (!clinic) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-red-500">
                        العيادة غير موجودة
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{ direction: 'rtl' }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Clinic Info */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-1 transition-all duration-300 hover:shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="h-8 w-8 text-blue-900" />
                            <h2 className="text-2xl font-bold text-blue-900">{clinic.doctorName}</h2>
                        </div>
                        <div className="space-y-4 text-gray-600">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">التخصص:</span>
                                {clinic.specialty}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">العنوان:</span>
                                {clinic.address}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">ساعات العمل:</span>
                                {clinic.workingHours}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold">رقم الهاتف:</span>
                                {clinic.phone}
                            </p>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">حجز موعد</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                                        <User className="w-5 h-5 text-blue-900" />
                                        <span>الاسم الكامل</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                                        <Phone className="w-5 h-5 text-blue-900" />
                                        <span>رقم الهاتف</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 mb-2">
                                    <Calendar className="w-5 h-5 text-blue-900" />
                                    <span>اختر اليوم</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {Object.keys(availableSlots).map((date) => (
                                        <button
                                            key={date}
                                            type="button"
                                            onClick={() => {
                                                setSelectedDate(date);
                                                setSelectedTime('');
                                            }}
                                            className={`p-3 rounded-lg border ${selectedDate === date
                                                ? 'bg-blue-900 text-white border-blue-900'
                                                : 'border-gray-300 hover:border-blue-500'
                                                }`}
                                        >
                                            {new Date(date).toLocaleDateString('ar-EG', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Slots */}
                            {selectedDate && (
                                <div>
                                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                                        <Clock className="w-5 h-5 text-blue-900" />
                                        <span>اختر الوقت المناسب</span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                        {availableSlots[selectedDate].map(({ time, duration }) => {
                                            const timeParts = time.split(':');
                                            const hour = parseInt(timeParts[0], 10);
                                            const isAM = hour < 12;
                                            const formattedTime = `${hour % 12 || 12}:${timeParts[1]} ${isAM ? 'صباحًا' : 'مساءً'}`;
                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`p-3 rounded-lg border ${selectedTime === time
                                                        ? 'bg-blue-900 text-white border-blue-900'
                                                        : 'border-gray-300 hover:border-blue-500'
                                                        }`}
                                                >
                                                    {formattedTime} - {duration} دقيقة
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            <div>
                                <label className="flex items-center gap-2 text-gray-700 mb-2">
                                    <MessageSquare className="w-5 h-5 text-blue-900" />
                                    <span>ملاحظات إضافية</span>
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Reminder and Submit Button */}
                            <div className="text-center text-gray-700 mb-4">
                                <p>⚠️ تذكر، هذا الحجز سيكون هامًا لحالتك الطبية. تأكد من اختيار الوقت المناسب وعدم التسرع في الحجز!</p>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedDate || !selectedTime}
                                className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                تأكيد الحجز
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
