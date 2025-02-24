import React, {useContext} from "react";
import Logo from "@/assets/images/logo.svg";
import HomeIcon from "@/assets/icons/home.svg";
import Image from "next/image";
import LogoutIcon from "@/assets/icons/logout.svg";
import MenuButton from "@/components/MenuButton";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Menu() {
  const { user, logout, profilePicture, name } = useContext(AuthContext);
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="menu">
      <a href="/">
        <Image src={Logo} alt="Logo" height={25} />
      </a>
      <div className="account">
        <div className="profile-picture">
          <img
            className="pfp circle"
            src={
              profilePicture ||
              "https://secure.gravatar.com/avatar/729ae85bf62b9917e93538db2f2688ca?s=96&d=mm&r=g"
            }
            alt="foto de perfil"
          />
        </div>
        <div>
          <a className="no-decor-btn" href={`/${user}`}>
            <p className="account-name">{name}</p>
          </a>
          <p className="account-username">@{user}</p>
        </div>
      </div>
      <div className="menu-options">
        <MenuButton
          label="início"
          icon={HomeIcon}
          handleClick={() => router.push("/")}
        />
        <MenuButton
          label="sair"
          icon={LogoutIcon}
          handleClick={() => handleLogout()}
        />
      </div>
    </div>
  );
}
