import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, displayError, clearNotifications }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setUser(user)
      clearNotifications()
    }
    catch (exception) {
      displayError('Wrong username or password!')
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm