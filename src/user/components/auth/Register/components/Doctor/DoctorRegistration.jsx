import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Stethoscope, Building, Award, Calendar } from 'lucide-react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^059[0-9]{7}$/, 'Invalid phone number') // Palestinian phone number
        .required('Phone number is required'),
    username: Yup.string().required('Username is required'),
    dob: Yup.date().required('Date of birth is required'),
    speciality: Yup.string().required('Specialty is required'),
    id_number: Yup.string()
        .length(10, 'ID number must be 10 digits')
        .required('ID number is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Password confirmation is required')
});

export default function DoctorRegistration({
    email,
    phone,
    firstName,
    lastName,
    dob,
    username,
    speciality,
    id_number,
    onNext,
    onBack,
}) {
    /*   const [formData, setFormData] = useState({
           email: email || '',
           phone: phone || '',
           first_name: firstName || '',
           last_name: lastName || '',
           dob: dob || '',
           username: username || '',
           speciality: speciality || '',
           id_number: id_number || '',
       });*/
    const formik = useFormik({
        initialValues: {
            email: email || '',
            phone: phone || '',
            first_name: firstName || '',
            last_name: lastName || '',
            dob: dob || '',
            username: username || '',
            speciality: speciality || '',
            id_number: id_number || '',
            password: '',
            password_confirmation: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values); // هنا يمكن استدعاء عملية التسجيل
        }
    });

    const [loading, setLoading] = useState(false);
    const [backendErrors, setBackendErrors] = useState('');
    const backendUrl = '';

    const handleSubmit = async (values) => {

        /*setLoading(true);
        try {
            const response = await axios.post(
                `${backendUrl}api/doctor/register`,
                values,
                { headers: { "ngrok-skip-browser-warning": "s" } }
            );

            if (response.status === 201) {
                const userDetails = { ...values };
                localStorage.setItem("userDetails", JSON.stringify(userDetails));
                onNext(values.email, values.phone, response.data.user_id, userDetails);
            }
        } catch (error) {
            if (error.response?.data) setBackendErrors(error.response.data.error);
        } finally {
            setLoading(false);
        }*/
        const userDetails = { ...values };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        console.log("values:", values);
        onNext(values.email, values.phone,  1, userDetails);
    };


    const handleDateOfBirthChange = (e) => {
        const newDate = e.target.value;
        formik.setFieldValue('dob', newDate);


        // تخزين تاريخ الميلاد في localStorage
        localStorage.setItem("birthday", newDate);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 overflow-auto md:overflow-visible max-h-screen rtl" dir="rtl">

            {/* قسم العنوان */}
            <div className="text-center mb-8">
                <Stethoscope className="h-12 w-12 text-blue-600 mb-3" />
                <h1 className="text-2xl font-semibold text-gray-800">مرحباً بك دكتور</h1>
                <p className="text-gray-600">يرجى تعبئة النموذج لإنشاء حسابك</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                    {/* الاسم الأول */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            الاسم الأول
                        </label>
                        <div className="relative">
                            <input
                                name="first_name"
                                type="text"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.first_name && formik.touched.first_name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.first_name}</p>
                        )}
                        {backendErrors.first_name && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.first_name[0]}</p>
                        )}
                    </div>

                    {/* الاسم الأخير */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            الاسم الأخير
                        </label>
                        <div className="relative">
                            <input
                                name="last_name"
                                type="text"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.last_name && formik.touched.last_name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.last_name}</p>
                        )}
                        {backendErrors.last_name && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.last_name[0]}</p>
                        )}
                    </div>

                    {/* البريد الإلكتروني */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            البريد الإلكتروني
                        </label>
                        <div className="relative">
                            <input
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                        {backendErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.email[0]}</p>
                        )}
                    </div>

                    {/* رقم الهاتف */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهاتف
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.phone && formik.touched.phone && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                        )}
                        {backendErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.phone[0]}</p>
                        )}
                    </div>

                    {/* اسم المستخدم */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            اسم المستخدم
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.username && formik.touched.username && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                        )}
                        {backendErrors.username && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.username[0]}</p>
                        )}
                    </div>

                    {/* تاريخ الميلاد */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تاريخ الميلاد
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                name="dob"
                                value={formik.values.dob}
                                onChange={handleDateOfBirthChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.dob && formik.touched.dob && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.dob}</p>
                        )}
                        {backendErrors.dob && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.dob[0]}</p>
                        )}
                    </div>

                    {/* التخصص */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            التخصص
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="speciality"
                                value={formik.values.speciality}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Stethoscope className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.speciality && formik.touched.speciality && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.speciality}</p>
                        )}
                        {backendErrors.speciality && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.speciality[0]}</p>
                        )}
                    </div>

                    {/* رقم الهوية */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهوية
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="id_number"
                                value={formik.values.id_number}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <Award className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        {formik.errors.id_number && formik.touched.id_number && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.id_number}</p>
                        )}
                        {backendErrors.id_number && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.id_number[0]}</p>
                        )}
                    </div>

                    {/* كلمة المرور */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                        {backendErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{backendErrors.password[0]}</p>
                        )}
                    </div>

                    {/* تأكيد كلمة المرور */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password_confirmation"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                className={`block w-full pr-10 pl-4 py-2.5 text-gray-700 bg-white border rounded-lg focus:outline-none ${formik.values.password !== formik.values.password_confirmation
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                    }`}
                                required
                            />
                        </div>
                        {formik.values.password !== formik.values.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">كلمتا المرور غير متطابقتين</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        الرجوع
                    </button>
                    <button
                        type="submit"
                        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            'التالي'
                        )}
                    </button>
                </div>
            </form>
        </div>

    );
}
