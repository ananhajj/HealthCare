import React, { useState } from "react";
import { Building2 } from "lucide-react";

function ClinicBanner({ title, subtitle, description, buttonText, backgroundImage, onButtonClick }) {
  const [showNotification, setShowNotification] = useState(false);

  const handleButtonClick = () => {
    setShowNotification(true);

    // إخفاء الإشعار بعد 5 ثوانٍ
    setTimeout(() => setShowNotification(false), 2000);

    if (onButtonClick) onButtonClick();
  };

  return (
    <div
      className="relative h-[400px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="text-center md:text-right w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            
            <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
            <Building2 className="h-10 w-10 text-white" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4" style={{ direction: "rtl" }}>
            {subtitle}
          </h2>

          <p className="text-lg text-gray-200 mb-8" style={{ direction: "rtl" }}>
            {description}
          </p>

          <button
            className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition duration-300 shadow-lg"
            style={{ direction: "rtl" }}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-gray-50 fill-current" viewBox="0 0 1440 60">
          <path d="M0,0 C480,40 960,40 1440,0 L1440,60 L0,60 Z"></path>
        </svg>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <div>
              <h3 className="font-semibold text-lg">تصفح المدن والعيادات</h3>
              <p className="text-sm">اختر الأنسب لك الآن بكل سهولة!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClinicBanner;
