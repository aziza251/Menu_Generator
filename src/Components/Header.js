import React from "react";
import "./Header.css";
import About from "../Pages/About";
import LogoImage from "./Assets/logoo.webp";

const Header = () => {
  return (
    <nav className="header">
      <div className="header__icons">
        <a href="/">
          <img className="header__logo" src={LogoImage} alt="header_logo" />
        </a>

        <a href="/about">
          <h3>About</h3>
        </a>
        <a href="/contact">
          <h3>Contact</h3>
        </a>
        <a href="/player">
          <h3> </h3>
        </a>
      </div>
    </nav>
  );
};

export default Header;
