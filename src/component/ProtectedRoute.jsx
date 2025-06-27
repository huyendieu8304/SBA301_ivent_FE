import React, { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router";
import LoadingComponent from "./LoadingComponent.jsx";
import Messages from "../common/Message.jsx";

const ProtectedRoute = ({ allowedRole }) => {
    const { isAuthenticated, authorities, logout, isTokenExpired } = useAuth();
    const [authFailed, setAuthFailed] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        let checkTokenExpired;
        if (token) {
            checkTokenExpired = isTokenExpired(token);
        } else {
            checkTokenExpired = true;
        }
        if (checkTokenExpired) {
            setAuthFailed(true);
            localStorage.clear();
            logout();
            return;
        }
        if (isAuthenticated) {
            //check if the authorities of user has role in allowedRole or not
            const hasRole = allowedRole.includes(authorities);
            if (hasRole) {
                setAuthFailed(false);
            } else {
                setAuthFailed(true);
                // localStorage.clear();
                // logout();
            }
        } else {
            setAuthFailed(true);
        }
    }, [isAuthenticated, authorities, allowedRole, logout]);

    if (authFailed) {
        // return <Navigate to="/error" replace />;
        return <Navigate
            to="/error"
            replace
            state={{
                message: Messages.MSG_E_00008,
                code: 403,
            }}
        />
    } else if (authFailed === false) {
        return <Outlet/>;
    } else {
        return <LoadingComponent />;
    }
};

export default ProtectedRoute;

