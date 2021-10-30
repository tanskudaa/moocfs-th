import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const AllUsers = () => {
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then(response => setUsers(response))
  }, [])

  return (
    <div>
      <h3>Users</h3>
      {users.map(a => (
        <div key={a.id}>
          <Link to={`/users/${a.id}`}> {a.name} </Link>
          blogs {a.blogs.length}
        </div>
      ))}
    </div>
  )
}

export default AllUsers