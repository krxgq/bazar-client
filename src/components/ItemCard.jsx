import React from "react";
import "./ItemCard.css";
import config from "../configs/config.js";
import { Link } from "react-router-dom";

const Item = (props) => {
  let images = props.img;

  return (
    <div className="item">
      <Link to={`item/${props.id}`}>
        {images.length > 0 && (
          <img
            src={`http://${config.host}:3001/api/getImage?folder=${"item-pictures"}&fileName=${props.img[0]}`}
            alt={`img: ${props.name}`}
          />
        )}
        <p>{props.name}</p>
        <p>{props.price} $</p>
      </Link>
    </div>
  );
};

export default Item;
