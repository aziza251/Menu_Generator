import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu_generate from "./Pages/Menu_generate";

const App = () => {
  return (
    <div>
      <Router>
        <Menu_generate path="/" />
      </Router>
    </div>
  );
};

export default App;
