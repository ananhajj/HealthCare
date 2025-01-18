import { X } from "lucide-react";
import React, { useState } from "react";

function WorkHoursModal({ clinicName, isOpen, onClose, onSave }) {
  const [workHours, setWorkHours] = useState([
    { day: "السبت", start: "09:00", end: "17:00", active: true },
    { day: "الأحد", start: "09:00", end: "17:00", active: true },
    { day: "الإثنين", start: "09:00", end: "17:00", active: true },
    { day: "الثلاثاء", start: "09:00", end: "17:00", active: true },
    { day: "الأربعاء", start: "09:00", end: "17:00", active: true },
    { day: "الخميس", start: "09:00", end: "17:00", active: true },
    { day: "الجمعة", start: "09:00", end: "17:00", active: false },
  ]);

  const handleToggleDay = (index) => {
    const updatedHours = [...workHours];
    updatedHours[index].active = !updatedHours[index].active;
    setWorkHours(updatedHours);
  };

  const handleChangeTime = (index, field, value) => {
    const updatedHours = [...workHours];
    updatedHours[index][field] = value;
    setWorkHours(updatedHours);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 transition-all duration-300">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg transition-transform transform scale-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">إعداد ساعات العمل</h2>
            <h2 className="text-xl font-semibold text-gray-800">{clinicName}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {workHours.map((day, index) => (
              <div
                key={day.day}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                  day.active
                    ? "bg-indigo-50 hover:bg-indigo-100 border border-indigo-300"
                    : "bg-gray-100 hover:bg-gray-200 border border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={day.active}
                    onChange={() => handleToggleDay(index)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className={`text-gray-800 ${day.active ? "font-semibold" : "font-normal"}`}>
                    {day.day}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="time"
                    value={day.start}
                    onChange={(e) => handleChangeTime(index, "start", e.target.value)}
                    disabled={!day.active}
                    className={`p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                      day.active ? "focus:ring-indigo-500" : "bg-gray-200"
                    }`}
                  />
                  <span className="text-gray-600">إلى</span>
                  <input
                    type="time"
                    value={day.end}
                    onChange={(e) => handleChangeTime(index, "end", e.target.value)}
                    disabled={!day.active}
                    className={`p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 ${
                      day.active ? "focus:ring-indigo-500" : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-2 space-x-reverse">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              إلغاء
            </button>
            <button
              onClick={() => onSave(workHours)}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default WorkHoursModal;
