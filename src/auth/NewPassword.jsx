import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

function NewPassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

    
        if (currentPassword !== 'password123') {
            setError('كلمة المرور الحالية غير صحيحة');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('كلمة المرور الجديدة غير متطابقة');
            return;
        }

        if (newPassword.length < 8) {
            setError('كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل');
            return;
        }

        // Here you would typically update the password in your backend
        alert('تم تغيير كلمة المرور بنجاح');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    تغيير كلمة المرور
                </h1>
                <p className="text-gray-600">
                    قم بإدخال كلمة المرور الحالية وكلمة المرور الجديدة
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="كلمة المرور الحالية"
                        required
                        dir="rtl"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="كلمة المرور الجديدة"
                        required
                        dir="rtl"
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="تأكيد كلمة المرور الجديدة"
                        required
                        dir="rtl"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    تغيير كلمة المرور
                    <ArrowRight size={20} />
                </button>
            </form>

            <div className="mt-4 text-sm text-gray-500 text-center">
                <p>كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل</p>
            </div>
        </div>
    );
}

export default NewPassword;