"use client";

import React, { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/images/logo.svg';
import HomeIcon from '@/assets/images/home.svg';
import Image from "next/image";
import LogoutIcon from '@/assets/images/logout.svg';

export default function Home() {
  const { user, email, logout, photo, name } = useContext(AuthContext);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div>
      <div className='menu'>
        <Image src={Logo} alt="Logo" height={25} />
        <div className='account'>
          <div className='circle profile-picture'>
            <img className='pfp' src={photo ? photo : 'https://secure.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=96&d=mm&r=g'} alt='foto de perfil' />
          </div>
          <div>
            <p className='account-name'>{name}</p>
            <p className='account-username'>@{user}</p>
          </div>
        </div>
        <div className='menu-options'>
          <button onClick={() => router.push("/")} className='menu-btn'>
            <div className='menu-icon'>
              <Image src={HomeIcon} alt='home' />
            </div>
            <span>home</span>
          </button>
          <button onClick={() => handleLogout()} className='menu-btn'>
            <div className='menu-icon'>
              <Image src={LogoutIcon} alt='logout' />
            </div>
            <span>sair</span>
          </button>
        </div>
      </div>
    </div>
  );
}
