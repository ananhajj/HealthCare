import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { transformOnlineData } from "../utils/transformOnlineData";
import axios from "axios";
const useFetchBookingPatient = () => {
    const [onlineBooking, setOnlineBooking] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const apiUrl = import.meta.env.VITE_APP_KEY;
    const userId = localStorage.getItem("currentUserId");
    useEffect(() => {
        const fetchBooking = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/api/patients/${userId}/appointments`, {
                    headers: {
                        "ngrok-skip-browser-warning": "s",
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        "Content-Type": "application/json",
                    },
                });
                // تصفية الحجوزات حسب visit_type: "online"
                console.log("filteredBookings", response.data.data);
                const filteredBookings = transformOnlineData(response.data.data)
                setOnlineBooking(filteredBookings);
                console.log("filteredBookings", filteredBookings);
            } catch (error) {
                console.error("خطأ في جلب الحجوزات:", error);
                setOnlineBooking([]); // إذا حدث خطأ، أعد تعيين القائمة لتكون فارغة
            } finally {
                setLoading(false);
            }
        }
        fetchBooking();
    }, [apiUrl, userId]);

    return { onlineBooking, loading }
}
export default useFetchBookingPatient;
