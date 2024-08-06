  import React, { useState, useEffect } from "react";
  import DragAndDropImageInput from "./components/DragNDrop";
  import Header from "./components/Header";
  import { getCurrentUser } from "./app.js"; // Adjust this import as per your actual implementation
  import "./AddItem.css";
  const config = require("./configs/config.js");

  const AddItem = () => {
    const [images, setImages] = useState(Array(8).fill(null));
    const [formData, setFormData] = useState({
      title: "",
      category: "",
      description: "",
      price: "",
      location: "",
    });
    const [userId, setUserId] = useState(null); // State to hold userId

    // Fetch userId once when component mounts
    useEffect(() => {
      const fetchUserId = async () => {
        try {
          const userData = await getCurrentUser(); // Adjust this function as per your actual implementation
          setUserId(userData.id); // Assuming userData has an id property
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error fetching user data
        }
      };

      fetchUserId();
    }, []);

    const handleImageSelect = (index, file) => {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if all fields are complete
      const allFieldsComplete = Object.values(formData).every(
        (value) => value !== ""
      );

      if (!allFieldsComplete) {
        alert("Please complete all fields.");
        return;
      }

      try {
        // Include userId and image names in formData
        const formDataWithUserId = {
          ...formData,
          userId: userId,
          img: images.map((image) => (image ? image.name : null)).filter(Boolean), // Collect image names
        };

        console.log("Form Data:", JSON.stringify(formDataWithUserId));

        const itemResponse = await fetch(
          `http://${config.host}:3001/api/insertItem`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataWithUserId),
          }
        );

        if (!itemResponse.ok) {
          throw new Error("Failed to submit item data");
        }

        // Send each image to /api/insertImage if it exists
        for (const image of images) {
          if (image) {
            const imageFormData = new FormData();
            imageFormData.append("image", image);
            imageFormData.append("folder", "item-pictures"); // Adjust folder name as needed
            imageFormData.append("fileName", image.name);

            const imageResponse = await fetch(
              `http://localhost:3001/api/insertImage`,
              {
                method: "POST",
                body: imageFormData,
              }
            );

            if (!imageResponse.ok) {
              throw new Error("Failed to upload image");
            }
          }
        }

        alert("Item and images submitted successfully");
        // Reset form and images
        setFormData({
          title: "",
          category: "",
          description: "",
          price: "",
          location: "",
        });
        setImages(Array(8).fill(null));
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the item");
      }
    };

    // Render form once userId is fetched
    if (userId === null) {
      return null; // Render loading indicator or handle case where userId is not available
    }

    return (
      <React.StrictMode>
        <Header />
        <div className="form-container">
          <form onSubmit={handleSubmit} id="form">
            <div id="text">
              <h1>List an item</h1>
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <br />

            <select
              name="category"
              value={formData.category}
              placeholder="Category"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="electronics">Electronics</option>
              <option value="Fashion and Accessories">
                Fashion and Accessories
              </option>
              <option value="Home and Garden">Home and Garden</option>
              <option value="Automotive">Automotive</option>
              <option value="Sports and Outdoors">Sports and Outdoors</option>
              <option value="Toys and Games">Toys and Games</option>
            </select>
            <br />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
            <br />
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Price"
              onChange={handleInputChange}
              required
            />
            <br />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            {/* Replace this input with map component */}
            <br />
            <div className="images-container">
              {images.map((_, index) => (
                <DragAndDropImageInput
                  key={index}
                  onImageSelect={(file) => handleImageSelect(index, file)}
                />
              ))}
            </div>
            <button id="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </React.StrictMode>
    );
  };

  export default AddItem;
