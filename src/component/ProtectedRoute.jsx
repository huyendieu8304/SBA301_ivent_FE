import React, { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router";
import LoadingComponent from "./LoadingComponent.jsx";

const ProtectedRoute = ({ allowedRole }) => {
    const { isAuthenticated, authorities, logout } = useAuth();
    const [authFailed, setAuthFailed] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            //check if the authorities of user has role in allowedRole or not
            let haveRole = allowedRole.includes(authorities);
            if (haveRole) {
                setAuthFailed(false);
            } else {
                setAuthFailed(true);
                localStorage.clear();
                logout();
            }
        } else {
            setAuthFailed(true);
        }
    }, [isAuthenticated, authorities, allowedRole, logout]);

    if (authFailed) {
        return <Navigate to="/login" replace />;
    } else if (authFailed === false) {
        return <Outlet/>;
    } else {
        return <LoadingComponent />;
    }
};

export default ProtectedRoute;

