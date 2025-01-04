import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./pages_styles/Menu_Generate.css";

function Menu_generate() {
  const [menuItems, setMenuItems] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
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

  const handleBackgroundUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setBackgroundImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const menuElement = document.getElementById("menu");
    html2canvas(menuElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 dimensions in mm
      pdf.save("menu.pdf");
    });
  };

  return (
    <div className="App">
      <h1>Menu Generator</h1>
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
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "drinksImage")}
        />
        <button onClick={addMenuItem}>Add Item</button>
        <br />
        <input type="file" accept="image/*" onChange={handleBackgroundUpload} />
      </div>

      <div
        id="menu"
        className="menu"
        style={{ backgroundImage: `url(${backgroundImage})` }}
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
                      <span>{menuItem.mainCourse}</span>
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
                      <img src={menuItem.starterImage} className="food-image" />
                      <span>{menuItem.starter}</span>
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
                      <img src={menuItem.dessertImage} className="food-image" />
                      <span>{menuItem.dessert}</span>
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
                      <img src={menuItem.drinksImage} className="food-image" />
                      <span>{menuItem.drinks}</span>
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
  );
}

export default Menu_generate;
