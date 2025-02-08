'use client';
import { useRouter } from 'next/router';
import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [profilePicture, setprofilePicture] = useState(null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", userData);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    };

    const userSet = (username, email, name, profilePicture) => {
        setUser(username);
        setEmail(email);
        setName(name);
        setprofilePicture(profilePicture);
        window.localStorage.setItem("user", username);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, userSet, email, name, profilePicture }}>
            {children}
        </AuthContext.Provider>
    );
};