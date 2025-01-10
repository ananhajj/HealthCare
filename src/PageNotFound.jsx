// src/pages/PageNotFound.js
import React from 'react';
import { Frown } from 'lucide-react';  // استيراد أيقونة

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Frown className="mx-auto h-24 w-24 text-blue-600 animate-bounce mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Oops! The page you are looking for does not exist.
                </p>
                <a
                    href="/"
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all duration-300"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
};

export default PageNotFound;
