import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from  "../user/page/Home"
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
import DoctorLayout from "../layouts/DoctorLayout";
import Guide from "../user/page/Guide";

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
        path: "/guide",
        element: <Guide />,
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
    path: "/dashboard-doctor",
    element: (
      <ProtectedRoute requiredRole={3}>
        <DoctorLayout />
      </ProtectedRoute>
    ),
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
 
/*

import React, { useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import ChatViewSelector from "./ChatViewSelector";

const apiKey = "8ghmxrx2v98h";

const Page = () => {
  const navigate = useNavigate();
  const { userId, streamToken, getStreamToken } = useContext(UserContext);
  const [isClientReady, setIsClientReady] = useState(false);
  const client = StreamChat.getInstance(apiKey);
const userIdS=JSON.stringify(userId);
  const filters = { type: "messaging", members: { $in: [userIdS] } };

 useEffect(() => {
  async function setupClient() {
  

    try {
      const token = streamToken || (await getStreamToken(userIdS));
      await client.connectUser(
        {
          id: userIdS,
          name: `User_${userIdS}`,
        },
        token
      );
      setIsClientReady(true);
    } catch (error) {
      console.error("Error setting up chat client:", error.message || error);
     // navigate("/login");
    }
  }

  setupClient();

  return () => {
    client.disconnect();
  };
}, [userId, streamToken, getStreamToken, client, navigate]);

  if (!isClientReady) return <div>Setting up client & connection...</div>;

  return (
    <div>
      <h1>Chat Application</h1>
      <ChatViewSelector
        client={client}
        filters={filters}
        onChannelSelect={(channel) => console.log("Selected channel in parent:", channel.id)}
      />
    </div>
  );
};

export default Page;


*/