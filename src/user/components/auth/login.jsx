import React, { useContext, useState } from "react";
import { User, Lock, Search } from "lucide-react"; // استيراد الأيقونات من lucide-react
import { useFormik } from "formik"; // إدارة النماذج باستخدام Formik
import { Link, useNavigate } from "react-router-dom"; // للتوجيه بين الصفحات
import * as Yup from "yup"; // لإضافة التحقق من صحة البيانات
import { UserContext } from "../../context/UserContextProvider";
import { Bounce, Slide, toast } from "react-toastify";

import axios from "axios";
import { encryptData } from "../../../routes/encryption";
import useFetchPatientByIdData from "../../hooks/useFetchPatientByIdData";
import Swal from "sweetalert2";

// التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
    username: Yup.string().required("اسم المستخدم مطلوب"),
    password: Yup.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
});

export default function Login() {
    const { setUserData, setIsLoggedIn, setLoading } = useContext(UserContext);  // الوصول إلى الدوال من السياق
    const apiUrl = "https://f98b-83-244-8-231.ngrok-free.app";
    const [errorMessage, setErrorMessage] = useState(""); // تخزين الأخطاء عند الحاجة
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: LoginUser,
    });
    async function LoginUser() {
        setLoading(true);
        const loginPayload = {
            username: formik.values.username,
            password: formik.values.password,
        };

        try {
            const response = await axios.post(`${apiUrl}/api/login`, loginPayload, {
                headers: { "ngrok-skip-browser-warning": "s" },
            });

            if (response.status === 200) {
                const { token, user } = response.data;

                // تخزين التوكن مباشرةً بدون تشفير
                localStorage.setItem("userToken", token);

                // تشفير بيانات المستخدم وتخزينها
                const encryptedUser = encryptData(user);
                localStorage.setItem("userData", encryptedUser);

                // تحديث السياق
                setUserData(user);
                setIsLoggedIn(true);

                // التنقل بناءً على الدور
                if (user.role_id === 2) {
                    localStorage.setItem("currentUserId", user.id);
                    navigate("/");
                } else if (user.role_id === 1) {
                    navigate("/doctor");
                } else if (user.role_id === 3) {
                    navigate("/admin");
                }

                Swal.fire({
                    title: "تم تسجيل الدخول بنجاح!",
                    text: "مرحبًا بك مرة أخرى 👋",
                    icon: "success",
                    confirmButtonText: "حسنًا",
                    confirmButtonColor: "#3085d6",
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire({
                title: "فشل تسجيل الدخول",
                text: "حدث خطأ أثناء محاولة تسجيل الدخول. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "إعادة المحاولة",
                confirmButtonColor: "#d33",
            });
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="container mx-auto px-6 py-12" dir="rtl">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center mb-6">
                    <User className="h-8 w-8 text-indigo-600" />
                    <h1 className="text-2xl font-bold text-gray-900 ml-3">تسجيل الدخول</h1>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="أدخل اسم المستخدم"
                            />
                            <User className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>

                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                        )}
                    </div>

                    <div className="mb-6   ">
                        <label htmlFor="password" className="block text-gray-700">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="********"
                            />
                            <Lock className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        )}
                    </div>

                    {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

                    <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                        <User className="h-5 w-5" /> {/* أيقونة المستخدم */}
                        <span>تسجيل الدخول</span>
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-sm">
                            نسيت كلمة المرور?{" "}
                            <Link to="/reset-password" className="text-indigo-600 hover:underline">إعادة تعيين كلمة المرور</Link>
                        </p>
                        <p className="text-sm mt-2">
                            ليس لديك حساب؟{" "}
                            <Link to="/register" className="text-indigo-600 hover:underline">سجل الآن</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
