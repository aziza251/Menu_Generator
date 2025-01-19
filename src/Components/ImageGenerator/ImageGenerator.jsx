import React, { useState } from "react";
import "./ImageGenerator.css";
import Header from "../Header";
import Menu_generate from "../../Pages/Menu_generate";
import example_menu_img from "../Assets/MenuExampleImage.png";
import { useNavigate } from "react-router-dom";

const ImageGenerator = () => {
  const navigate = useNavigate()
  const [uploadedImage, setUploadedImage] = useState(null);
  const [image_url, set_image_url] = useState("/");
  const [image_url1, set_image_url1] = useState("/");
  const [image_url2, set_image_url2] = useState("/");

  const [inputValue, setInputValue] = useState(""); // Input değerini izlemek için useState

  const handleImageClick = (imageSrc) => {
    navigate("/menu-generate", { state: { backgroundImage: imageSrc } });
  };

  const imageGenerator = async () => {
    if (!inputValue.trim()) {
      alert("Lütfen bir açıklama girin!");
      return;
    }
    try {
      const response = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(inputValue)}`
      );
      const imageUrl = await response.url;
      set_image_url(imageUrl); // Yeni URL'yi ayarla

      const response1 = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(
          inputValue + "1"
        )}`
      );
      const imageUrl1 = await response1.url;
      set_image_url1(imageUrl1); // Yeni URL'yi ayarla

      const response2 = await fetch(
        `https://image.pollinations.ai/prompt/${encodeURIComponent(
          inputValue + "2"
        )}`
      );
      const imageUrl2 = await response2.url;
      set_image_url2(imageUrl2); // Yeni URL'yi ayarla
    } catch (error) {
      console.error("Görsel oluşturulurken bir hata oluştu:", error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="ai-image-generator">
          <div className="header"></div>
          <div className="img-loading">
            <div className="image-row">
              <>
                <img
                  src={image_url === "/" ? example_menu_img : image_url}
                  alt="Generated Example 1"
                  onClick={() => handleImageClick(image_url)}
                  style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                />
                <img
                  src={image_url === "/" ? example_menu_img : image_url1}
                  alt="Generated Example 2"
                  onClick={() => handleImageClick(image_url1)}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={image_url === "/" ? example_menu_img : image_url2}
                  alt="Generated Example 3"
                  onClick={() => handleImageClick(image_url2)}
                  style={{ cursor: "pointer" }}
                />
              </>
            </div>
          </div>

          <div className="search-box">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="search-input"
              placeholder="Describe What You Want To See In Your Menu Background"
            />
            <div className="generate-btn" onClick={imageGenerator}>
              Generate
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGenerator;
