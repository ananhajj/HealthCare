import React, { createContext, useState, useMemo } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken") ? true : false);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        setIsLoggedIn, // أضفنا هذه لتسمح بتحديث الحالة من أي مكون يستخدم السياق
    }), [isLoggedIn]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
