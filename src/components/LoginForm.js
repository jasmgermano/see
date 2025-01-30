"use client";
import useForm from "@/hooks/useForm";
import React, { useContext } from "react";
import { TOKEN_POST, USER_GET } from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const username = useForm(false);
  const password = useForm(false);
  const { login, userSet } = useContext(AuthContext);
  const router = useRouter();

  React.useEffect(() => {
    // verficar se o usuário já está logado
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
      router.push("/teste");
    }
  }, [router]);

  async function getUser($token) {
    const { url, options } = USER_GET($token);

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        userSet(json.username, json.email, json.name, json.photo);
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
        console.error("Erro ao fazer login:", json.message);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username.value}
          onChange={username.onChange}
          onBlur={username.onBlur}
        />
        <input
          type="password"
          placeholder="password"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        <button type="submit">entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
