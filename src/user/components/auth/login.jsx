import React, { useState } from "react";
import { User, Lock, Search } from "lucide-react"; // استيراد الأيقونات من lucide-react
import { useFormik } from "formik"; // إدارة النماذج باستخدام Formik
import { Link } from "react-router-dom"; // للتوجيه بين الصفحات
import * as Yup from "yup"; // لإضافة التحقق من صحة البيانات

// التحقق من صحة البيانات باستخدام Yup
const validationSchema = Yup.object({
    username: Yup.string().required("اسم المستخدم مطلوب"),
    password: Yup.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
});

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(""); // تخزين الأخطاء عند الحاجة
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            // هنا يمكنك التعامل مع البيانات المدخلة
            console.log(values);
        },
    });

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
