import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClinicBanner from "../components/Clinics/ClinicBanner";
import { ClinicCard } from "../components/Clinics/ClinicCard";
import { Sidebar } from "../components/Clinics/Sidebar";
import Loading from "../components/Loading";
import { ClinicContext } from "../context/ClinicContext";
import useFetchClinicsByCity from "../hooks/useFetchClinicsByCity";
import useFetchSpecialties from "../hooks/useFetchClinicBySpecialties";

function Clinics() {
    const { cities, specialties } = useContext(ClinicContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCityId, setSelectedCityId] = useState(null);

    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");

    const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const cityFromURL = queryParams.get("city");
    const specialtyFromURL = queryParams.get("specialty");

    // تحديث ID المدينة بناءً على الاسم
    useEffect(() => {
        if (cityFromURL) {
            setSelectedCity(cityFromURL);
            const city = cities.find((c) => c.ar_name === cityFromURL);
            setSelectedCityId(city?.id || null);
        } else {
            setSelectedCityId(null); // تعيين null إذا لم تكن المدينة محددة
        }
    }, [cityFromURL, cities]);

    // تحديث ID التخصص بناءً على الاسم
    useEffect(() => {
        if (specialtyFromURL) {
            setSelectedSpecialty(specialtyFromURL);
            const specialty = specialties.find((s) => s.ar_name === specialtyFromURL);
            setSelectedSpecialtyId(specialty?.id || null);
        } else {
            setSelectedSpecialtyId(null); // تعيين null إذا لم يكن التخصص محدد
        }
    }, [specialtyFromURL, specialties]);

    // جلب العيادات بناءً على ID المدينة
    const { specificClinics, loading: clinicsLoading, error: clinicsError } = useFetchClinicsByCity(
        selectedCity === "الكل" ? undefined : selectedCityId
    );

    // جلب العيادات بناءً على ID التخصص
    const { specificClinicsByCateg, loading: specialtiesLoading, error: specialtiesError } = useFetchSpecialties(
        selectedSpecialty === "الكل" ? undefined : selectedSpecialtyId
    );

    const loading = clinicsLoading || specialtiesLoading;
    const error = clinicsError || specialtiesError;

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCity) params.set("city", selectedCity);
        if (selectedSpecialty) params.set("specialty", selectedSpecialty);
        navigate(`?${params.toString()}`, { replace: true });
    }, [selectedCity, selectedSpecialty, navigate]);

    // تصفية العيادات
    const filteredClinics = useMemo(() => {
        let clinics = specificClinics || [];

        // إذا كانت المدينة أو التخصص "الكل"، اعرض جميع العيادات
        if (selectedCity === "الكل" && selectedSpecialty === "الكل") {
            return clinics;
        }

        // إذا كان التخصص "الكل"، لا يتم تصفية بناءً عليه
        if (selectedSpecialty && selectedSpecialty !== "الكل") {
            clinics = specificClinicsByCateg || [];
        }

        // التصفية بناءً على البحث
        return clinics.filter((clinic) => {
            return (
                !searchQuery ||
                clinic.doctor?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                clinic.ar_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [specificClinics, specificClinicsByCateg, searchQuery, selectedCity, selectedSpecialty]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <ClinicBanner
                    title="عيادات فلسطين"
                    subtitle="عيادات من كل فلسطين صارت بين ايديك"
                    description="يمكنك الحجز بكل سهولة في أي وقت ومن أي مكان"
                    backgroundImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
                />
                <div className="flex flex-col md:flex-row gap-8">
                    <Sidebar
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        selectedSpecialty={selectedSpecialty}
                        setSelectedSpecialty={setSelectedSpecialty}
                        cities={["الكل", ...cities.map((c) => c.ar_name)]}
                        specialties={["الكل", ...specialties.map((s) => s.ar_name)]}
                    />

                    <div className="flex-1">
                        {error ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                <p className="text-red-500 text-lg">حدث خطأ أثناء جلب البيانات. حاول مرة أخرى.</p>
                            </div>
                        ) : (
                            <>
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
                                        <p className="text-gray-500 text-lg">لا توجد عيادات تطابق معايير البحث.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Clinics;
