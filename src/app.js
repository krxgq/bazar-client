//app.js
import cookie from "js-cookie";
const config = require("./configs/config.js");

export async function insertUser() {
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;

  try {
    const response = await fetch(`http://${config.host}/api/insertUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to insert user");
    } else {
      alert("User added successfully");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error adding user");
  }
}

export async function addFav(productID) {
  let user = await getCurrentUser();
  let userID = user.id;
  try {
    const response = await fetch(`http://${config.host}:3001/api/addFav`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        productID: productID,
      }),
    });

    if (response.ok) {
      alert("Favorite added successfully");
    } else {
      throw new Error("Failed to add favorite");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error adding favorite");
  }
}
export async function removeFav(productID) {
  let user = await getCurrentUser();
  let userID = user.id;
  try {
    const response = await fetch(`http://${config.host}:3001/api/removeFav`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        productID: productID,
      }),
    });

    if (response.ok) {
      alert("Favorite removed successfully");
    } else {
      throw new Error("Failed to remove favorite");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error removing favorite");
  }
}
export async function getAllFavorites() {
  var user = await getCurrentUser();
  try {
    const response = await fetch(
      `http://${config.host}:3001/api/getAllFavorites`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } else {
      throw new Error("Failed to fetch favorites");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error fetching favorites");
  }
}

export async function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("pass").value;

  try {
    const response = await fetch(`http://${config.host}:3001/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save access token in cookie
      document.cookie = `accessToken=${data.accessToken}`;
      alert("Login successful");
      window.location.replace("/");
    } else if (response.status === 404) {
      alert("User not found");
    } else if (response.status === 401) {
      alert("Incorrect password");
    } else {
      throw new Error("Failed to login");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error logging in");
  }
}
export async function validateAccessToken() {
  var accessToken = cookie.get("accessToken");

  try {
    const response = await fetch(
      `http://${config.host}:3001/api/validateAccessToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: accessToken,
        }),
      }
    );

    if (response.ok) {
      return true;
    } else if (response.status === 401) {
      cookie.remove("accessToken");
      return false;
    } else {
      cookie.remove("accessToken");
      throw new Error("Failed to validate access token");
    }
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}
export const getCurrentUser = async () => {
  try {
    const accessToken = cookie.get("accessToken");
    const response = await fetch(
      `http://${config.host}:3001/api/getCurrentUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch current user data");
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    throw error;
  }
};

/* 
export async function getAllItems() {
  try {
    const response = await fetch(`http://${config.url}:3001/api/getAllItems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (err) {
    console.error("Error:", err);
  }
} */
