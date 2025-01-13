import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, FileText, Camera } from "lucide-react";

export default function PatientProfile() {
    const [patient, setPatient] = useState({
        name: "أحمد محمد",
        email: "ahmed@example.com",
        phone: "+970 59 123 4567",
        address: "غزة، فلسطين",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60",
        bloodType: "A+",
        age: 32,
        weight: "75 كغم",
        height: "175 سم",
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = () => {
        if (previewImage) {
            setPatient((prev) => ({ ...prev, avatar: previewImage }));
            setPreviewImage(null);
            alert("تم تحديث الصورة الشخصية بنجاح");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي</h1>
                    <Link to="/medical-records">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <FileText className="mr-2 h-4 w-4" />
                            السجل الطبي
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">المعلومات الشخصية</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <img
                                    src={patient.avatar}
                                    alt="Avatar"
                                    className="h-20 w-20 rounded-full object-cover"
                                />
                                <button
                                    className="absolute bottom-0 left-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition"
                                    onClick={() => document.getElementById("picture").click()}
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                                <input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold">{patient.name}</h3>
                                <p className="text-gray-500">رقم المريض: #123456</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center text-gray-700">
                                <Mail className="h-5 w-5 mr-2" />
                                {patient.email}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Phone className="h-5 w-5 mr-2" />
                                {patient.phone}
                            </div>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="h-5 w-5 mr-2" />
                                {patient.address}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">المعلومات الطبية</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">فصيلة الدم</span>
                                <span className="font-semibold">{patient.bloodType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">العمر</span>
                                <span className="font-semibold">{patient.age} سنة</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">الوزن</span>
                                <span className="font-semibold">{patient.weight}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">الطول</span>
                                <span className="font-semibold">{patient.height}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {previewImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">تغيير الصورة الشخصية</h3>
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="h-32 w-32 rounded-full mx-auto mb-4"
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    إلغاء
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={handleSaveImage}
                                >
                                    حفظ التغييرات
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
