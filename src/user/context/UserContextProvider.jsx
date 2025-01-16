import React, { createContext, useState, useMemo, useEffect } from "react";
import { decryptData } from "../../routes/encryption";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [streamToken, setStreamToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // تسجيل الخروج وتنظيف البيانات
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
    setToken(null);
    setStreamToken(null);
    setUserId(null);
  };

  // جلب بيانات المستخدم عبر ID
const getUser1 = async (id) => {
  if (!id) {
    console.error("ID is missing. Cannot fetch user data.");
    throw new Error("Missing ID");
  }

  try {
    console.log(`Fetching user data for ID: ${id}`);
    const response = await axios.get(
      `https://d7ef-212-14-228-238.ngrok-free.app/api/get-user/${id}`,
      {
        headers: {
             "ngrok-skip-browser-warning": "s",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // إذا كانت المشكلة في الاستجابة (4xx أو 5xx)
      console.error(
        "Failed to fetch user data:",
        error.response.data || error.response.statusText
      );
      throw new Error(
        error.response.data?.error || "Failed to fetch user data"
      );
    } else if (error.request) {
      // إذا لم يكن هناك استجابة من الخادم
      console.error("No response from server:", error.request);
      throw new Error("No response from server");
    } else {
      // إذا كانت المشكلة أثناء إعداد الطلب
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the request");
    }
  }
};



  // جلب Stream token للمستخدم
const getStreamToken = async (userId) => {
  if (!userId) {
    console.error("userId is missing. Cannot fetch stream token.");
    throw new Error("Missing userId");
  }

  try {
    console.log(`Requesting stream token for userId: ${userId}`);
    const response = await fetch(
      `https://d7ef-212-14-228-238.ngrok-free.app/api/generate-token`,
      {
        method: "POST",
        headers: {
                "ngrok-skip-browser-warning": "s",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({ doctor_id: userId }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch stream token:", errorText);
      throw new Error("Failed to fetch stream token");
    }

    const data = await response.json();
    console.log("Stream token fetched successfully:", data.token);
    return data.token;
  } catch (error) {
    console.error("Error fetching stream token:", error.message || error);
    throw error;
  }
};





useEffect(() => {
  const storedToken = localStorage.getItem("userToken");
  const encryptedUserData = localStorage.getItem("userData");

  if (storedToken && encryptedUserData) {
    try {
      const decryptedUserData = decryptData(encryptedUserData);
      setToken(storedToken);
      setUserData(decryptedUserData);

      if (decryptedUserData?.id) {
        setUserId(decryptedUserData.id);
        console.log("User ID set from localStorage:", decryptedUserData.id);
      } else {
        console.error("User ID is missing in decrypted data.");
        toast.error("User data is incomplete. Please log in again.");
        logout();
      }

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error decrypting user data:", error);
      logout(); // تنظيف البيانات في حالة حدوث خطأ
    }
  } else {
    console.warn("No userToken or userData found in localStorage.");
    toas.error("Please log in to continue.");
    logout();
  }
}, []);


  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      loading,
      setLoading,
      userData,
      token,
      setUserData,
      setIsLoggedIn,
      logout,
      getUser1,
      getStreamToken,
      streamToken,
      userId,
      setUserId,
    }),
    [isLoggedIn, userData, loading, token, streamToken, userId]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
