import React, { useState, useEffect } from "react";
import DoctorRegistration from "./components/Doctor/DoctorRegistration";
import EmailVerification from "./components/Doctor/EmailVerification";
import PhoneNumberVerification from "./components/Doctor/PhoneNumberVerification";
import CircularCapture from "./components/Doctor/CircularCapture";
import UploadIdPhoto from "./components/Doctor/UploadIdPhoto";
import VerificationDetails from "./components/Doctor/VerificationDetails";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {useNavigate } from 'react-router-dom';

export default function DoctorFlow({ onBackToRoleSelection }) {
      const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [userDetails, setUserDetails] = useState({});
    const [userId, setUserId] = useState(null);
    const [idPhoto, setIdPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedStep = parseInt(localStorage.getItem("currentStep"), 10) || 1;
        const savedDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
        const savedUserId = localStorage.getItem("userId");

        setCurrentStep(savedStep);
        setUserDetails(savedDetails);
        setUserId(savedUserId);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem("currentStep", currentStep);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("userId", userId);
        }
    }, [currentStep, userDetails, userId, loading]);

    const handleNextStep = (data) => {
        if (data?.idPhoto) setIdPhoto(data.idPhoto);
        if (data?.userDetails) setUserDetails(data.userDetails);
        setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep === 1) {
            onBackToRoleSelection();
        } else {
            setCurrentStep((prev) => prev - 1);
        }
    };
 

    const handleComplete = () => {


        // تنظيف جميع البيانات المخزنة
        localStorage.clear();
        setCurrentStep(1);
        setUserDetails({});
        setUserId(null);
        setIdPhoto(null);

        // عرض رسالة النجاح
        Swal.fire({
            icon: "success",
            title: "🎉 Registration Completed!",
            text: "Our support team will contact you shortly to complete the remaining steps. Thank you for registering!",
            customClass: {
                popup: "rounded-lg shadow-lg bg-blue-50",
                title: "text-blue-700",
                confirmButton: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all",
            },
        }).then(() => {

            navigate("/login");
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-lg"
        >
            {/* شريط التقدم */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                ></div>
            </div>

            {/* الخطوات */}
            {currentStep === 1 && (
                <DoctorRegistration
                    {...userDetails}
                    onNext={(email, phone, userId, details) => {
                        setUserDetails(details);
                        setUserId(userId);
                        handleNextStep({ userDetails: details });
                    }}
                    onBack={handlePreviousStep}
                />
            )}
            {currentStep === 2 && (
                <EmailVerification
                    email={userDetails.email}
                    user_id={userId}
                    onNext={handleNextStep}
                />
            )}
            {currentStep === 3 && (
                <PhoneNumberVerification
                    phone={userDetails.phone}
                    user_id={userId}
                    onNext={handleNextStep}
                />
            )}
            {currentStep === 4 && (
                <CircularCapture onNext={() => handleNextStep()} />
            )}
            {currentStep === 5 && (
                <UploadIdPhoto
                    userId={userId}
                    onBack={handlePreviousStep}
                    onNext={(idPhoto) => handleNextStep({ idPhoto })}
                />
            )}
            {currentStep === 6 && (
                <VerificationDetails
                    userId={userId}
                    idPhoto={idPhoto}
                    onBack={handlePreviousStep}
                    setCurrentStep={setCurrentStep}
                    onComplete={handleComplete}
                />
            )}


        </motion.div>
    );
}
