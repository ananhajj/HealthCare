import { useState, useEffect } from "react";
import axios from "axios";
import { encryptData } from "../../routes/encryption";

const useFetchPatientByIdData = (userId) => {
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = "https://c15b-139-190-147-200.ngrok-free.app";

    useEffect(() => {
        if (!userId ) return;

        const fetchPatientData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/patients/${userId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "s",
                    },
                });

                if (response.status === 200) {
                    const data = response.data.data;
                  

          


                    setPatientData(data); 
                }
            } catch (err) {
                console.error("Error fetching patient data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [userId]);

    return { patientData, loading, error };
};

export default useFetchPatientByIdData;
