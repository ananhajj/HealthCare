import { Outlet } from "react-router-dom"
import Navbar from "../user/components/Home/Navbar"
import Footer from "../user/components/Home/Footer"
 import { Chat } from "stream-chat-react";
import { StreamChat } from "stream-chat";
const apiKey = "8ghmxrx2v98h";
const client = StreamChat.getInstance(apiKey);
const UserLayout=()=>{
return(
    <>
     <Chat client={client}>
         <Navbar/>
     </Chat>
    
    <Outlet/>
    <Footer/>
    </>
)
}
export default UserLayout 