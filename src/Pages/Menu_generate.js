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
  const [forms, setForms] = useState([]);

  const handleInputChange = (e, index, field) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = e.target.value;
    setForms(updatedForms);
  };

  const handleImageUpload = (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedForms = [...forms];
        updatedForms[index][field] = reader.result;
        setForms(updatedForms);
      };
      reader.readAsDataURL(file);
    }
  };

  const addForm = (type) => {
    setForms([
      ...forms,
      {
        type,
        name: "",
        price: "",
        image: null,
      },
    ]);
  };

  const addItem = (index) => {
    const newItem = forms[index];
    setMenuItems([...menuItems, newItem]);
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleBackgroundUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const loadedData = JSON.parse(e.target.result);
        setForms(loadedData.menuItems || []);
        if (loadedData.backgroundImage) {
          setBackgroundImage(loadedData.backgroundImage);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateFiles = () => {
    const menuElement = document.getElementById("menu");
    const pdf = new jsPDF(); // Portrait mode, millimeters, A4 size
    

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    html2canvas(menuElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      let yPosition = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        yPosition -= pageHeight;

        if (remainingHeight > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 dimensions in mm
      }

      // Save PDF
      pdf.save("menu.pdf");

      // Generate and Save JSON
      const jsonData = JSON.stringify({ menuItems, backgroundImage }, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "menu.json";
      link.click();
    });
  };

  return (
    <>
      <Header />
      <div className="App">
        <h1 style={{ color: "white" }}>Menu Generator</h1>

        <div className="actions">
          <button onClick={() => addForm("mainCourse")}>Add Main Course</button>
          <button onClick={() => addForm("starter")}>Add Starter</button>
          <button onClick={() => addForm("dessert")}>Add Dessert</button>
          <button onClick={() => addForm("drinks")}>Add Drink</button>
          <button
            onClick={() => document.getElementById("updateJsonInput").click()}
            style={{ marginLeft: "10px" }}
          >
            Update Menu 
          </button>
          <input
            type="file"
            accept="application/json"
            id="updateJsonInput"
            style={{ display: "none" }}
            onChange={loadJSON}
          />
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <h5 style={{ color: "white" }}>Upload Background Image</h5>
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            style={{ padding: "10px" }}
          />
          <Link to="/image-generator">
            <button style={{ padding: "14px 50px" }}>Generate Image</button>
          </Link>
        </div>
        <div className="form-container">
          {forms.map((form, index) => (
            <div key={index} className="form">
              <h3>{form.type.charAt(0).toUpperCase() + form.type.slice(1)}</h3>
              <input
                type="text"
                placeholder={`${form.type} Name`}
                value={form.name}
                onChange={(e) => handleInputChange(e, index, "name")}
              />
              <input
                type="number"
                placeholder={`${form.type} Price`}
                value={form.price}
                onChange={(e) => handleInputChange(e, index, "price")}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index, "image")}
              />
              <button onClick={() => addItem(index)}>Add Item</button>
            </div>
          ))}
        </div>  
        <div
          id="menu-container"
          style={{
            margin: "20px auto",
            maxWidth: "900px",
          }}
        >
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
              {["mainCourse", "starter", "dessert", "drinks"].map((type) => (
                <div className="menu-column" key={type}>
                  <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                  <div className="menu-items">
                    {menuItems
                      .filter((item) => item.type === type)
                      .map((item, index) => (
                        <div key={index} className="menu-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="food-image"
                          />
                          <span>{item.name}</span>
                          <span>${item.price}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={generateFiles}>Generate PDF + JSON</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu_generate;
