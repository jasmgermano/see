"use client";
import { USER_POST } from "@/api";
import React, { useRef } from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import Input from "@/components/Input";

import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import ImageGrid from "./ImageGrid";

function RegisterForm() {
  const username = useForm("username", true);
  const email = useForm("email", true);
  const password = useForm("password", true);
  const profilePicture = useForm("profilePicture", true);
  const name = useForm("name", false);

  const profilePictureRef = useRef(null);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    formData.append("name", name.value);

    console.log(profilePictureRef.current);

    if (profilePictureRef.current && profilePictureRef.current.files.length > 0) {
      formData.append("profilePicture", profilePictureRef.current.files[0]);
    }

    const { url } = USER_POST();

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        console.log(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleShowProfileprofilePicture() {
    if (profilePictureRef.current && profilePictureRef.current.files.length > 0) {
      const profilePicture = profilePictureRef.current.files[0];
    
      const reader = new FileReader();
  
      reader.onload = (event) => {
        document.querySelector(".pfp").src = event.target.result;
      };
  
      reader.readAsDataURL(profilePicture); 
    }
  }

  const images = [
    { link: "https://i.pinimg.com/736x/2b/d4/5a/2bd45a5bd587832d6041b35c11a7e6bf.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/1f/68/bb/1f68bb63e03f8630f1370c1d6000e915.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/49/fb/20/49fb2014328bd4e5e62a4d9e28f4b497.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/e1/f4/a4/e1f4a4860b238f1a542f959d79f95629.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/b2/f4/d8/b2f4d86c9d0a78f155a21bcd5136d102.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/66/f5/4b/66f54bb6a9e9329924884cd43a9a1a45.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/f7/57/80/f757809487dc91351a45f349d7d58d17.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/b8/21/7f/b8217f0217bb495ceb19ffefcaa9fe46.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/cd/47/85/cd47851f66486d8795121cea579827fa.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/28/d6/6c/28d66c197f3c94ab6039828e25797863.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/6d/8d/3b/6d8d3b4ef8115014669420c89304d64b.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/f3/e7/8a/f3e78ada00d7ff674f13d07d85270a36.jpg", middle: false },
  ]
  
  return (
    <div className="registration-page">
      <ImageGrid images={images} />
      <div className="registration-side">
        <div className="registration-header">
          <Image src={Logo} alt="Logo" height={30} />
          <div>
            <h1>⋆౨ৎ crie sua conta!</h1>
            <p>
              &gt; assim você pode postar suas melhores fotos e interagir com
              outros usuários!
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-registration">
          <div className="profile-container">
            <div className="circle">
              <img
                className="pfp"
                src="https://secure.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=96&d=mm&r=g"
                alt="Imagem do usuário"
              />
            </div>
            <label className="upload-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6c6c6c"
                  d="M12 17.5q1.875 0 3.188-1.312T16.5 13t-1.312-3.187T12 8.5T8.813 9.813T7.5 13t1.313 3.188T12 17.5m0-2q-1.05 0-1.775-.725T9.5 13t.725-1.775T12 10.5t1.775.725T14.5 13t-.725 1.775T12 15.5M4 21q-.825 0-1.412-.587T2 19V7q0-.825.588-1.412T4 5h3.15L8.4 3.65q.275-.3.663-.475T9.875 3h4.25q.425 0 .813.175t.662.475L16.85 5H20q.825 0 1.413.588T22 7v12q0 .825-.587 1.413T20 21z"
                />
              </svg>
              <Input
                type="file"
                label="Foto de perfil"
                placeholder="foto de perfil"
                {...profilePicture}
                ref={profilePictureRef}
                onChange={(e) => { handleShowProfileprofilePicture(e); profilePicture.onChange(e); }}
              />
            </label>
          </div>

          <Input type="text" label="Nome" placeholder="nome" {...name} />
          <Input
            type="text"
            label="Usuário"
            placeholder="usuário"
            {...username}
          />
          <Input type="email" label="Email" placeholder="email" {...email} />
          <Input
            type="password"
            label="Senha"
            placeholder="senha"
            {...password}
          />
          <button type="submit" className="btn btn-registration">
            cadastrar
          </button>
        </form>
        <span className="create-account">
          já tem uma conta? faça <a href="/login">login</a>
        </span>
      </div>
    </div>
  );
}

export default RegisterForm;
