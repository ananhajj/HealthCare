import { Outlet } from "react-router-dom"
import Navbar from "../user/components/Home/Navbar"
import Footer from "../user/components/Home/Footer"
 

const UserLayout=()=>{
return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
)
}
export default UserLayout 