import { Star, Video, MessageCircle, Phone } from "lucide-react";

export const DoctorCard = ({ doctor, isActive }) => {

    const fullStars = Math.floor(doctor.rating); // النجوم الممتلئة
    const halfStars = doctor.rating % 1 >= 0.5 ? 1 : 0; // إذا كان هناك نصف نجم
    const emptyStars = 5 - fullStars - halfStars; // ا
    return (
        <div
            className={`transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-85 opacity-40 hidden lg:block"
                }`}
            dir="rtl"
        >
            <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
                {/* صورة الطبيب */}
                <div className="relative mb-6">
                    <img
                        src={doctor.avatar}
                        alt={doctor.ar_full_name}
                        className="w-full h-56 object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                        {doctor.nextAvailable}
                    </div>
                </div>

                {/* معلومات الطبيب */}
                <div className="space-y-4 text-right">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.ar_full_name}</h3>
                        <p className="text-mainColor font-medium mb-2">{doctor.specialityAr}</p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {/* النجوم الممتلئة */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: fullStars }, (_, index) => (
                                    <Star
                                        key={`full-${index}`}
                                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                    />
                                ))}

                                {/* النجوم نصف المملوءة */}
                                {Array.from({ length: halfStars }, (_, index) => (
                                    <Star
                                        key={`half-${index}`}
                                        className="w-5 h-5 fill-yellow-200 text-yellow-200"
                                    />
                                ))}

                                {/* النجوم الفارغة */}
                                {Array.from({ length: emptyStars }, (_, index) => (
                                    <Star
                                        key={`empty-${index}`}
                                        className="w-5 h-5 text-gray-300"
                                    />
                                ))}
                            </div>

                            {/* عدد التقييمات */}
                            <span className="text-gray-600 text-sm">({doctor.rating} تقييمات)</span>
                        </div>

                        <div className="flex justify-center gap-2 mb-4">
                            <Video
                                className={`w-5 h-5 ${doctor.online_active === 1 ? "text-blue-500" : "text-gray-400"
                                    }`}
                            />
                            <MessageCircle
                                className={`w-5 h-5 ${doctor.online_active === 1 ? "text-green-500" : "text-gray-400"
                                    }`}
                            />
                            <Phone
                                className={`w-5 h-5 ${doctor.online_active === 1 ? "text-red-500" : "text-gray-400"
                                    }`}
                            />
                        </div>

                    </div>

                    {/* زر الحجز */}
                    <button className="w-full bg-mainColor text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg shadow-blue-100">
                        احجز موعد
                    </button>
                </div>
            </div>
        </div>
    );
};
