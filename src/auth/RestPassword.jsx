import React, { useState } from 'react';
import { Mail, Lock, KeyRound, ArrowRight } from 'lucide-react';

function RestPassword() {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log("email",email);
        setStep('verify');
    };

    const handleVerifySubmit = (e) => {
        e.preventDefault();
        setStep('reset');
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        alert('تم تغيير كلمة المرور بنجاح');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {step === 'email' && 'إعادة تعيين كلمة المرور'}
                        {step === 'verify' && 'التحقق من الرمز'}
                        {step === 'reset' && 'تعيين كلمة المرور الجديدة'}
                    </h1>
                    <p className="text-gray-600">
                        {step === 'email' && 'أدخل بريدك الإلكتروني لتلقي رمز التحقق'}
                        {step === 'verify' && 'أدخل الرمز المرسل إلى بريدك الإلكتروني'}
                        {step === 'reset' && 'أدخل كلمة المرور الجديدة'}
                    </p>
                </div>

                {step === 'email' && (
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <div className="relative">
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="البريد الإلكتروني"
                                required
                                dir="rtl"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            إرسال رمز التحقق
                            <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                {step === 'verify' && (
                    <form onSubmit={handleVerifySubmit} className="space-y-6">
                        <div className="relative">
                            <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="رمز التحقق"
                                required
                                dir="rtl"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                            تحقق من الرمز
                            <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                {step === 'reset' && (
                    <form onSubmit={handleResetSubmit} className="space-y-6">
                        <div className="relative">
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                placeholder="تأكيد كلمة المرور"
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
                )}
            </div>
        </div>
    );
}

export default RestPassword;
