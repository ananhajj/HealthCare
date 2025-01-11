import React, { createContext, useState, useMemo } from 'react';

export const UserContext = createContext(); // تم تصدير UserContext

const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken") ? true : false);
    const [loading, setLoading] = useState(false);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        loading,
        setLoading,
        setIsLoggedIn, // السماح بتحديث الحالة من أي مكون يستخدم السياق
    }), [isLoggedIn, loading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
