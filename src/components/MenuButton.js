import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function MenuButton({ label, icon, handleClick }) {
  return (
    <button onClick={handleClick} className="menu-btn">
      <div className="menu-icon">
        <Image src={icon} alt="home" />
      </div>
      <span>{label}</span>
    </button>
  );
}
