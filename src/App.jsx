import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import UserContextProvider from "./user/context/UserContextProvider";
import ClinicContextProvider from "./user/context/ClinicContext";
import DoctorContextProvider from "./user/context/DoctorContext";
import BookingContextProvider from "./user/context/BookingContext";


function App() {
  return (
    <UserContextProvider>
      <DoctorContextProvider>
        <ClinicContextProvider>
          <BookingContextProvider> 
          <RouterProvider router={router}>
          </RouterProvider>
          </BookingContextProvider>
        </ClinicContextProvider>
      </DoctorContextProvider>
    </UserContextProvider>
  );
}

export default App;
