'use client';
import { USER_POST } from '@/api';
import React, { useRef } from 'react';

import useForm from '@/hooks/useForm';

function RegisterForm() {
  const username = useForm('username', true);
  const email = useForm('email', true);
  const password = useForm('password', true);
  const photo = useForm('photo', true);
  const name = useForm('name', false);

  const photoRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('name', name.value);

    console.log(photoRef.current);

    if (photoRef.current && photoRef.current.files.length > 0) {
      formData.append('photo', photoRef.current.files[0]);
    }

    const { url } = USER_POST();

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      const json = await response.json();
      
      if (response.ok) {
        console.log(json);
      } else {
        console.log(json.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="name"
                value={name.value}
                onChange={name.onChange}
                onBlur={name.onBlur}
            />
            <input 
                type="text"
                placeholder="username"
                value={username.value}
                onChange={username.onChange}
                onBlur={username.onBlur}
            />
            <span>{username.error}</span>
            <input 
                type="email"
                placeholder="email"
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
            />
            <span>{email.error}</span>
            <input 
                type="password"
                placeholder="password"
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
            />
            <span>{password.error}</span>
            <input 
                type="file"
                ref={photoRef}
                placeholder="photo"
                onChange={photo.onChange}
                onBlur={photo.onBlur}
            />
            <span>{photo.error}</span>
            <button>Register</button>
        </form>
    </div>
  )
}

export default RegisterForm