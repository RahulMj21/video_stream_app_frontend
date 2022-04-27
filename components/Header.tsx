import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  return (
    <header className="header">
      <h3 className="logo">Logo</h3>
      <div className="avatar">
        <Image
          src="/avatar.jpg"
          alt="image"
          height={40}
          width={40}
          objectFit="cover"
          onClick={() => setIsDropdown(!isDropdown)}
        />
        <div className="overlay" onClick={() => setIsDropdown(false)} />
        <div className={`avatar__dropdown ${isDropdown ? "show" : ""}`}>
          <div className="item">Profile</div>
          <div className="item">Logout</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
