import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function Sidebar({
    selectedSpecialty,
    setSelectedSpecialty,
    selectedCity,
    setSelectedCity,
    specialties = [], // التحقق من أن specialties قائمة افتراضية فارغة
    cities = [], // التحقق من أن cities قائمة افتراضية فارغة
}) {
    const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
    const [isCityOpen, setIsCityOpen] = useState(false);

    const toggleSpecialty = () => setIsSpecialtyOpen(!isSpecialtyOpen);
    const toggleCity = () => setIsCityOpen(!isCityOpen);

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">تصفية النتائج</h2>

                {/* التخصص */}
                <div className="mb-4">
                    <button
                        className={`w-full text-left text-lg font-semibold text-gray-700 transition-all duration-300 ${isSpecialtyOpen
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'hover:bg-indigo-100 hover:text-indigo-700'
                            } py-2 px-4 rounded-lg flex items-center justify-between md:hidden`}
                        onClick={toggleSpecialty}
                    >
                        <span>التخصصات</span>
                        {isSpecialtyOpen ? (
                            <ChevronUp className="h-5 w-5 text-indigo-700" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-indigo-700" />
                        )}
                    </button>
                    {isSpecialtyOpen && (
                        <div className="mt-2 border-t pt-2">
                            <ul className="space-y-2">
                                {specialties.map((specialty, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`specialty-${index}`}
                                            value={specialty}
                                            checked={selectedSpecialty === specialty}
                                            onChange={() => setSelectedSpecialty(specialty)}
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`specialty-${index}`}
                                            className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-300 hover:scale-105"
                                        >
                                            {specialty}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* المدينة */}
                <div>
                    <button
                        className={`w-full text-left text-lg font-semibold text-gray-700 transition-all duration-300 ${isCityOpen
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'hover:bg-indigo-100 hover:text-indigo-700'
                            } py-2 px-4 rounded-lg flex items-center justify-between md:hidden`}
                        onClick={toggleCity}
                    >
                        <span>المدن</span>
                        {isCityOpen ? (
                            <ChevronUp className="h-5 w-5 text-indigo-700" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-indigo-700" />
                        )}
                    </button>
                    {isCityOpen && (
                        <div className="mt-2 border-t pt-2">
                            <ul className="space-y-2">
                                {cities.map((city, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`city-${index}`}
                                            value={city}
                                            checked={selectedCity === city}
                                            onChange={() => setSelectedCity(city)}
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`city-${index}`}
                                            className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-300 hover:scale-105"
                                        >
                                            {city}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* ظهور الفلاتر على الشاشات الكبيرة */}
                <div className="hidden md:block">
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">التخصصات</label>
                        <ul className="space-y-2">
                            {specialties.map((specialty, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`specialty-lg-${index}`}
                                        value={specialty}
                                        checked={selectedSpecialty === specialty}
                                        onChange={() => setSelectedSpecialty(specialty)}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`specialty-lg-${index}`}
                                        className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-300 hover:scale-105"
                                    >
                                        {specialty}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">المدن</label>
                        <ul className="space-y-2">
                            {cities.map((city, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`city-lg-${index}`}
                                        value={city}
                                        checked={selectedCity === city}
                                        onChange={() => setSelectedCity(city)}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`city-lg-${index}`}
                                        className="cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-300 hover:scale-105"
                                    >
                                        {city}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
