import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from '../app.js'
import cookie from 'js-cookie'
import './Settings.css'
import Header from '../components/Header.jsx'
const config = require('../configs/config.js')

const SecSet = () => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState('')

  const handleChangePass = async (e) => {
    e.preventDefault()

    const validPasswordPattern = /^[A-Za-z0-9@#$%]+$/

    if (!validPasswordPattern.test(newPass)) {
      setError('Password contains invalid characters.')
      return
    }

    if (newPass !== confirmPass) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch(
        `http://${config.host}:3001/api/changePass`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldPass,
            newPass,
            username: cookie.get('username'),
          }),
        }
      )

      if (response.status === 200) {
        alert('Password changed successfully')
      } else {
        setError('Error changing password')
      }
    } catch (error) {
      console.error('Error:', error)
      setError('Error changing password')
    }
  }

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
        <br />
        <div id='content'>
          <h1>Security settings</h1>
          <br />
          <div id='changepass'>
            <h3>Change your password</h3>
            <form onSubmit={handleChangePass}>
              <input
                type='password'
                placeholder='Old password'
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                required
              />
              <br />
              <input
                type='password'
                placeholder='New password'
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
              />
              <br />
              <input
                type='password'
                placeholder='Confirm new password'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
              <br />
              <button>Change password</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
        <div id='footer'></div>
      </div>
    </React.StrictMode>
  )
}

export default SecSet
