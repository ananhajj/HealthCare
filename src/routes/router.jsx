import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../user/Home";
import { AboutUs } from "../user/page/AboutUs";
import Clinics from "../user/page/Clinics";
import Login from "../user/components/auth/login";
import RegisterForm from "../user/components/auth/Register/Register";
import PageNotFound from "../PageNotFound";
import Doctor from "../user/page/Doctor";
import DoctorPage from "../user/components/Doctors/DoctorPage";
import BookingPage from "../user/page/BookingPage";
import CitySelection from "../user/components/CitySelection";
import ClinicList from "../user/components/Clinics/ClinicList";

const router = createBrowserRouter([
    {
        path:'/',
        element:<UserLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/about',
                element:<AboutUs/>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <RegisterForm />
            },
            {
                path: '/clinics',
                element: <Clinics/>
            },
            {
                path:'/all-cities',
                element: <CitySelection/>
            },
            {
                path: '/cities/:cityKey/clinics',
                element: <ClinicList />
            },
            {
                path: '/clinic/booking/:clinicId',
                element: <BookingPage />
            },
            {
                path: '/doctor',
                element: <Doctor />
            },
            {
                path:'/doctor/:doctorId',
                element:< DoctorPage />
            },
            {
                path: '*',
                element: <PageNotFound />, // عرض صفحة 404
            },
        ]
    }
])
export default router
{/*
                      <button
                                    className="mt-4 text-blue-600 hover:underline"
                                    onClick={toggleDoctorDetails}
                                >
                                    عرض تفاصيل الطبيب
                                </button>
                         
                        {showDoctorDetails && (
                            <DoctorDetails doctor={doctor} open={showDoctorDetails} onClose={toggleDoctorDetails} />
                        )}
                            */}