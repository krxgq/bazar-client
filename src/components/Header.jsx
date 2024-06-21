import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import "./Header.css";
import { validateAccessToken, getCurrentUser } from "../app.js";
import { Link } from "react-router-dom";
import config from "../configs/config.js";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const accessToken = cookie.get("accessToken");
        if (accessToken) {
          const isAuthenticated = await validateAccessToken();
          setIsLoggedIn(isAuthenticated);
          if (isAuthenticated) {
            const currentUser = await getCurrentUser();
            setUserData(currentUser);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Handle error, such as logging out the user
      }
    }

    checkAuthentication();
  }, []);

  return (
    <header>
      <Link to="/">
        <div id="logo">
          <img src="../img/logo.png" alt="logo" />
        </div>
      </Link>
      <div id="search_bar">
        <input type="text" placeholder="Search..." />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.654545 3 4 10.654545 4 20 C 4 29.345455 11.654545 37 21 37 C 24.701287 37 28.127393 35.786719 30.927734 33.755859 L 44.085938 46.914062 L 46.914062 44.085938 L 33.875 31.046875 C 36.43682 28.068316 38 24.210207 38 20 C 38 10.654545 30.345455 3 21 3 z M 21 5 C 29.254545 5 36 11.745455 36 20 C 36 28.254545 29.254545 35 21 35 C 12.745455 35 6 28.254545 6 20 C 6 11.745455 12.745455 5 21 5 z"></path>
          </svg>
        </button>
      </div>
      {isLoggedIn ? (
        <div id="icons">
          <div id="favourites">
            <Link to="/fav">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="var(--orange-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </Link>
          </div>
          <div id="addItem">
            <Link to="/add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 50 50"
              >
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="var(--orange-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </Link>
      )}
      <div id="profile">
        {isLoggedIn && userData ? (
          <Link to="/account">
            <img
              src={`http://${
                config.host
              }:3001/api/getImage?folder=${"profile-pictures"}&fileName=${
                userData.profile_image
              }`}
              alt="profile_picture"
            />
          </Link>
        ) : (
          <p>
            <Link to="/login">sign in</Link> / <Link to="/reg">sign up</Link>
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
