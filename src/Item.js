import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Item.css";
import Header from "./components/Header";
import Swiper from "./components/Swiper";
import config from "./configs/config";
import Description from "./components/Description";
import Info from "./components/Info";
import { getCurrentUser } from "./app.js";
import Cookies from "js-cookie";

const Item = () => {
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [userId, setUserID] = React.useState([]);

  const deleteItem = async () => {
    let doubleCheck = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!doubleCheck) {
      return;
    }
    try {
      const response = await fetch(
        `http://${config.host}:3001/api/deleteItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            jwt: Cookies.get("accessToken"),
          }),
        }
      );
      if (response.ok) {
        alert("Item deleted successfully");
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://${config.host}:3001/api/getItem?id=${id}`,
          {
            // sends id as query parameter
            method: "GET", // GET request instead of POST
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    const fetchUser = async () => {
      if (Cookies.get("accessToken") !== undefined) {
        const userData = await getCurrentUser();
        setUserID(userData.id);
      }
    };
    fetchUser();
    fetchData();
  }, [id]);
  return (
    <React.StrictMode>
      <Header />
      <div className="mainContent">
        <div className="two-column-layout">
          <div className="left-column">
            <div className="row">
              <div id="carousel">
                <Swiper images={data.img} />
              </div>
            </div>
            <div className="row">
              <Description text={data.description} />
            </div>
          </div>
          <div className="right-column">
            <div className="row" id="secondRow">
              <div id="editBar">
                {data.userID == userId && (
                  <>
                    <div id="deleteButton" onClick={deleteItem}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        id="deleteButton"
                        height="30"
                        viewBox="0 0 30 30"
                      >
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                      </svg>
                    </div>
                    {/*  <div id="editButton">
                      <svg
                        class="feather feather-edit"
                        fill="none" 
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </div> */}
                  </>
                )}
              </div>
              <Info
                title={data.title}
                price={data.price}
                user={data.userID}
                itemID={id}
              />
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Item;
