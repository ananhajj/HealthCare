import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Clock, Loader } from "lucide-react"; // Icons
import Swal from "sweetalert2"; // SweetAlert2 for notifications
import axios from "axios";


const VerificationDetails = ({ idPhoto, onBack, onComplete, setCurrentStep }) => {
    const [loading, setLoading] = useState(false);

    const isRequestSentRef = useRef(false);

    useEffect(() => {
        const prepareAndSubmit = async () => {
            if (isRequestSentRef.current) return; // إذا تم الإرسال مسبقًا، لا تفعل شيئًا
            isRequestSentRef.current = true; // تعيين الحالة إلى تم الإرسال

            try {
                console.log("Uploaded ID Photo:", idPhoto);

                const role = localStorage.getItem("role"); // جلب الدور من التخزين المحلي
                const capturedPhotoBase64 =localStorage.getItem("capturedImage"); // الصورة الملتقطة فقط للدكتور
                const userId = localStorage.getItem("userId");

                if (!idPhoto || !userId) {
                    // التحقق من وجود الصورة ومعرف المستخدم
                    Swal.fire({
                        icon: "warning",
                        title: "Missing ID Photo",
                        text: "Please upload your ID photo again.",
                    }).then(() => {
                        setCurrentStep(3); // إعادة التوجيه إلى خطوة Upload Photo
                    });
                    return; // إيقاف العملية
                }

                const formData = new FormData();
                formData.append("user_id", userId);
                formData.append("reference", idPhoto);

                if (role === "doctor" && capturedPhotoBase64) {
                    const capturedPhotoBlob = base64ToBlob(capturedPhotoBase64, "image/png");
                    formData.append("face", capturedPhotoBlob, "captured_photo.png");
                }

                await handleSubmitDetails(formData);
            } catch (error) {
                console.error("Error preparing verification data:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message || "Failed to prepare verification data.",
                });
            }
        };

        prepareAndSubmit();
    }, [idPhoto]);


    const base64ToBlob = (base64, contentType) => {
        const byteCharacters = atob(base64.split(",")[1]);
        const byteNumbers = Array.from(byteCharacters).map((char) =>
            char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };


    const backendUrl = '';


    const handleSubmitDetails = async (formData) => {
      //  const role = localStorage.getItem("role");

     /*   if (role === "patient") {
            try {
                setLoading(true);


                // إذا كان الدور مريض
                const response = await axios.post(
                    `${backendUrl}api/patient/verification`,

                    formData
                    ,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                );

                console.log("Patient Verification Response:", response.data);

                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Verification Successful",
                        text: "Your identity has been successfully verified!",
                    }).then(() => {
                        onComplete(); // إكمال الخطوات
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Verification Failed",
                        text: "Verification failed. Please try again.",
                    });
                }
            } catch (error) {
                if (error.response) {
                    const errorData = error.response.data;
                    console.error("Error Response:", errorData);

                    // معالجة الأخطاء الخاصة بالـ API
                    if (errorData.redirect === "id_card") {
                        Swal.fire({
                            icon: "warning",
                            title: "ID Photo Issue",
                            text: errorData.error || "Please upload a clearer photo of your ID.",
                        }).then(() => {
                            setCurrentStep(3); // Redirect to Upload ID Photo step
                        });
                    } else if (errorData.redirect === "user") {
                        Swal.fire({
                            icon: "error",
                            title: "User Details Issue",
                            text: errorData.error || "Your details are incorrect. Please re-enter your information.",
                        }).then(async () => {
                            await handleDeleteUser();
                            setCurrentStep(1); // Redirect to User Registration step
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Unexpected Error",
                            text: errorData.error || "An unexpected error occurred. Please try again.",
                        });
                    }
                } else if (error.request) {
                    console.error("No Response from Server:", error.request);
                    Swal.fire({
                        icon: "error",
                        title: "Server Unreachable",
                        text: "Could not connect to the server. Please try again later.",
                    });
                } else {
                    console.error("Error:", error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message || "An error occurred during verification.",
                    });
                }
            } finally {
                setLoading(false);
            }

        }*/
            try {
                const response = await axios.post(
                    `${backendUrl}api/face/verification`,
                    formData,
                    { headers: { "ngrok-skip-browser-warning": "s" } }
                );

                console.log("Response Data:", response.data.face_verification?.decision);

                if (
                    ["accept", "review"].includes(response.data.face_verification?.decision)
                ) {
                    Swal.fire({
                        icon: "success",
                        title: "Verification Successful",
                        text: "Your identity has been successfully verified or is under review!",
                    }).then(() => {
                        localStorage.setItem("verificationResult", JSON.stringify(response.data));
                        onComplete();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Verification Failed",
                        text: "Your verification did not succeed. Please try again.",
                    }).then(() => {
                        setCurrentStep(4);
                    });
                }
            } catch (error) {
                if (error.response) {
                    const errorData = error.response.data;
                    console.error("Error Response:", errorData);

                    // معالجة الأخطاء الخاصة بالـ API
                    if (errorData.redirect === "id_card") {
                        Swal.fire({
                            icon: "warning",
                            title: "ID Photo Issue",
                            text: errorData.error || "Please upload a clearer photo of your ID.",
                        }).then(() => {
                            setCurrentStep(5); // Redirect to Upload ID Photo step
                        });
                    } else if (errorData.redirect === "user") {
                        Swal.fire({
                            icon: "error",
                            title: "User Details Issue",
                            text: errorData.error || "Your details are incorrect. Please re-enter your information.",
                        }).then(async () => {
                            await handleDeleteUser();
                            setCurrentStep(1); // Redirect to User Registration step
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Unexpected Error",
                            text: errorData.error || "An unexpected error occurred. Please try again.",
                        });
                    }
                } else if (error.request) {
                    console.error("No Response from Server:", error.request);
                    Swal.fire({
                        icon: "error",
                        title: "Server Unreachable",
                        text: "Could not connect to the server. Please try again later.",
                    });
                } else {
                    console.error("Error:", error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error.message || "An error occurred during verification.",
                    });
                }
            } finally {
                setLoading(false);
            }

        }
    


    const handleDeleteUser = async () => {
        const userId = localStorage.getItem("userId");
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));

        if (localStorage.getItem("role") == "patient") {
            try {
                if (userId) {
                    await axios.delete(`${backendUrl}api/users/${userId}`)
                    console.log(`User with ID ${userId} deleted successfully.`);
                }
            } catch (error) {
                console.error("Error deleting user:", error.response ? error.response.data : error.message);
            }
        }
        else {
            try {
                if (userId) {
                    await axios.delete(`${backendUrl}api/doctors/${userId}`);
                    console.log(`User with ID ${userId} deleted successfully.`);
                }
            } catch (error) {
                console.error("Error deleting user:", error.response ? error.response.data : error.message);
            }
        }
        localStorage.setItem("userDetailsBackup", JSON.stringify(userDetails));
        localStorage.removeItem("role");
        localStorage.removeItem("currentStep");
        localStorage.removeItem("userId");
        localStorage.removeItem("capturedImage");
    };





    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white text-gray-800 rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* Header Section */}
            <div className="flex flex-col items-center mb-6">
                <CheckCircle
                    className="h-16 w-16 text-blue-600 animate-pulse"
                    aria-label="Verification in progress"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    Verifying Your Account
                </h2>
            </div>

            {/* Loading Indicator */}
            <div className="flex items-center justify-center space-x-4 mb-6">
                <Loader className="h-6 w-6 text-yellow-500 animate-spin" />
                <span className="text-lg text-gray-600">
                    Your information is being verified. Please wait...
                </span>
            </div>

            {/* Status Messages */}
            <p className="text-center text-gray-500 text-sm mb-6">
                This may take a few moments. Do not refresh or close the page.
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={onBack}
                    disabled={loading}
                    className="w-full bg-gray-200 py-2 px-4 rounded-md text-gray-800 hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default VerificationDetails;
