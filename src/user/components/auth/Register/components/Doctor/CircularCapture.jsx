import React, { useRef, useEffect, useState } from "react";

const CircularCapture = ({ onNext }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("استعد لالتقاط الصورة.");

    // Start the camera
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        } catch (err) {
            console.error("Error accessing webcam:", err);
        }
    };

    // Capture image
    // Capture image and store as Base64
    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // تعيين أبعاد الكانفاس لتطابق الفيديو
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // رسم إطار الفيديو على الكانفاس
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // تحويل محتويات الكانفاس إلى Base64
        const imageData = canvas.toDataURL("image/png");

        // تخزين Base64 في Local Storage
        localStorage.setItem("capturedImage", imageData);

        // عرض رسالة نجاح
        setCaptured(true);
        setFeedbackMessage("تم التقاط الصورة وتخزينها كصورة عادية بنجاح!");

        // الانتقال إلى الخطوة التالية بعد التأخير
        setTimeout(() => {
            onNext(); // استدعاء الوظيفة للانتقال للخطوة التالية
        }, 1000);
    };


    useEffect(() => {
        if (isReady && !captured) {
            startCamera(); // بدء الكاميرا بعد أن يصبح المستخدم جاهزًا
            setTimeout(() => {
                captureImage(); // التقاط الصورة تلقائيًا بعد ثانيتين من بداية الكاميرا
            }, 2000);
        }
    }, [isReady, captured]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-white">
            {!isReady ? (
                <div className="text-center">
                    <p className="text-lg">{feedbackMessage}</p>
                    <button
                        onClick={() => setIsReady(true)} // عندما يضغط المستخدم على "استعد"، يبدأ فتح الكاميرا
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        استعد
                    </button>
                </div>
            ) : (
                <>
                    {/* Circle Guide */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <div
                            className="rounded-full border-4 border-green-500"
                            style={{
                                width: "18rem",
                                height: "18rem",
                            }}
                        ></div>
                    </div>

                    {/* Feedback */}
                    <p className="absolute top-10 text-lg text-gray-300">{feedbackMessage}</p>

                    {/* Video Feed */}
                    <video
                        ref={videoRef}
                        className="rounded-full w-[17rem] h-[17rem] object-cover"
                        autoPlay
                        muted
                    ></video>
                    <canvas ref={canvasRef} className="hidden"></canvas>
                </>
            )}
        </div>
    );
};

export default CircularCapture;
