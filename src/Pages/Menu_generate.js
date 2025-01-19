import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useLocation, Link } from "react-router-dom";
import "./pages_styles/Menu_Generate.css";
import Header from "../Components/Header";

function Menu_generate() {
  const location = useLocation();

  const [menuItems, setMenuItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(
    location.state?.backgroundImage || ""
  );
  const [item, setItem] = useState({
    mainCourse: "",
    mainCoursePrice: "",
    starter: "",
    starterPrice: "",
    dessert: "",
    dessertPrice: "",
    drinks: "",
    drinksPrice: "",
    mainCourseImage: null,
    starterImage: null,
    dessertImage: null,
    drinksImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageUpload = (e, name) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setItem({ ...item, [name]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, item]);
    setItem({
      mainCourse: "",
      mainCoursePrice: "",
      starter: "",
      starterPrice: "",
      dessert: "",
      dessertPrice: "",
      drinks: "",
      drinksPrice: "",
      mainCourseImage: null,
      starterImage: null,
      dessertImage: null,
      drinksImage: null,
    });
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  const generatePDF = () => {
    const menuElement = document.getElementById("menu");
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    html2canvas(menuElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      let yPosition = 0;
      let remainingHeight = imgHeight;

      // Add images to pages
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        yPosition -= pageHeight;

        if (remainingHeight > 0) {
          pdf.addPage();
        }
      }

      pdf.save("menu.pdf");
    });
  };

  return (
    <>
      <Header />
      <div className="App">
        <h1 style={{ color: "white" }}>Menu Generator</h1>
        <div className="form">
          <input
            type="text"
            name="mainCourse"
            placeholder="Main Course"
            value={item.mainCourse}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="mainCoursePrice"
            placeholder="Main Course Price"
            value={item.mainCoursePrice}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "mainCourseImage")}
            style={{ paddingTop: "8px", marginBottom: "5px" }}
          />

          <input
            type="text"
            name="starter"
            placeholder="Starter"
            value={item.starter}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="starterPrice"
            placeholder="Starter Price"
            value={item.starterPrice}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "starterImage")}
            style={{ paddingTop: "8px", marginBottom: "5px" }}
          />

          <input
            type="text"
            name="dessert"
            placeholder="Dessert"
            value={item.dessert}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="dessertPrice"
            placeholder="Dessert Price"
            value={item.dessertPrice}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "dessertImage")}
            style={{ paddingTop: "8px", marginBottom: "5px" }}
          />
          <input
            type="text"
            name="drinks"
            placeholder="Drinks"
            value={item.drinks}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="drinksPrice"
            placeholder="Drinks Price"
            value={item.drinksPrice}
            onChange={handleInputChange}
            style={{ color: "black" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "drinksImage")}
            style={{ paddingTop: "8px", marginBottom: "5px" }}
          />

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <h5
              style={{
                color: "white",
                marginBottom: "20px",
                paddingBottom: "20px",
              }}
            >
              Upload Background Image
            </h5>

            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              placeholder="Background Image"
              style={{ marginBottom: "20px", padding: "10px" }}
            />
          </div>
          <Link to="/image-generator">
            <button style={{ padding: "14px 50px" }}>Generate Image</button>
          </Link>
          <button onClick={addMenuItem} style={{ padding: "14px 50px" }}>
            Add Item
          </button>
        </div>

        <div
          id="menu"
          className="menu"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <h2>Menu</h2>
          <div className="menu-grid">
            {/* Main Course Section */}
            <div className="menu-column">
              <h3>Main Course</h3>
              <div className="menu-items">
                {menuItems.map(
                  (menuItem, index) =>
                    menuItem.mainCourse && (
                      <div key={index} className="menu-item">
                        <img
                          src={menuItem.mainCourseImage}
                          className="food-image"
                        />
                        <span style={{ marginRight: "10px" }}>
                          {menuItem.mainCourse}
                        </span>

                        <span>${menuItem.mainCoursePrice}</span>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Starter Section */}
            <div className="menu-column">
              <h3>Starter</h3>
              <div className="menu-items">
                {menuItems.map(
                  (menuItem, index) =>
                    menuItem.starter && (
                      <div key={index} className="menu-item">
                        <img
                          src={menuItem.starterImage}
                          className="food-image"
                        />
                        <span style={{ marginRight: "10px" }}>
                          {menuItem.starter}
                        </span>
                        <span>${menuItem.starterPrice}</span>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Desserts Section */}
            <div className="menu-column">
              <h3>Desserts</h3>
              <div className="menu-items">
                {menuItems.map(
                  (menuItem, index) =>
                    menuItem.dessert && (
                      <div key={index} className="menu-item">
                        <img
                          src={menuItem.dessertImage}
                          className="food-image"
                        />
                        <span style={{ marginRight: "10px" }}>
                          {menuItem.dessert}
                        </span>
                        <span>${menuItem.dessertPrice}</span>
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Drinks Section */}
            <div className="menu-column">
              <h3>Drinks</h3>
              <div className="menu-items">
                {menuItems.map(
                  (menuItem, index) =>
                    menuItem.drinks && (
                      <div key={index} className="menu-item">
                        <img
                          src={menuItem.drinksImage}
                          className="food-image"
                        />
                        <span style={{ marginRight: "10px" }}>
                          {menuItem.drinks}
                        </span>
                        <span>${menuItem.drinksPrice}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <button onClick={generatePDF}>Generate PDF</button>
      </div>
    </>
  );
}

export default Menu_generate;
