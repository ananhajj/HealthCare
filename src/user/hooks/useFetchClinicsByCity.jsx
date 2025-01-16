import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import { cleanSchedule } from "../utils/cleanSchedule"; // استخراج الدالة إلى ملف منفصل

const useFetchClinicsByCity = (cityKey) => {
    const [specificClinics, setSpecificClinics] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClinics = async () => {
            if (!cityKey) return; // لا ترسل طلبًا إذا لم يتم تحديد المدينة

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://d7ef-212-14-228-238.ngrok-free.app/api/cities/${cityKey}`,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                );

                const cleanedClinics = response.data.clinics.data.map((clinic) => ({
                    ...clinic,
                    schedule: cleanSchedule(clinic.schedule || []),
                }));

                setSpecificClinics(cleanedClinics);
            } catch (err) {
                console.error("Error fetching clinics:", err);
                setError(err);
                setSpecificClinics([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClinics();
    }, [cityKey]);

    return { specificClinics, loading, error };
};

export default useFetchClinicsByCity;
