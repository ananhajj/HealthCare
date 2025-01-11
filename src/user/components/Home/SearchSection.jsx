import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";

export function SearchSection() {
    // إنشاء حالة لتخزين البيانات المدخلة في الحقول
    const [doctorOrSpecialty, setDoctorOrSpecialty] = useState("");
    const [city, setCity] = useState("");

    // دالة لمعالجة البحث
    const handleSearch = () => {
    
        console.log("بحث عن: ", doctorOrSpecialty, "في المدينة: ", city);
 
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-blue-600 skew-y-3 transform -z-10 h-[120%] -mt-10"></div>
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold text-mainColor mb-6 leading-tight">
                    احجز موعدك الطبي بسهولة وأمان
                </h1>
                <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                    نوفر لك أفضل الأطباء في جميع التخصصات في فلسطين
                </p>

                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
                    <div className="flex flex-wrap gap-4">
                        {/* حقل البحث عن الطبيب أو التخصص */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                className="pl-10 h-12 text-lg w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="ابحث عن طبيب أو تخصص"
                                value={doctorOrSpecialty} // ربط الحقل بحالة `doctorOrSpecialty`
                                onChange={(e) => setDoctorOrSpecialty(e.target.value)} // تحديث القيمة عند التغيير
                            />
                        </div>
                        {/* حقل البحث عن المدينة */}
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                className="pl-10 h-12 text-lg w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="المدينة"
                                value={city} // ربط الحقل بحالة `city`
                                onChange={(e) => setCity(e.target.value)} // تحديث القيمة عند التغيير
                            />
                        </div>
                        {/* زر البحث */}
                        <button
                            onClick={handleSearch} // عند الضغط على الزر، نطلق دالة البحث
                            className="w-full md:w-auto h-12 text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
                        >
                            ابحث الآن
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
