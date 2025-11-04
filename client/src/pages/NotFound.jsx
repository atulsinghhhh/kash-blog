import React from "react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f10] text-gray-200 px-4">
            <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
            <p className="text-lg text-gray-400 text-center max-w-md">
                Oops... the page you’re looking for doesn’t exist or has been moved.
            </p>
        </div>
    );
};

export default NotFound;
