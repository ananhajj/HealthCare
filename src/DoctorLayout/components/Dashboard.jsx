import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const visitData = [
  { name: 'يناير', visits: 400 },
  { name: 'فبراير', visits: 300 },
  { name: 'مارس', visits: 600 },
  { name: 'أبريل', visits: 800 },
  { name: 'مايو', visits: 500 },
  { name: 'يونيو', visits: 700 },
];

const diagnosisData = [
  { name: 'ضغط الدم', value: 30 },
  { name: 'السكري', value: 25 },
  { name: 'الربو', value: 20 },
  { name: 'القلب', value: 15 },
  { name: 'أخرى', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  return (
<div className="space-y-6 bg-gray-50 dark:bg-gray-900">
  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">المرضى اليوم</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">24</h3>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12.5% من الأمس</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
          <Users className="text-indigo-600 dark:text-indigo-400" size={24} />
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">المواعيد القادمة</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">8</h3>
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">3 حالات طارئة</p>
        </div>
        <div className="w-12 h-12 bg-green-50 dark:bg-green-900 rounded-lg flex items-center justify-center">
          <Calendar className="text-green-600 dark:text-green-400" size={24} />
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">وقت الانتظار</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">15 دقيقة</h3>
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">+5 دقائق عن المتوسط</p>
        </div>
        <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
          <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
        </div>
      </div>
    </div>
  </div>

  {/* Charts */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">عدد الزيارات الشهرية</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="visits" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">التشخيصات الشائعة</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={diagnosisData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {diagnosisData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</div>


  );
}