import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("jsonwebtoken");
    console.log(token);
    if(!token){
        return <Navigate to = "/login" />
    }
    return children;
}

export default ProtectedRoute;