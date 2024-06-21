import React from "react";
import Header from "./components/Header.jsx";
import ItemCards from "./ItemCards.js";

const Main = () => {
  return (
    <React.StrictMode>
      <Header />
      <div className="container">
        <ItemCards />
      </div>
    </React.StrictMode>
  );
};

export default Main;
