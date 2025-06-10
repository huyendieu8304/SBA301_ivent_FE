import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {CONSTANTS} from "../common/Constant.jsx";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(() => {
        try {
            const token = localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
            let authorities = null;
            if (token) {
                const decodedToken = jwtDecode(token);
                authorities = decodedToken.authorities;
            }
            return {
                isAuthenticated: !!token,
                authorities: authorities,
            };
        } catch (e) {
            localStorage.clear();
        }
    });

    const login = (token) => {
        localStorage.setItem(CONSTANTS.ACCESS_TOKEN, token);
        const decodedToken = jwtDecode(token);
        const authorities = decodedToken?.authorities;
        setAuthState({
            isAuthenticated: true,
            authorities: authorities,
        });
    };

    const logout = () => {
        localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
        setAuthState((prevState) => {
            return Object.keys(prevState).reduce((acc, key) => {
                acc[key] = key === "isAuthenticated" ? false : null;
                return acc;
            }, {});
        });
        setAuthState({
            isAuthenticated: false,
            authorities: null,
        });
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
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