import React from "react";
import Header from "../Components/Header";
import "./pages_styles/contact.css";
import AzizaImage from "./pages_styles/aziza.jpg";
import AlperenImage from "./pages_styles/alperen.jpg";
import YusufImage from "./pages_styles/yusuf.jpg";

const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact-container">
        <div className="row">
          <div className="column">
            <img
              src={AzizaImage}
              alt="Aziza"
              style={{ width: "50%", borderRadius: "50%" }}
            />
            <h2>
              Azizakhon Urinboeva: <br /> urinboevaaziza3@gmail.com
            </h2>
          </div>

          <div className="column">
            <img
              src={AlperenImage}
              alt="Alperen"
              style={{ width: "50%", borderRadius: "50%" }}
            />
            <h2>
              Alperen Gültekin: <br />
              alperen06gultekin@gmail.com
            </h2>
          </div>

          <div className="column">
            <img
              src={YusufImage}
              alt="Yusuf"
              style={{ width: "50%", height: "70%", borderRadius: "50%" }}
            />
            <h2>
              Yusuf Böçkün: <br /> yusufbockun1@gmail.com
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
