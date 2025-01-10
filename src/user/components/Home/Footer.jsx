import { ChevronRight, Heart, Mail, Phone } from 'lucide-react';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';



function Footer(){
    return (
        <footer className=" text-gray-300 border-b border-b-[#ADADAD]">
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <div className="flex items-center mb-6">
                        <Heart className="w-8 h-8 text-blue-500" />
                        <span className="text-2xl font-bold text-white mr-2">طبيبي</span>
                    </div>
                    <p className="text-gray-400 mb-6">
                        منصتك الطبية الأولى في فلسطين للحجوزات والاستشارات الطبية
                    </p>
                    <div className="flex space-x-4 space-x-reverse">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FaYoutube className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">روابط سريعة</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 ml-1" /> عن طبيبي</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 ml-1" /> كيف يعمل</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 ml-1" /> الأسئلة الشائعة</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center"><ChevronRight className="w-4 h-4 ml-1" /> اتصل بنا</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">التخصصات</h3>
                    <ul className="space-y-3">
                        {/* Populate with specialty items */}
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold text-lg mb-4">تواصل معنا</h3>
                    <div className="space-y-4">
                        <p className="flex items-center text-gray-400">
                            <Mail className="w-5 h-5 ml-2" />
                            info@tabibi.ps
                        </p>
                        <p className="flex items-center text-gray-400">
                            <Phone className="w-5 h-5 ml-2" />
                            +970 59 000 0000
                        </p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
                            احجز موعدك الآن
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>© {new Date().getFullYear()} طبيبي. جميع الحقوق محفوظة</p>
            </div>
        </div>
    </footer>
    );

}
export default Footer;
