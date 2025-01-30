"use client";

import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Teste() {
    const { user, email, logout } = useContext(AuthContext);
    const router = useRouter();

    console.log(user);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) return null;

    function handleLogout() {
        logout();
        router.push('/login');
    }


    return (
        <div>
            <h1>Bem-vindo {user}</h1>
            <h2>Email: {email}</h2>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    );
}
