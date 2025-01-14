import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stethoscope, Menu, X, User, LogIn, ChevronDown } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { UserContext } from '../../context/UserContextProvider';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // حالة القائمة المنسدلة
    const dropdownRef = useRef(null);
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // حالة القائمة المنسدلة للموبايل
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn,logout } = useContext(UserContext);

    const handleLoginClick = () => {
        navigate('/login'); // يقوم بالتنقل إلى صفحة /login عند الضغط
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    const handleLogout = () => {
        logout(); // استدعاء وظيفة تسجيل الخروج
        navigate("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول
    };
    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);
    return (
        <header className="text-sm py-4 mb-5 border-b border-b-[#ADADAD]" dir="rtl">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* الشعار والعلامة التجارية */}
                    <div className="flex items-center space-x-4">
                        <Link to={"/"}> 
                        <img
                            src={logo}
                            alt="this is logo"
                            className="w-44 cursor-pointer "
                        />
                        </Link>
                    </div>

                    {/* التنقل لسطح المكتب */}
                    <nav className="hidden md:flex items-center space-x-12" dir="rtl">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-darkText transition-all duration-200 font-medium font-arabic text-xl custom-margin'
                                    : 'text-darkText hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium font-arabic text-xl custom-margin'
                            }
                        >
                            الرئيسية
                        </NavLink>
                        <NavLink
                            to="/clinics"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-darkText transition-all duration-200 font-medium font-arabic text-xl'
                                    : 'text-darkText hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium font-arabic text-xl'
                            }
                        >
                            العيادات
                        </NavLink>
                        <NavLink
                            to="/doctor"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-darkText transition-all duration-200 font-medium font-arabic text-xl'
                                    : 'text-darkText hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium font-arabic text-xl'
                            }
                        >
                            الدكاترة
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-darkText transition-all duration-200 font-medium font-arabic text-xl'
                                    : 'text-darkText hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium font-arabic text-xl'
                            }
                        >
                            عنّا
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? 'bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-darkText transition-all duration-200 font-medium font-arabic text-xl'
                                    : 'text-darkText hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 font-medium font-arabic text-xl'
                            }
                        >
                            اتصل بنا
                        </NavLink>
                    </nav>

                    {/* زر الدخول أو القائمة المنسدلة حسب حالة المستخدم */}
                    <div className="hidden md:flex items-center" ref={dropdownRef}>
                        {isLoggedIn ? (
                            <div className="relative z-10">
                                <button
                                    className="flex items-center space-x-3 px-6 py-3 rounded-full bg-transparent text-[rgb(95,111,255)] border-2 border-[rgb(95,111,255)] hover:bg-[rgb(95,111,255)] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(95,111,255)]"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <User size={20} className="transition-transform duration-300 transform hover:rotate-180" />
                                    <span className="font-medium">مرحبًا بك</span>
                                    <ChevronDown className="ml-2" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-lg border border-gray-200">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            الملف الشخصي
                                        </Link>
                                        <Link to="/medical-record" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            السجل الطبي
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center space-x-3 px-6 py-3 rounded-full bg-transparent text-[rgb(95,111,255)] border-2 border-[rgb(95,111,255)] hover:bg-[rgb(95,111,255)] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(95,111,255)]"
                            >
                                <LogIn size={20} className="transition-transform duration-300 transform hover:rotate-180" />
                                <span className="font-medium">تسجيل الدخول</span>
                            </button>
                        )}
                    </div>

                    {/* زر القائمة للموبايل */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[rgb(95,111,255)]/80 transition-colors duration-200"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* التنقل للموبايل */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} py-4`}>
                    <nav className="flex flex-col space-y-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            الرئيسية
                        </NavLink>
                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            الأطباء
                        </NavLink>
                        <NavLink
                            to="/clinics"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            العيادات
                        </NavLink>
                        <NavLink
                            to="/doctor"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            الدكاترة
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            عنّا
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-black font-bold text-[rgb(95,111,255)]'
                                    : 'text-[rgb(95,111,255)] hover:text-black transition-colors duration-200 font-medium text-2xl'
                            }
                        >
                            اتصل بنا
                        </NavLink>
                    </nav>

                    {/* زر التسجيل أو الدخول - للموبايل */}
                    <div className="flex flex-col md:flex items-center space-y-2 mt-4 pb-2">
                        {isLoggedIn ? (
                            <div className="relative z-10">
                                <button
                                    className="flex items-center space-x-3 px-6 py-3 rounded-full bg-transparent text-[rgb(95,111,255)] border-2 border-[rgb(95,111,255)] hover:bg-[rgb(95,111,255)] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(95,111,255)]"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <User size={20} className="transition-transform duration-300 transform hover:rotate-180" />
                                    <span className="font-medium">مرحبًا بك</span>
                                    <ChevronDown className="ml-2" />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute flex flex-col w-48 mt-2 bg-white shadow-lg rounded-lg border border-gray-200">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">الملف الشخصي</Link>
                                        <Link to="/medical-record" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">السجل الطبي</Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            تسجيل الخروج
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="flex items-center space-x-3 px-6 py-3 rounded-full bg-transparent text-[rgb(95,111,255)] border-2 border-[rgb(95,111,255)] hover:bg-[rgb(95,111,255)] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[rgb(95,111,255)]"
                            >
                                <LogIn size={20} className="transition-transform duration-300 transform hover:rotate-180" />
                                <span className="font-medium">تسجيل الدخول</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}