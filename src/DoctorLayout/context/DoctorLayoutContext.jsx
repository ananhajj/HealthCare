import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { transformClinics } from "../utils/transformClinics";
import Loading from '../../Loading'
import { generateFullSchedule, generateWorkDays } from "../utils/daysTranslation";

export const DoctorLayoutContext = createContext();


const DoctorLayoutContextProvider = ({ children }) => {
  const doctorId = localStorage.getItem("currentUserId");
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [overview, setOverview] = useState("");
  const [personalInfo, setPersonalInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [clinics, setClinics] = useState([]);
  const [onlineSchedule, setOnlineSchedule] = useState([]);
  const [onlineAppointment, setOnlineAppointment] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_APP_KEY;
  const createdAt = localStorage.getItem("created_At");
  const updateAt = localStorage.getItem("update_at");
  const [specialties, setSpecialties] = useState();
  const [medications, setMedications] = useState([]);

  const fetchDoctor = async () => {
    if (!doctorId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiUrl}/api/doctors/${doctorId}`, {
        headers: { "ngrok-skip-browser-warning": "s" },
      });

      const doctorData = response.data.data;
      console.log("doctor data", doctorData);


      // Parse `about` field for qualifications and overview
      if (doctorData.about) {

        try {
          const aboutData = (doctorData.about);

          if (aboutData.qualifies) {
            setQualifications(aboutData.qualifies);
          }

          if (aboutData.overview) {
            setOverview(aboutData.overview || "هذا نص افتراضي للنظرة العامة");
          }
        } catch (err) {
          console.error("Error parsing about field:", err);
        }
      }





      const personalInfoData = {
        ar_full_name: doctorData?.ar_full_name || "غير متوفر",
        en_full_name: doctorData?.en_full_name || "Not available",
        first_name: doctorData?.first_name || "غير متوفر",
        last_name: doctorData?.last_name || "غير متوفر",
        en_first_name: doctorData?.en_first_name || "Not available",
        en_last_name: doctorData?.en_last_name || "Not available",
        username: doctorData?.username || "Not available",
        id_number: doctorData?.id_number || "غير متوفر",
        email: doctorData?.email || "غير متوفر",
        phone: doctorData?.phone || "غير متوفر",
        speciality: doctorData?.speciality || "غير متوفر",
        image: doctorData?.avatar || "No Image",
        location: "فلسطين",
        joinedDate: new Date(createdAt).toLocaleDateString("ar-EG", {
          month: "long",
          year: "numeric",
        }),
        lastUpdated: updateAt
          ? `${new Date(updateAt).toLocaleDateString("ar-EG", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} - ${new Date(updateAt).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // لتنسيق الوقت بنظام 12 ساعة
          })}`
          : "غير متوفر",
      };

      // Set personal information in the context or state
      setPersonalInfo(personalInfoData);



      const preferencesInfo = {
        onlinePrice: doctorData.online_fee,
        clinicPrice: doctorData.fee,
        waitingTime: doctorData?.online_appointment_time || "غير محدد", // Fetch the first clinic's appointment_time
      };
      setPreferences(preferencesInfo);


      // Update clinics data
      if (doctorData.clinics?.data) {
        console.log("clinics", doctorData.clinics)
        const formattedClinics = transformClinics(doctorData.clinics.data);
        setClinics(formattedClinics);
      }

      // Update online schedule
      if (doctorData.online_schedule) {
        const formattedSchedule = generateFullSchedule(doctorData.online_schedule)
        setOnlineSchedule(formattedSchedule);
      }
    } catch (err) {
      console.error("Error fetching doctor by ID:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);


  const fetchonlineAppointment = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/doctors/${doctorId}/online-appointments`, {
        headers: {
          "ngrok-skip-browser-warning": "s",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },

      });
      const appointments = response.data.data
        .filter(item => item.status === "pending")
        .map((item) => ({
          id: item.id,
          patient: item.patient?.user.first_name || "غير معروف", // إذا كان الاسم غير متوفر
          time: item.time,
          date: item.date.split("T")[0], // دالة لتنسيق التاريخ (اختيارية)
          relativeDate: calculateRelativeDate(item.date),
          status: item.status, // دالة لتحويل الحالة (اختيارية)
        }));

      // دالة لتنسيق التاريخ إلى الصيغة المطلوبة
      function calculateRelativeDate(date) {
        const now = new Date(); // الوقت الحالي
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // بداية اليوم
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // بداية الغد
        const appointmentDate = new Date(date); // تحويل تاريخ الموعد

        const appointmentDateOnly = new Date(
          appointmentDate.getFullYear(),
          appointmentDate.getMonth(),
          appointmentDate.getDate()
        ); // تصفية الوقت من التاريخ

        if (appointmentDateOnly.getTime() === today.getTime()) {
          return "اليوم";
        } else if (appointmentDateOnly.getTime() === tomorrow.getTime()) {
          return "غداً";
        } else {
          return "لاحقاً";
        }
      }




      // دالة لتحويل الحالة إلى النصوص المطلوبة

      setOnlineAppointment(appointments); // تخزين قائمة المدن
    } catch (error) {
      console.error("خطأ في جلب الحجوزات:", error);
      setOnlineAppointment([]); // في حال حدوث خطأ، اجعل قائمة المدن فارغة
    }
  };


  const fetchMedications = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/medications`, {
        headers: {
          "ngrok-skip-browser-warning": "s",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },

      });
      const medication = response.data.data
        .map((item) => ({
          name: item.name,
          dosage: item.dosage,
          instructions: item.instructions
        }));
      setMedications(medication);
    } catch (error) {
      console.error("خطأ في جلب الادوية:", error);
    }
  }
  useEffect(() => {
    if (doctorId) {
      fetchonlineAppointment();
    }
  }, [doctorId]);
  useEffect(() => {
    if (doctorId) {
      fetchMedications();
    }
  }, [doctorId]);


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cities`, {
          headers: { "ngrok-skip-browser-warning": "s" }
        });
        setCities(response.data.data); // تخزين قائمة المدن
      } catch (error) {
        console.error("خطأ في جلب المدن:", error);
        setCities([]); // في حال حدوث خطأ، اجعل قائمة المدن فارغة
      }
    };

    fetchCities();
  }, []);


  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/categories`, {
          headers: { "ngrok-skip-browser-warning": "s" }
        });
        const data = response.data.data;

        if (data && data.length > 0) {


          // تحديث الأيقونات بناءً على `en_name`
          const updatedSpecialties = data.map((specialty) => ({
            ...specialty,
          }));

          setSpecialties(updatedSpecialties);
        }
      } catch (error) {
        console.error("خطأ في جلب التخصصات:", error);
        setSpecialties(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }
  const value = {
    qualifications,
    overview,
    personalInfo,
    clinics,
    setClinics,
    medications,
    preferences,
    setPreferences,
    onlineSchedule,
    onlineAppointment,
    setQualifications,
    setOverview,
    setPersonalInfo,
    loading,
    cities,
    specialties,
    fetchonlineAppointment,
    fetchDoctor,
    error,
  };

  return (
    <DoctorLayoutContext.Provider value={value}>
      {children}
    </DoctorLayoutContext.Provider>
  );
};
export default DoctorLayoutContextProvider;