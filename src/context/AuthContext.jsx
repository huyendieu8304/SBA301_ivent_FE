import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {CONSTANTS} from "../common/Constant.jsx";

const defaultAuthState = {
    isAuthenticated: false,
    authorities: null,
    id: "",
    email: "",
    fullName: "",
    avatarUri: "",
}

const decodeToken = (token) => {
    const result = structuredClone(defaultAuthState);
    if (token) {
        try {
            const { id, email, fullName, avatarUri, authorities, exp } = jwtDecode(token);
            const isValid = !exp || exp > Date.now() / 1000; //kiểm tra xem token hết hạn chưa
            if (isValid) {
                //lấy dữ liệu từ token ra
                Object.assign(result, {
                    isAuthenticated: true,
                    id, email, fullName, avatarUri, authorities
                });
            } else {
                localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
            }
        } catch (e) {
            console.error("Invalid token", e);
            localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        }
    }
    return result;
}

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        try {
            const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
            return decodeToken(token);
        } catch (e) {
            console.error("Error initializing auth state:", e);
            localStorage.clear();
            return defaultAuthState;
        }
    });

    const login = (token) => {
        localStorage.setItem(CONSTANTS.ACCESS_TOKEN, token);
        setAuthState(decodeToken(token));
    };

    const logout = () => {
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        setAuthState(defaultAuthState);
        window.location.replace("/login");
    };

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const { exp } = jwtDecode(token);
            return exp < Date.now() / 1000;
        } catch (e) {
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, isTokenExpired }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};