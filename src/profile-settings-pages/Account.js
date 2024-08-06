import React, { useState, useEffect } from 'react';
import './Settings.css';
import { Link } from 'react-router-dom';
import { LogOut, getCurrentUser } from '../app.js';
import Header from '../components/Header.jsx';
import config from '../configs/config.js';

const Account = () => {
  const [userData, setUserData] = useState({
    id: '', // Assuming user ID is also part of the user data
    name: '',
    surname: '',
    profile_image: ''
  });
  const [profileImage, setProfileImage] = useState(null); // Store the image file directly
  const [newProfileImageName, setNewProfileImageName] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      const currentUser = await getCurrentUser();
      setUserData(currentUser);
    }
    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      setNewProfileImageName(fileName);
      setProfileImage(file); // Store the image file directly
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Upload the new profile image if it is selected
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);
        formData.append('folder', 'profile-pictures');
        formData.append('fileName', newProfileImageName);

        const imageResponse = await fetch(`http://${config.host}:3001/api/insertImage`, {
          method: 'POST',
          body: formData,
        });

        if (!imageResponse.ok) {
          throw new Error('Failed to upload new profile image.');
        }

        // Update the profile_image field with the name of the new image
        setUserData(prevData => ({
          ...prevData,
          profile_image: newProfileImageName
        }));
      }

      // Create an object with the fields that have been changed
      const updatedProfileData = {};
      if (userData.name) updatedProfileData.name = userData.name;
      if (userData.surname) updatedProfileData.surname = userData.surname;
      if (newProfileImageName) updatedProfileData.profile_image = newProfileImageName;

      // Only send data if there are changes
      if (Object.keys(updatedProfileData).length > 0) {
        const response = await fetch(`http://${config.host}:3001/api/updateProfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userData.id, ...updatedProfileData }),
        });

        if (response.ok) {
          alert('Profile updated successfully!');
        } else {
          throw new Error('Failed to update profile.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <React.StrictMode>
      <Header />
      <div id='centered'>
        <div className='nav-bar'>
          <ul id='account-menu'>
            <li>
              <Link to={'/account'}>Profile information</Link>
            </li>
            <li>
              <Link to={'/security'}>Security settings</Link>
            </li>
            <li>
              <Link to={'/support'}>Contact Support</Link>
            </li>
            <li onClick={LogOut} style={{ color: 'var(--orange-color)' }}>
              Sign Out
            </li>
          </ul>
        </div>
        <div id='content'>
          <div className='profile-container'>
            <input
              type='file'
              id='profile-input'
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <div
              className='profile-picture'
              onClick={() => document.getElementById('profile-input').click()}
            >
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="New Profile" />
              ) : (
                <img
                  src={`http://${config.host}:3001/api/getImage?folder=profile-pictures&fileName=${userData?.profile_image}`}
                  alt='Profile'
                />
              )}
              <div className='edit-overlay'>Edit</div>
            </div>
          </div>
          <label htmlFor='name'>Name</label><br />
          <input
            type='text'
            name='name'
            value={userData.name}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor='surname'>Surname</label><br />
          <input
            type='text'
            name='surname'
            value={userData.surname}
            onChange={handleInputChange}
          />
          <br />
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </React.StrictMode>
  );
}

export default Account;
