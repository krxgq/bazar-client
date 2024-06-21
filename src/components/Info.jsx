import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addFav,
  removeFav,
  getAllFavorites,
  validateAccessToken,
} from "../app.js";
import cookie from "js-cookie";
import "./Info.css";

const Info = ({ itemID, price, title, user }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formattedPrice = parseFloat(price).toFixed(2);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = cookie.get("accessToken");
      if (accessToken) {
        try {
          const isAuthenticated = await validateAccessToken();
          setIsLoggedIn(isAuthenticated);
        } catch (error) {
          console.error("Error checking validity in Info.jsx:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const checkFavorites = async () => {
      if (isLoggedIn) {
        setIsLoading(true);
        try {
          const favArray = await getAllFavorites();
          if (favArray && Array.isArray(favArray)) {
            const isFav = favArray.some((fav) => {
              return fav.ItemID == itemID; // Simplified comparison
            });
            setIsFavorite(isFav);
          }
        } catch (error) {
          console.error("Error checking favorites in Info.jsx:", error);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    checkFavorites();
  }, [isLoggedIn, itemID]); // Added isLoggedIn and itemID as dependencies

  const handleFavClick = async () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to add to favorites");
      navigate("/login");
      return;
    } else {
      try {
        if (isFavorite) {
          await removeFav(itemID, user);
          setIsFavorite(false);
        } else {
          await addFav(itemID);
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error handling favorites in Info.jsx:", error);
      }
    }
  };
  return (
    <div id="info">
      <h3>{title}</h3>
      <p>{formattedPrice} $</p>
      <div id="buttList">
        <button
          id="message"
          className="buttons"
          onClick={
            isLoggedIn
              ? () => navigate(`/chat/${user}`)
              : () => navigate("/login")
          }
        >
          Message
        </button>
        <button id="fav" className="buttons" onClick={handleFavClick}>
          {isLoading
            ? "Loading..."
            : isFavorite
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>
      </div>
    </div>
  );
};

export default Info;
