import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

const useFetchClinicsByCity = (cityKey) => {
    const [specificClinics, setSpecificClinics] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const [error, setError] = useState(null);
    console.log("key",cityKey);
    // دالة لتنظيف الجدول
    const cleanSchedule = (schedule) => {
        if (!Array.isArray(schedule) || schedule.length === 0) {
            return []; // إرجاع مصفوفة فارغة إذا لم يكن الجدول صالحًا
        }
        return schedule.filter((entry) => entry.available !== 0);
    };

    useEffect(() => {
        const fetchClinics = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = cityKey != undefined
                    ?await axios.get(
                    `https://f98b-83-244-8-231.ngrok-free.app/api/cities/${cityKey}`,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                    ) : await axios.get(
                        `https://f98b-83-244-8-231.ngrok-free.app/api/clinics`,
                        { headers: { "ngrok-skip-browser-warning": "s" } }
                    )

                console.log("Response data:", response.data);

                // تنظيف الجدول لكل عيادة
                const cleanedClinics = response.data.clinics.data.map((clinic) => ({
                    ...clinic,
                    schedule: cleanSchedule(clinic.schedule || []), // استخدام الدالة المحدثة
                }));

                console.log("clinic.schedule :", cleanedClinics);
                setSpecificClinics(cleanedClinics);
            } catch (err) {
                console.error("Error fetching clinics:", err);
                setError(err);
                setSpecificClinics([]);
            } finally {
                setLoading(false);
            }
        };


        if (cityKey) {
            fetchClinics();
        }
    }, [cityKey]);

    return { specificClinics, loading, error };
};

export default useFetchClinicsByCity;
