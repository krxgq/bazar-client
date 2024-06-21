import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./Main";
import Account from "./Account";
import Reg from "./Reg";
import Item from "./Item";
import Login from "./Login";
import Favourites from "./Favourites";
import AddItem from "./AddItem";
import Chat from "./Chat";
import Cookies from "js-cookie"; // Import the cookie library
import { validateAccessToken } from "./app.js"; // Import the validateAccessToken function

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const accessToken = Cookies.get("accessToken");

        // Check if the user is authenticated based on the presence of the access token
        const isAuthenticated = accessToken
          ? await validateAccessToken()
          : false;

        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    checkAuthentication();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/account" element={<Account />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path="/fav" element={<Favourites />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/chat/:userID" element={<Chat />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Main />} />
            <Route path="/reg" element={<Reg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/item/:id" element={<Item />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
