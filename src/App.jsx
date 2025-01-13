import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import UserContextProvider from './user/context/UserContextProvider';
import ClinicContextProvider from './user/context/ClinicContext';
import DoctorContextProvider from './user/context/DoctorContext';

function App() {
  return (
    <UserContextProvider>
      <DoctorContextProvider> 
      <ClinicContextProvider> 
      <RouterProvider router={router} />
      </ClinicContextProvider>
      </DoctorContextProvider>
    </UserContextProvider>
  );
}

export default App;
