// خريطة الأيام إلى اللغة العربية
const dayMap = {
  Sunday: "الأحد",
  Monday: "الإثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
};

/**
 * دالة لتحويل الوقت من نظام 24 ساعة إلى 12 ساعة
 * @param {string} time - الوقت بصيغة HH:mm:ss
 * @returns {string} الوقت بصيغة 12 ساعة (صباحاً/مساءً)
 */
export const convertTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "مساءً" : "صباحاً";
  const adjustedHours = hours % 12 || 12; // تحويل 0 إلى 12
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

/**
 * دالة لتحويل جدول المواعيد إلى صيغة مجمعة باللغة العربية
 * @param {Array} schedule - بيانات الجدول من API
 * @returns {Array} جدول زمني باللغة العربية
 */
export const formatScheduleArabic = (schedule) => {
  const groupedSchedule = {};

  schedule.forEach(({ day, start_time, end_time }) => {
    const timeRange = `${convertTo12HourFormat(
      start_time
    )} - ${convertTo12HourFormat(end_time)}`;
    if (!groupedSchedule[timeRange]) {
      groupedSchedule[timeRange] = [];
    }
    groupedSchedule[timeRange].push(dayMap[day]); // ترجمة اليوم إلى العربية
  });

  return Object.entries(groupedSchedule).map(
    ([timeRange, days]) => `${days.join("، ")}: ${timeRange}`
  );
};
