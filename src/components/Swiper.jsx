import React, { useState } from "react";
import "./Swiper.css";
import config from "../configs/config";

const Swiper = (props) => {
  const images = props.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const prev = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div>
      <div id="slider">
        {images !== null && images !== undefined ? (
          <>
            <button onClick={prev} id="prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M6 12l6-6v4h6v4h-6v4z" />
              </svg>
            </button>
            <div className="carousel-images">
              {images.length > 0 &&
                images.map((img, index) => (
                  <img
                    src={`http://${
                      config.host
                    }:3001/api/getImage?folder=${"item-pictures"}&fileName=${img}`}
                    key={index}
                    alt="img"
                    className={index === currentIndex ? "active" : ""}
                  />
                ))}
            </div>
            <button onClick={next} id="next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M18 12l-6-6v4H6v4h6v4z" />
              </svg>
            </button>
          </>
        ) : (
          <img
            src={`http://${
              config.host
            }:3001/api/getImage?folder=${"item-pictures"}&fileName=${"default.jpg"}`}
            alt="img"
            className="active"
          />
        )}
      </div>
      <div id="small_slider"></div>
    </div>
  );
};

export default Swiper;
