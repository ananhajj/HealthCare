import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

const useFetchAllClinics=()=>{
    const [allClinics, setAllClinics]=useState([]);
        const { loading, setLoading } = useContext(UserContext);
        const [error, setError] = useState(null);
    const cleanSchedule = (schedule) => {
        if (!Array.isArray(schedule) || schedule.length === 0) {
            return []; // إرجاع مصفوفة فارغة إذا لم يكن الجدول صالحًا
        }
        return schedule.filter((entry) => entry.available !== 0);
    };
    useEffect(()=>{
        const fetchClinics=async()=>{
            setLoading(true);
            setError(false);
            try{
                const response = await axios.get(
                    `https://d7ef-212-14-228-238.ngrok-free.app/api/clinics`,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                );
                console.log("all clinics",response.data);
                console.log("all clinics c", response.data.data);
                const cleanedClinics = response.data.data.map((clinic) => ({
                    ...clinic,
                    schedule: cleanSchedule(clinic.schedule || []), // استخدام الدالة المحدثة
                }));
                setAllClinics(cleanedClinics);
            }catch(err){
                console.error("Error fetching clinics:", err);
                setError(err);
                setAllClinics([]);
            }finally{
                setLoading(false);
            }
        };
        fetchClinics();
    },[]);
    return{allClinics,loading,error};
}
export default useFetchAllClinics;