import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  const styleBar = {
    backgroundColor: 'lightgray'
  }
  const styleLink = {
    padding: 10
  }

  return (
    <div style={styleBar}>
      <Link style={styleLink} to="/">Blogs</Link>
      <Link style={styleLink} to="/users">Users</Link>

      {
        user &&
        <>
          <span style={styleLink}>
            Logged in as <Link to={`/users/${user.id}`}>{user.name}</Link>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </>
      }
    </div>
  )
}

export default Menu