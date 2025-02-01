"use client";
import useForm from "@/hooks/useForm";
import React, { use, useContext } from "react";
import { TOKEN_POST, USER_GET } from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";

const LoginForm = () => {
  const username = useForm('username', false);
  const password = useForm('password', false);
  const { login, userSet } = useContext(AuthContext);
  const router = useRouter();

  React.useEffect(() => {
    // verficar se o usuário já está logado
    const token = window.localStorage.getItem("token");

    if (token) {
      getUser(token);
    }

  }, []);

  async function getUser($token) {
    const { url, options } = USER_GET($token);

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        userSet(json.username, json.email, json.name, json.photo);
        router.push("/teste");
      } else {
        console.error("Error:", json.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { url, options } = TOKEN_POST({
      username: username.value,
      password: password.value,
    });

    
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      
      getUser(json.token);

      if (response.ok) {
        login(json.user_nicename, json.token);
        router.push("/teste");
      } else {
        console.log("Erro:", json.message);
        alert(json.message);
      }
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="gallery">
        <img src="https://i.pinimg.com/736x/ec/d7/0b/ecd70b176f9214a420bb91493e800244.jpg" alt="Imagem 1" />
        <img src="https://i.pinimg.com/736x/6f/cd/54/6fcd5423c7f8a2076d8de63da21a2f2c.jpg" alt="Imagem 2" className="middle" />
        <img src="https://i.pinimg.com/736x/70/77/4a/70774a2b08b7d4bb6e4e3c6ff82ad59b.jpg" alt="Imagem 3" />
        <img src="https://i.pinimg.com/736x/c2/a3/84/c2a384d10fdb1036e16c50144f90eafb.jpg" alt="Imagem 4" />
        <img src="https://i.pinimg.com/736x/33/4a/66/334a66478068201a28e96c4a31ce52e9.jpg" alt="Imagem 5" className="middle" />
        <img src="https://i.pinimg.com/736x/d4/93/f2/d493f2018e4cc688ba23e6784572db9b.jpg" alt="Imagem 6" />
        <img src="https://i.pinimg.com/736x/04/84/bc/0484bc5cb901b82370590c035dac442b.jpg" alt="Imagem 7" />
        <img src="https://i.pinimg.com/736x/8f/64/7c/8f647cf438d460eee656642dca3f6b27.jpg" alt="Imagem 8" className="middle" />
        <img src="https://i.pinimg.com/736x/13/d9/28/13d9283b092dc16f8de3917d030d8799.jpg" alt="Imagem 9" />
        <img src="https://i.pinimg.com/736x/0f/5c/0a/0f5c0aa9f9629d54089066de352ce272.jpg" alt="Imagem 10" />
        <img src="https://i.pinimg.com/736x/a2/4f/3a/a24f3a9713aafa683d3ff05395d27baa.jpg" alt="Imagem 11" className="middle" />
        <img src="https://i.pinimg.com/736x/a6/6d/10/a66d10203d5bbf01c512c979b9af4b28.jpg" alt="Imagem 12" />
      </div>
      <div className="login-side">
        <div className="login-header">
          <Image src={Logo} alt="Logo" height={30} />
          <div>
            <h1>⋆౨ৎ bem-vinda (o) de volta!</h1>
            <p>&gt; faça login e continue sua jornada</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-login">
          <Input 
            type="text"
            label="Usuário"
            placeholder="preencha seu usuário ou email"
            {...username}
          />
          <Input
            type="password"
            label="Senha"
            placeholder="preencha sua senha"
            {...password}
          />
          <a href="#" className="forgot-password">esqueceu sua senha?</a>
          <button type="submit" className="btn btn-login">entrar</button>
        </form>
        <span className="create-account">): ainda não tem uma conta? <a href="#">cadastre-se</a></span>
      </div>
    </div>
  );
};

export default LoginForm;
