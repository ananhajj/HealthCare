import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./UserContextProvider";
import axios from "axios";
import { FaHospital } from "react-icons/fa";
import { transformDoctorData } from "../utils/transformDoctorData";
import { transformOnlineData } from "../utils/transformOnlineData";

export const BookingContext = createContext();
const BookingContextProvider = ({ children }) => {

    const [onlineBooking, setOnlineBooking] = useState([]);
    const { loading, setLoading } = useContext(UserContext);
    const apiUrl = "https://c15b-139-190-147-200.ngrok-free.app";
    const userId=localStorage.getItem("currentUserId");
useEffect(() => {
        const fetchBooking = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/api/patients/${userId}/appointments`, {
                    headers: { "ngrok-skip-browser-warning": "s" },
                });
                  // تصفية الحجوزات حسب visit_type: "online"
                  console.log("filteredBookings",response.data.data);
            const filteredBookings=transformOnlineData(response.data.data)
                setOnlineBooking(filteredBookings);
             console.log("filteredBookings",filteredBookings);
    }catch (error) {
    console.error("خطأ في جلب الدكاترة:", error);
    setOnlineBooking([]); // إذا حدث خطأ، أعد تعيين القائمة لتكون فارغة
  } finally {
    setLoading(false);
  }} 
  fetchBooking();
},[apiUrl, setLoading]);


const contextValue = useMemo(
        () => ({
            onlineBooking,
            loading,
        }),
        [onlineBooking, loading]
    );

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContextProvider;


