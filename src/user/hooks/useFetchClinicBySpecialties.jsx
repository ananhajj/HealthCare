import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

const useFetchSpecialties = (specialId) => {
    const [specificClinicsByCateg, setSpecificClinics] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const [error, setError] = useState(null);
    console.log("specific key", specialId);
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
                const response = specialId !== undefined
                    ? await axios.get(
                        `https://f98b-83-244-8-231.ngrok-free.app/api/categories/${specialId}`,
                        { headers: { "ngrok-skip-browser-warning": "s" } }
                    ) : await axios.get(
                        `https://f98b-83-244-8-231.ngrok-free.app/api/clinics`,
                        { headers: { "ngrok-skip-browser-warning": "s" } }
                    )


                console.log("Response data:", response.data);
                console.log("Response clinic:", response.data.clinics);
                // تنظيف الجدول لكل عيادة
                const cleanedClinics = response.data.clinics.map((clinic) => ({
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


        if (specialId) {
            fetchClinics();
        }
    }, [specialId]);

    return { specificClinicsByCateg, loading, error };
};

export default useFetchSpecialties;
