import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import { cleanSchedule } from "../utils/cleanSchedule"; // استخدام الدالة المشتركة

const useFetchSpecialties = (specialId) => {
    const [specificClinicsByCateg, setSpecificClinicsByCateg] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClinics = async () => {
            if (!specialId) return; // لا ترسل طلبًا إذا لم يتم تحديد التخصص

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://c15b-139-190-147-200.ngrok-free.app/api/categories/${specialId}`,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                );
                 const cleanedClinics = response.data.clinics.data.map((clinic) => ({
                    ...clinic,
                    schedule: cleanSchedule(clinic.schedule || []),
                }));

                setSpecificClinicsByCateg(cleanedClinics);
            } catch (err) {
                console.error("Error fetching clinics by specialty:", err);
                setError(err);
                setSpecificClinicsByCateg([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClinics();
    }, [specialId]);

    return { specificClinicsByCateg, loading, error };
};

export default useFetchSpecialties;
