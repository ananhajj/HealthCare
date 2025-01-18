const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate(); // اليوم
  const month = date.getMonth() + 1; // الشهر (مصفوفة تبدأ من 0)
  const year = date.getFullYear(); // السنة

  return `${day}-${month}-${year}`; // الصيغة المطلوبة
};

// مثال على الاستخدام
const originalDate = "2025-01-31T00:00:00.000000Z";
const formattedDate = formatDate(originalDate);

console.log(formattedDate); // "31-1-2025"



export const transformOnlineData = (bookings) => {
      console.log("Bookings",bookings)  
  return bookings
 
    .filter((booking) => booking.visit_type === "online") // تصفية الحجوزات للـ online فقط
    .map((booking) => {
      const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      if (!booking.date || !booking.time) {
        console.warn(`Skipping booking due to missing date or time:`, booking);
        return null;
      }

      // استخراج التاريخ بتنسيق جديد
      const formattedDate = formatDate(booking.date);

      return {
        id: booking.id.toString(),
        doctorName: booking.doctor.ar_full_name, // اسم الطبيب
        specialization: booking.doctor.speciality, // التخصص
        bookingDate: formattedDate, // التاريخ بتنسيق جديد
        bookingTime: booking.time, // الوقت كما هو
        status: booking.status, // حالة الحجز
        image: booking.doctor.avatar || "https://via.placeholder.com/150", // صورة الطبيب أو صورة افتراضية
      };
    })
    .filter(Boolean); // إزالة القيم null من القائمة
};
