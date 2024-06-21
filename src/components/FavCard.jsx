import React from "react";
import { Link } from "react-router-dom";
import "./FavCard.css";
const config = require("../configs/config.js");

const FavCard = (props) => {
  console.log(props);
  return (
    <Link to={`../item/${props.id}`}>
      <div className="item_fav">
        <img
          src={`http://${
            config.host
          }:3001/api/getImage?folder=${"item-pictures"}&fileName=${
            props.img[0]
          }`}
          alt={`img: ${props.name}`}
        />
        <p>{props.name}</p>
        <br />
        <p>{props.price} $</p>
      </div>
    </Link>
  );
};

export default FavCard;
