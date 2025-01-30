'use client';
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <Image src={Logo} alt="Logo" />
      <p>
        <a href="/login">Login</a> | <a href="/register">Register</a>
      </p>
    </div>
  );
}
