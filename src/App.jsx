import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import UserContextProvider from "./user/context/UserContextProvider";
 
function App() {
  return (
    <UserContextProvider>
       
          <RouterProvider router={router}>
          </RouterProvider>
           
    </UserContextProvider>
  );
}

export default App;
