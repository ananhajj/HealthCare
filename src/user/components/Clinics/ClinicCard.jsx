// components/ClinicCard.jsx
import React from 'react';
import { Star, Phone, MapPin, Clock, Calendar } from 'lucide-react';

export function ClinicCard({ clinic }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
                <img
                    src={clinic.image}
                    alt={clinic.doctorName}
                    className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="mr-1 text-gray-700 font-medium">{clinic.rating}</span>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{clinic.doctorName}</h3>
                    <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {clinic.specialty}
                    </span>
                </div>
                <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 ml-3 text-gray-400" />
                        <span>{clinic.city} - {clinic.address}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 ml-3 text-gray-400" />
                        <span>{clinic.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 ml-3 text-gray-400" />
                        <span>{clinic.workingHours}</span>
                    </div>
                </div>
                <div className="mt-6">
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                        <Calendar className="w-5 h-5 ml-2" />
                        حجز موعد
                    </button>
                </div>
            </div>
        </div>
    );
}
