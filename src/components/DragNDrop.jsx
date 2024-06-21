import React, { useState } from "react";
import "./DragNDrop.css";

const DragAndDropImageInput = ({ onImageSelect }) => {
  const [image, setImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      onImageSelect(file); // Pass the selected file to the parent component
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      onImageSelect(file); // Pass the selected file to the parent component
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent opening the file manager
    setImage(null);
    onImageSelect(null); // Notify parent component that the image has been removed
  };

  const handleContainerClick = (e) => {
    if (!image) {
      document.getElementById("file-input").click();
    }
  };

  return (
    <div
      className={`drop-container ${dragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleContainerClick}
    >
      {image ? (
        <div className="image-wrapper">
          <img src={image} alt="Uploaded Preview" className="image-preview" />
          <button
            type="button"
            className="delete-button"
            onClick={handleRemoveImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
            </svg>
          </button>
        </div>
      ) : (
        <>
          <p>Drag and drop an image here or click to select an image</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
            id="file-input"
            onClick={(e) => e.stopPropagation()} // Prevent triggering container click event
          />
        </>
      )}
    </div>
  );
};

export default DragAndDropImageInput;
