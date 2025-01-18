import React from "react";
import Header from "../Components/Header";
import "./pages_styles/about.css"; // Make sure to import the appropriate CSS file

const About = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        {/* First Row with Two Columns */}
        <div className="row">
          <div className="text-column">
            <h5 className="about-text">
              The Menu Generator is a versatile and user-friendly tool designed
              to simplify the process of creating customized menus for
              restaurants, cafes, or personal events. With an intuitive
              interface, users can easily input food items, categorize them, and
              generate beautifully organized menus. The system offers
              flexibility in design, allowing you to choose from various styles
              and formats to match your brand or event theme. Whether you're a
              small business owner or planning a special gathering, the Menu
              Generator ensures that you can create professional-looking menus
              quickly and effortlessly, making your dining experience more
              enjoyable for everyone.
            </h5>
          </div>

          <div className="image-column">
            <img
              src="https://i.etsystatic.com/43203792/r/il/6eaaba/5593645942/il_fullxfull.5593645942_d3ot.jpg"
              className="about-image"
              alt="Menu Generator"
            />
          </div>
        </div>

        {/* Second Row with Two Columns */}
        <div className="row">
          <div className="image-column">
            <img
              src="https://brandpacks.com/wp-content/uploads/edd/2019/05/bar-menu-templates.jpg"
              className="about-image"
              alt="Menu Example"
            />
          </div>

          <div className="text-column">
            <h5 className="about-text">
              The Menu Generator offers a versatile and efficient solution for
              those looking to create customized menus without hassle. It allows
              users to build menus from scratch or by using pre-designed
              templates, which can be further tailored with different themes,
              fonts, and layout styles. The system also features user-friendly
              functionalities, such as easy drag-and-drop options for adding
              menu items and categories, making it suitable for both tech-savvy
              and non-technical users. Additionally, the tool supports multiple
              cuisines and food types, enabling users to cater to a wide range
              of tastes and dietary preferences. Whether you're a small café or
              a large catering service, the Menu Generator simplifies the menu
              creation process while ensuring a polished and professional end
              product. It's the perfect tool to help businesses present their
              offerings in a visually appealing way, boost customer engagement,
              and enhance overall satisfaction.
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
