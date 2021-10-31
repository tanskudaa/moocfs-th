import React from 'react'
import { MenuBar, MenuItem } from './StyledComponents'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user)

  return (
    <MenuBar>
      <MenuItem>
        <Link to="/">Blogs</Link>
      </MenuItem>

      <MenuItem>
        <Link to="/users">Users</Link>
      </MenuItem>

      {
        user &&
        <>
          <MenuItem>
            Logged in as <Link to={`/users/${user.id}`}>{user.name}</Link>
          </MenuItem>

          <MenuItem>
            <button onClick={handleLogout}>Logout</button>
          </MenuItem>
        </>
      }
    </MenuBar>
  )
}

export default Menu