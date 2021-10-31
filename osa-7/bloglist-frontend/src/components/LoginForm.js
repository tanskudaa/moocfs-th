import React, { useState } from 'react'
import { Input } from './StyledComponents'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { createNotification, resetNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

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
      dispatch(setUser(user))
      dispatch(resetNotification())
    }
    catch (exception) {
      dispatch(createNotification('Wrong username or password!', true))
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <Input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm