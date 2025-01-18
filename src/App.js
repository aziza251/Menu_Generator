import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu_generate from "./Pages/Menu_generate";
import ImageGenerator from "./Components/ImageGenerator/ImageGenerator";
import Welcome_page from "./Pages/Welcome_page";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Correct usage of Route for the Welcome_page */}
          <Route path="/" element={<Welcome_page />} />
          <Route path="/menu-generate" element={<Menu_generate />} />
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
