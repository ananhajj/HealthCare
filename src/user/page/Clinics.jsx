// App.jsx
import React, { useState, useMemo } from 'react';
import { clinics, specialties, cities } from '../components/data/clinics';

import { Sidebar } from '../components/Clinics/Sidebar'
import { ClinicCard } from '../components/Clinics/ClinicCard';

function Clinics() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredClinics = useMemo(() => {
        return clinics.filter((clinic) => {
            const matchesSpecialty = !selectedSpecialty || clinic.specialty === selectedSpecialty;
            const matchesCity = !selectedCity || clinic.city === selectedCity;
            const matchesSearch = !searchQuery ||
                clinic.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                clinic.specialty.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesSpecialty && matchesCity && matchesSearch;
        });
    }, [selectedSpecialty, selectedCity, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <Sidebar
                        selectedSpecialty={selectedSpecialty}
                        setSelectedSpecialty={setSelectedSpecialty}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        specialties={specialties}
                        cities={cities}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {filteredClinics.length} عيادة متاحة
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredClinics.map((clinic) => (
                                <ClinicCard key={clinic.id} clinic={clinic} />
                            ))}
                        </div>

                        {filteredClinics.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500 text-lg">
                                    لا توجد عيادات تطابق معايير البحث
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clinics;
