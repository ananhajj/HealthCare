import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../data/doctor";
import { ArrowLeft, Calendar, Calendar as CalendarIcon, Clock, MapPin, Phone } from "lucide-react";
import BookingForm from "./BookingForm";
import { UserContext } from "../../context/UserContextProvider";
import Loading from "../Loading";

function DoctorPage() {
    const { doctorId } = useParams();
    const { loading, setLoading } = useContext(UserContext); // استدعاء UserContext
    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        setLoading(true); // تعيين حالة التحميل
        setTimeout(() => {
            const foundDoctor = doctors.find((doc) => String(doc.id) === String(doctorId));
            setDoctor(foundDoctor);
            setLoading(false); // إنهاء التحميل
        }, 1000);
    }, [doctorId, setLoading]);

    if (loading) {
        return <Loading />;
    }

    if (!doctor) {
        return <div className="text-center text-red-500">الطبيب غير موجود</div>;
    }

    const generateTimeSlots = (date) => {
        const slots = [];
        for (let hour = 8; hour < 17; hour++) {
            const startTime = new Date(date);
            startTime.setHours(hour, 0, 0, 0);
            const endTime = new Date(date);
            endTime.setHours(hour + 1, 0, 0, 0);
            slots.push({
                id: `${hour}:00`,
                startTime: startTime.toLocaleTimeString(),
                endTime: endTime.toLocaleTimeString(),
                isAvailable: true,
            });
        }
        return slots;
    };

    const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];
    return (
        <div className="min-h-screen bg-gray-100" dir="rtl">
            <div className="container mx-auto py-8">
                <button
                    className="mb-6 flex items-center text-white bg-blue-600 hover:bg-blue-700 hover:text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="h-5 w-5 mr-3" />
                    العودة إلى قائمة الأطباء
                </button>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* معلومات الطبيب */}
                    <div className="md:col-span-2 p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
                        <div className="flex gap-6 mb-6">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-32 h-32 rounded-lg object-cover shadow-md"
                            />
                            <div>
                                <h1 className="text-2xl font-semibold mb-2">{doctor.name}</h1>
                                <p className="text-lg text-muted-foreground mb-2">{doctor.specialization}</p>
                                <p className="text-muted-foreground">خبرة {doctor.experience} سنوات</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-3">المؤهلات العلمية</h2>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {doctor.education.map((edu, index) => (
                                    <li key={index}>{edu}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-3">العيادات</h2>
                            <div className="space-y-4">
                                {doctor.clinics.map((clinic, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 cursor-pointer transition-colors duration-300 rounded-md border-2 ${selectedClinic?.name === clinic.name ? 'border-blue-600' : 'hover:border-gray-400'}`}
                                        onClick={() => {
                                            setSelectedClinic(selectedClinic?.name === clinic.name ? null : clinic);
                                        }}
                                    >
                                        <h3 className="font-semibold text-lg mb-2">{clinic.name}</h3>
                                        <div className="space-y-2 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{clinic.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                <span>{clinic.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                <span>{clinic.workingHours}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* حجز موعد */}
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            حجز موعد
                        </h2>

                        {!selectedClinic ? (
                            <p className="text-muted-foreground text-center py-4">
                                الرجاء اختيار عيادة للحجز
                            </p>
                        ) : (
                            <>
                                <Calendar
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => date < new Date() || date.getDay() === 5}
                                    className="mb-4"
                                />

                                {selectedDate && (
                                    <div>
                                        <h3 className="font-semibold mb-3">المواعيد المتاحة:</h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    className={`w-full p-2 border ${selectedTimeSlot?.id === slot.id ? 'bg-blue-600 text-white' : 'border-gray-300 hover:bg-blue-100'}`}
                                                    disabled={!slot.isAvailable}
                                                    onClick={() => setSelectedTimeSlot(slot)}
                                                >
                                                    {slot.startTime}
                                                </button>
                                            ))}
                                        </div>

                                        {selectedTimeSlot && (
                                            <button
                                                className="w-full mt-4 bg-blue-600 text-white py-2 hover:bg-blue-700 transition-all duration-300"
                                                onClick={() => setShowBookingForm(true)}
                                            >
                                                متابعة الحجز
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {showBookingForm && (
                    <BookingForm
                        open={true}
                        onClose={() => setShowBookingForm(false)}
                        doctor={doctor}
                        clinic={selectedClinic}
                        date={selectedDate}
                        timeSlot={selectedTimeSlot}
                    />
                )}
            </div>
            </div>
            );
            }
export default DoctorPage;