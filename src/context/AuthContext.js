'use client';
import { useRouter } from 'next/router';
import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            const userData = JSON.parse(savedUser);
            setToken(savedToken);
            setUser(userData.username);
            setEmail(userData.email);
            setName(userData.name);
            setProfilePicture(userData.profilePicture);
            setBio(userData.bio);
        }
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
    };

    const userSet = (userData) => {
        if (!userData || typeof userData !== "object") {
            console.error("Erro: userData é inválido!", userData);
            return;
        }
        setUser(userData.username);
        setEmail(userData.email);
        setName(userData.name);
        setProfilePicture(userData.profilePicture);
        setBio(userData.bio);
    
        window.localStorage.setItem("user", JSON.stringify(userData));
    };
    

    return (
        <AuthContext.Provider value={{ user, token, login, logout, userSet, email, name, profilePicture, bio }}>
            {children}
        </AuthContext.Provider>
    );
};