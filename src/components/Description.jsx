import React from "react";
import "./Description.css";
const config = require("../configs/config.js");

const FavCard = (props) => {
  return (
    <div className="desc">
      <h2>DESCRIPTION: </h2>
      <p>{props.text}</p>
    </div>
  );
};

export default FavCard;
