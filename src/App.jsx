import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import UserContextProvider from './user/context/UserContextProvider';
import ClinicContextProvider from './user/context/ClinicContext';

function App() {
  return (
    <UserContextProvider>
      <ClinicContextProvider> 
      <RouterProvider router={router} />
      </ClinicContextProvider>
    </UserContextProvider>
  );
}

export default App;
