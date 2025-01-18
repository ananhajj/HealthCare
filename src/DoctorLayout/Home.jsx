import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  Clock, 
  User, 
  Bell,
  FileText,
  Heart,
  Pill,
  ChevronLeft,
  ChevronRight,
  Building2,
  Video,
  CalendarClock,
  UserCircle,
  Menu,
  X,
  Moon,
  Sun
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import OnlineAppointments from './components/OnlineAppointments';
import ClinicManagement from './components/ClinicManagement';
import Profile from './components/Profile';
import logo from '../assets/logo.svg'
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'online-appointments':
        return <OnlineAppointments />;
      case 'clinic-management':
        return <ClinicManagement />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div dir="rtl" className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between lg:justify-center space-x-2 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
             <img
                                        src={logo}
                                        alt="this is logo"
                                        className="w-44 cursor-pointer "
                                    />
            </div>
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={toggleSidebar}
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 space-x-reverse w-full px-4 py-3 rounded-lg ${
                activeTab === 'dashboard' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Activity size={20} />
              <span>لوحة التحكم</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('appointments');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 space-x-reverse w-full px-4 py-3 rounded-lg ${
                activeTab === 'appointments' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Calendar size={20} />
              <span>المواعيد</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('online-appointments');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 space-x-reverse w-full px-4 py-3 rounded-lg ${
                activeTab === 'online-appointments' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Video size={20} />
              <span>المواعيد الإلكترونية</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('clinic-management');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 space-x-reverse w-full px-4 py-3 rounded-lg ${
                activeTab === 'clinic-management' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Building2 size={20} />
              <span>إدارة العيادات</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('profile');
                setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 space-x-reverse w-full px-4 py-3 rounded-lg ${
                activeTab === 'profile' 
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <UserCircle size={20} />
              <span>الملف الشخصي</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white">مرحباً، د. أحمد</h2>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                <User size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;