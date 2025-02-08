"use client";
import useForm from "@/hooks/useForm";
import React, { use, useContext } from "react";
import { TOKEN_POST, USER_GET } from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Input from "./Input";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import ImageGrid from "./ImageGrid";

const LoginForm = () => {
  const emailOrUsername = useForm('emailOrUsername', false);
  const password = useForm('password', false);
  const { login, userSet } = useContext(AuthContext);
  const router = useRouter();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        userSet(json.username, json.email, json.name, json.profilePicture);
        router.push("/");
      } else {
        console.error("Erro ao buscar usuário:", json.message);
        window.localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { url, options } = TOKEN_POST({
      username: emailOrUsername.value,
      password: password.value,
    });

    try {
      console.log("url, options", url, options);
      const response = await fetch(url, options);
      const json = await response.json();


      if (response.ok) {
        window.localStorage.setItem("token", json.token);
        console.log(json);
        login(json.user.username, json.token);
        getUser(json.token);
        router.push("/");
      } else {
        console.error("Erro no login:", json.message);
        alert(json.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const images = [
    { link: "https://i.pinimg.com/736x/ec/d7/0b/ecd70b176f9214a420bb91493e800244.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/6f/cd/54/6fcd5423c7f8a2076d8de63da21a2f2c.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/70/77/4a/70774a2b08b7d4bb6e4e3c6ff82ad59b.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/c2/a3/84/c2a384d10fdb1036e16c50144f90eafb.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/33/4a/66/334a66478068201a28e96c4a31ce52e9.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/d4/93/f2/d493f2018e4cc688ba23e6784572db9b.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/04/84/bc/0484bc5cb901b82370590c035dac442b.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/8f/64/7c/8f647cf438d460eee656642dca3f6b27.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/13/d9/28/13d9283b092dc16f8de3917d030d8799.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/0f/5c/0a/0f5c0aa9f9629d54089066de352ce272.jpg", middle: false },
    { link: "https://i.pinimg.com/736x/a2/4f/3a/a24f3a9713aafa683d3ff05395d27baa.jpg", middle: true },
    { link: "https://i.pinimg.com/736x/a6/6d/10/a66d10203d5bbf01c512c979b9af4b28.jpg", middle: false },
  ]

  return (
    <div className="login-page">
      <ImageGrid images={images} />
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
            {...emailOrUsername}
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
        <span className="create-account">): ainda não tem uma conta? <a href="/register">cadastre-se</a></span>
      </div>
    </div>
  );
};

export default LoginForm;
