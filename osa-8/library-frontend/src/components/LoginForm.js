import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = props => {
  if (!props.show) {
    return null
  }

  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')

  const [gqlLogin, resultLogin] = useMutation(LOGIN)

  useEffect(() => {
    if (resultLogin.data) {
      const token = resultLogin.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [resultLogin.data])

  const handleSubmit = event => {
    event.preventDefault()

    gqlLogin({
      variables: { username: inputUsername, password: inputPassword }
    })

    setInputUsername('')
    setInputPassword('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>
                <input
                  type="text"
                  value={inputUsername}
                  onChange={({ target }) => setInputUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  value={inputPassword}
                  onChange={({ target }) => setInputPassword(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
