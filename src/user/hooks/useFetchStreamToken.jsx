import axios from "axios";
import { useEffect, useState } from "react"

const useFetchStreamToken=(doctorId)=>{
    const [streamToken,setStreamToken]=useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiUrl = "https://d7ef-212-14-228-238.ngrok-free.app";
    useEffect(()=>{

        const fetchStreamToken=async()=>{
            setLoading(true);
            try{
            const response=await axios.get(`${apiUrl}/api/chat/token/${doctorId}`,{
            headers: {
    "ngrok-skip-browser-warning": "s",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    "Content-Type": "application/json",
  },
            })
            console.log("response",response);
         setStreamToken(response.data.token);
        
        }catch(err){
           console.error("Error fetching patient data:", err);
                setError(err);
        }finally {
                setLoading(false);
            }
        };
        fetchStreamToken();
    },[doctorId]);
return { streamToken, loading, error };

}
export default useFetchStreamToken;
