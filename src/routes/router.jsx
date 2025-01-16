import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../user/Home";
import { AboutUs } from "../user/page/AboutUs";
import Clinics from "../user/page/Clinics";
import Login from "../user/components/auth/login";
import PageNotFound from "../PageNotFound";
import Doctor from "../user/page/Doctor";
import DoctorPage from "../user/components/Doctors/DoctorPage";
import BookingPage from "../user/page/BookingPage";
import CitySelection from "../user/components/CitySelection";
import ClinicList from "../user/components/Clinics/ClinicList";
import RegisterLayout from "../layouts/RegisterLayout";
import PatientProfile from "../user/page/PatientProfile";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Page from "../user/page/PageChat/PageChat";
import OnlineBookingHistory from "../user/page/OnlineBookingHistory";
import SuccessPage from "../user/components/Doctors/Payments/SuccessPage";
import CancelPage from "../user/components/Doctors/Payments/CancelPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute requiredRole={2}>
            <PatientProfile />
          </ProtectedRoute>
        ),
        
      },
           {
        path: "/booking-history-online",
        element: (
          <ProtectedRoute requiredRole={2}>
            <OnlineBookingHistory />
          </ProtectedRoute>
        ),
        
      },
      {
      path:"/chat",
      element:<Page/>
      },
      {
        path: "/clinics",
        element: <Clinics />,
      },
      {
        path: "/all-cities",
        element: <CitySelection />,
      },
      {
        path: "/cities/:cityKey/clinics",
        element: <ClinicList />,
      },
      {
        path: "/clinic/booking/:clinicId",
        element: (
          <ProtectedRoute requiredRole={2}>
            <BookingPage />
          </ProtectedRoute>
        ),
        

      },
  
      {
        path: "/success",
        element: (
          <ProtectedRoute requiredRole={2}>
            <SuccessPage />
          </ProtectedRoute>
        ),

      },
           {
        path: "/cancel",
        element: (
          <ProtectedRoute requiredRole={2}>
            <CancelPage />
          </ProtectedRoute>
        ),

      },
      {
        path: "/doctor",
        element: <Doctor />,
      },
      {
        path: "/doctor/:doctorId",
        element: <DoctorPage />,
      },
      {
        path: "*",
        element: <PageNotFound />, // عرض صفحة 404
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterLayout />,
  },
 
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole={1}>
        <AdminLayout />
      </ProtectedRoute>
    ),
  },
]);
export default router
 