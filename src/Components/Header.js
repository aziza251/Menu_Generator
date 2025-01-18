import React from "react";
import "./Header.css";
import About from "../Pages/About";

const Header = () => {
  return (
    <nav className="header">
      <div className="header__icons">
        <a href="/">
          <img
            className="header__logo"
            src="https://files.oaiusercontent.com/file-QmPHngdCqtJZ3Xj4Sc6gJM?se=2025-01-18T17%3A50%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7f33b5dc-5da1-4248-b921-ec3473f49010.webp&sig=6qV37eoD2WAlNg/UBrB/Sm1dU%2B2iPOvnfBU6%2BBAngv0%3D"
            alt="header_logo"
          />
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
