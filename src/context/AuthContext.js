'use client';
import { useRouter } from 'next/router';
import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [photo, setPhoto] = useState(null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        window.localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem("token");
    };

    const userSet = (username, email, name, photo) => {
        setUser(username);
        setEmail(email);
        setName(name);
        setPhoto(photo);
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, userSet, email, name, photo }}>
            {children}
        </AuthContext.Provider>
    );
};