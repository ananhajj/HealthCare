import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

function DoctorCard({ doctor }) {
    const navigate = useNavigate();

    if (!doctor) return null;

    const handleClick = () => {
        // استخدم التنقل مع id الطبيب
        navigate(`/doctor/${doctor.id}`);
    };
    return (
        <div className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-blue-500 border rounded-lg">
            <div className="relative h-48">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
                />
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.department}</p>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                    </div>
                    <button
                        onClick={handleClick}
                        className="mt-1 p-2 border-2 border-transparent rounded-full hover:border-blue-500 transition-all"
                    >
                        <User className="h-5 w-5 text-gray-600 hover:text-blue-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DoctorCard;
