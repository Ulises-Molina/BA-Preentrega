import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import React from "react";

function ProtectedRoute({ children }) {
    const [, , ,user ] = useAuthContext();

    if(!user){
        return <Navigate to="/login" />;
    }else{
        return children 
    }

    }

export default ProtectedRoute