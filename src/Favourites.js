import React, { useState, useEffect } from "react";
import FavCard from "./components/FavCard.jsx";
import { getCurrentUser } from "./app.js";
import Header from "./components/Header.jsx";
const config = require("./configs/config.js");

const Favourites = () => {
  const [favs, setFavs] = useState([]);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavs = async () => {
      try {
        const user = await getCurrentUser();
        setUserID(user.id);

        const response = await fetch(
          `http://${config.host}:3001/api/getAllFavorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: user.id }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching favourite items: ${response.statusText}`
          );
        }

        const data = await response.json();
        const favsData = await Promise.all(
          data.map(async (fav) => {
            try {
              const itemResponse = await fetch(
                `http://${config.host}:3001/api/getItem?id=${fav.ItemID}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!itemResponse.ok) {
                console.warn(
                  `Network response was not ok for item ${fav.ItemID}`
                );
                return null; // Return null for items that are not found
              }

              return await itemResponse.json();
            } catch (error) {
              console.error(`Error fetching item ${fav.ItemID}: `, error);
              return null; // Return null in case of fetch error
            }
          })
        );

        setFavs(favsData.filter((fav) => fav !== null)); // Filter out null items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favourite items: ", error);
        setLoading(false);
      }
    };

    fetchFavs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.StrictMode>
      <Header />
      <div id="favoriteTiles">
      {favs.map((fav) => (
          <FavCard
            key={fav.id}
            id={fav.id}
            name={fav.title}
            img={fav.img}
            price={fav.price}
          />
        ))}
        </div>
    </React.StrictMode>
  );
};

export default Favourites;
