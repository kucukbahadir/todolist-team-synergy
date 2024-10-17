import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("nameUser");

    if (!token) {
        // If no token, redirect to login
        alert("Invalid token")
        return <Navigate to="/login" />;
    }

    // If token exists, render the protected content
    return children;
}

export default ProtectedRoute;