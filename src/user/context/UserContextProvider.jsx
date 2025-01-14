import React, { createContext, useState, useMemo, useEffect } from "react";
import { decryptData } from "../../routes/encryption";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);

    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        setUserData(null);
        setToken(null);
    };

    useEffect(() => {
        // استرداد البيانات من localStorage عند التحميل
        const storedToken = localStorage.getItem("userToken");
        const encryptedUserData = localStorage.getItem("userData");

        if (storedToken && encryptedUserData) {
            try {
                const decryptedUserData = decryptData(encryptedUserData);
                setToken(storedToken);
                setUserData(decryptedUserData);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error decrypting user data:", error);
                logout(); // تنظيف البيانات في حالة حدوث خطأ
            }
        }
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        loading,
        setLoading,
        userData,
        token,
        setUserData,
        setIsLoggedIn,
        logout,
    }), [isLoggedIn, userData, loading, token]);

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
