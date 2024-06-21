import React, { useState, useEffect } from "react";
import Item from "./components/ItemCard.jsx";
import "./ItemCards.css";
const config = require("./configs/config.js");

const MyComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `http://${config.host}:3001/api/getAllItems`,
        {
          method: "GET",
          headers: {
            "Content-Type": "json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching items: ${response.statusText}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  return (
    <div id="items">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.title}
          img={item.img}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default MyComponent;
