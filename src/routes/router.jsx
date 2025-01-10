import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../user/Home";
import { AboutUs } from "../user/page/AboutUs";
import Clinics from "../user/page/Clinics";
import Login from "../user/components/auth/login";
import RegisterForm from "../user/components/auth/Register/Register";
import PageNotFound from "../PageNotFound";

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
                path: '*',
                element: <PageNotFound />, // عرض صفحة 404
            },
        ]
    }
])
export default router