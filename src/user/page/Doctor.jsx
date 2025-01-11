import { useState } from "react";
import { doctors } from "../components/data/doctor";
import DoctorCard from "../components/Doctors/DoctorCard";

const departments = Array.from(new Set(doctors.map((doctor) => doctor.department)));

function Doctor() {
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const filteredDoctors = selectedDepartment
        ? doctors.filter((doctor) => doctor.department === selectedDepartment)
        : doctors;

    return (
        <div className="min-h-screen bg-gray-100" dir="rtl">
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    دليل الأطباء
                </h1>

                {/* تصنيف الأقسام */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    <button
                        className={`px-6 py-2 rounded-lg transition-all duration-300 ease-in-out ${selectedDepartment === null ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
                            } hover:bg-blue-700 hover:text-white`}
                        onClick={() => setSelectedDepartment(null)}
                    >
                        الكل
                    </button>
                    {departments.map((department) => (
                        <button
                            key={department}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 ease-in-out ${selectedDepartment === department ? "bg-blue-600 text-white" : "bg-gray-300 text-black"
                                } hover:bg-blue-700 hover:text-white`}
                            onClick={() => setSelectedDepartment(department)}
                        >
                            {department}
                        </button>
                    ))}
                </div>

                {/* عرض الأطباء */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDoctors.map((doctor) => (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Doctor;
